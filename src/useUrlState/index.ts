import qs from "qs";
import type { IParseOptions, IStringifyOptions } from "qs";
import { useMemo } from "../useMemo";
import { useMemoizedFn } from "../useMemoizedFn";
import { ref } from "vue";
import isDev from "../utils/isDev";
import isBrowser from "../utils/isBrowser";
import type {
  RouteMap,
  Router,
  RouteLocationNormalizedLoaded
} from "vue-router";

type UseRoute<Name extends keyof RouteMap = keyof RouteMap> = (
  _name?: Name
) => RouteLocationNormalizedLoaded<Name>;

interface RouterRegistry {
  useRoute: UseRoute;
  useRouter: () => Router;
}

export interface Options {
  navigateMode?: "push" | "replace";
  parseOptions?: IParseOptions;
  stringifyOptions?: IStringifyOptions;
}
var _rins: RouterRegistry | null = null;
const baseParseConfig: IParseOptions = {};
const baseStringifyConfig: IStringifyOptions = {};

type UrlState = Record<string, any>;

const w = typeof window !== "undefined" ? window : null;
const globalQuery = ref(getQuery());
function getQuery() {
  return (w?.location.search || "").replace(/^\?/, "");
}
export const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: Options
) => {
  type State = Partial<{ [key in keyof S]: any }>;
  if (isDev && !isBrowser) {
    console.error(`useUrlState expected to used in browser`);
  }

  const {
    navigateMode = "push",
    parseOptions,
    stringifyOptions
  } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions
  };

  const initialStateRef = ref(
    typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState || {}
  );

  const _route = _rins?.useRoute();
  const _router = _rins?.useRouter();

  const queryFromUrl = useMemo(() => {
    let query = getQuery();
    if (_rins) query = qs.stringify(_route?.query, mergedStringifyOptions);

    return qs.parse(query, mergedParseOptions);
  }, [globalQuery, () => _route?.query]);

  const targetQuery = useMemo<State>(() => {
    return {
      ...initialStateRef.value,
      ...queryFromUrl.value
    };
  }, [queryFromUrl]);

  const setState = (s) => {
    const newQuery = typeof s === "function" ? s(targetQuery.value) : s;

    const urlObj = new URL(w?.location.href || "");
    const mergedParams = { ...queryFromUrl.value, ...newQuery };
    const queryString =
      qs.stringify(mergedParams, mergedStringifyOptions) || "";

    urlObj.search = queryString;
    globalQuery.value = queryString;
    // 替换当前窗口的URL
    if (_rins) {
      _router![navigateMode === "replace" ? "replace" : "push"]({
        path: _route!.path,
        query: mergedParams
      });
    } else if (w) {
      w.history[navigateMode === "replace" ? "replaceState" : "pushState"](
        w.history.state,
        document.title,
        urlObj.toString()
      );
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
};

useUrlState.use = (regist: RouterRegistry) => (_rins = regist);
