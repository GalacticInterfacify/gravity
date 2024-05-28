
const Log = function(msg) {
    console.log("1v1.www : " + msg);
};
 
const wasm = WebAssembly;
const oldInstantiate = wasm.instantiate; //
 
wasm.instantiate = async function(bufferSource, importObject) {
    const patcher = new WasmPatcher(bufferSource);
 
    patcher.aobPatchEntry({
        scan: 'B 20 1 20 1 28 ? ? 41 1 [ 6B ] 36 ? ? 41 84 D7 95 3',
        code: [
            OP.drop,
        ],
        onsuccess: () => Log('Infinite Ammo')
    });
 
    patcher.aobPatchEntry({
        scan: '2A ? ? | 38 ? ? C 2 B 20 0',
        code: [
            OP.drop,
            OP.f32.const, VAR.f32(0)
        ],
        onsuccess: () => Log('Rapid Fire')
    });
 
    const result = await oldInstantiate(patcher.patch(), importObject);
 
    if(new URLSearchParams( window.location.search ).get('TU9SRUhBQ0tT') === 'true') {
        const exports = result.instance.exports;
 
        const pressSpaceKey = exports.PRESS_SPACE_KEY;
 
        document.addEventListener('keydown', evt => evt.code === 'Space' && (pressSpaceKey.value = 1));
        document.addEventListener('keyup', evt => evt.code === 'Space' && (pressSpaceKey.value = 0));
 
        localStorage.removeItem('TU9SRUhBQ0tT');
    }
 
    return result;
};
 
if(new URLSearchParams( window.location.search ).get('TU9SRUhBQ0tT') === 'true') return;
