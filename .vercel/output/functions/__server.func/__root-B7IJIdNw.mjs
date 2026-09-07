import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./_ssr/ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-B7IJIdNw.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchSsoUser_createServerFn_handler = createServerRpc({
	id: "d427fe6317f573fa38ddd6092319faa64007648068250a0fe0f7a20788000b7e",
	name: "fetchSsoUser",
	filename: "src/routes/__root.tsx"
}, (opts) => fetchSsoUser.__executeServer(opts));
var fetchSsoUser = createServerFn({ method: "GET" }).handler(fetchSsoUser_createServerFn_handler, async () => {
	const { getRequest } = await import("./_ssr/ssr.mjs").then((n) => n.s).then((n) => n.t);
	const { readSessionUser } = await import("./_ssr/session.server-0AAMWT2f.mjs");
	try {
		return await readSessionUser(getRequest());
	} catch {
		return null;
	}
});
//#endregion
export { fetchSsoUser_createServerFn_handler };
