(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-ktx2decoder", [], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-ktx2decoder"] = factory();
	else
		root["KTX2DECODER"] = factory();
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js":
/*!*********************************************************************!*\
  !*** ../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EngineFormat: () => (/* binding */ EngineFormat),
/* harmony export */   SourceTextureFormat: () => (/* binding */ SourceTextureFormat),
/* harmony export */   TranscodeTarget: () => (/* binding */ TranscodeTarget)
/* harmony export */ });
var SourceTextureFormat;
(function (SourceTextureFormat) {
    SourceTextureFormat[SourceTextureFormat["ETC1S"] = 0] = "ETC1S";
    SourceTextureFormat[SourceTextureFormat["UASTC4x4"] = 1] = "UASTC4x4";
})(SourceTextureFormat || (SourceTextureFormat = {}));
var TranscodeTarget;
(function (TranscodeTarget) {
    TranscodeTarget[TranscodeTarget["ASTC_4X4_RGBA"] = 0] = "ASTC_4X4_RGBA";
    TranscodeTarget[TranscodeTarget["BC7_RGBA"] = 1] = "BC7_RGBA";
    TranscodeTarget[TranscodeTarget["BC3_RGBA"] = 2] = "BC3_RGBA";
    TranscodeTarget[TranscodeTarget["BC1_RGB"] = 3] = "BC1_RGB";
    TranscodeTarget[TranscodeTarget["PVRTC1_4_RGBA"] = 4] = "PVRTC1_4_RGBA";
    TranscodeTarget[TranscodeTarget["PVRTC1_4_RGB"] = 5] = "PVRTC1_4_RGB";
    TranscodeTarget[TranscodeTarget["ETC2_RGBA"] = 6] = "ETC2_RGBA";
    TranscodeTarget[TranscodeTarget["ETC1_RGB"] = 7] = "ETC1_RGB";
    TranscodeTarget[TranscodeTarget["RGBA32"] = 8] = "RGBA32";
    TranscodeTarget[TranscodeTarget["R8"] = 9] = "R8";
    TranscodeTarget[TranscodeTarget["RG8"] = 10] = "RG8";
})(TranscodeTarget || (TranscodeTarget = {}));
var EngineFormat;
(function (EngineFormat) {
    EngineFormat[EngineFormat["COMPRESSED_RGBA_BPTC_UNORM_EXT"] = 36492] = "COMPRESSED_RGBA_BPTC_UNORM_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_ASTC_4X4_KHR"] = 37808] = "COMPRESSED_RGBA_ASTC_4X4_KHR";
    EngineFormat[EngineFormat["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
    EngineFormat[EngineFormat["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
    EngineFormat[EngineFormat["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
    EngineFormat[EngineFormat["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
    EngineFormat[EngineFormat["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
    EngineFormat[EngineFormat["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
    EngineFormat[EngineFormat["RGBA8Format"] = 32856] = "RGBA8Format";
    EngineFormat[EngineFormat["R8Format"] = 33321] = "R8Format";
    EngineFormat[EngineFormat["RG8Format"] = 33323] = "RG8Format";
})(EngineFormat || (EngineFormat = {}));


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js":
/*!**********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Misc/dataReader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* binding */ DataReader)
/* harmony export */ });
/**
 * Utility class for reading from a data buffer
 */
class DataReader {
    /**
     * The current byte offset from the beginning of the data buffer.
     */
    get byteOffset() {
        return this._dataByteOffset;
    }
    /**
     * Constructor
     * @param buffer The buffer to set
     * @param byteOffset The starting offset in the buffer
     * @param byteLength The byte length of the buffer
     */
    constructor(buffer, byteOffset, byteLength) {
        if (buffer.buffer) {
            this._dataView = new DataView(buffer.buffer, buffer.byteOffset + (byteOffset ?? 0), byteLength ?? buffer.byteLength);
        }
        else {
            this._dataView = new DataView(buffer, byteOffset ?? 0, byteLength ?? buffer.byteLength);
        }
        this._dataByteOffset = 0;
    }
    /**
     * Read a unsigned 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readUint8() {
        const value = this._dataView.getUint8(this._dataByteOffset);
        this._dataByteOffset += 1;
        return value;
    }
    /**
     * Read a signed 8-bit integer from the currently loaded data range.
     * @returns The 8-bit integer read
     */
    readInt8() {
        const value = this._dataView.getInt8(this._dataByteOffset);
        this._dataByteOffset += 1;
        return value;
    }
    /**
     * Read a unsigned 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readUint16() {
        const value = this._dataView.getUint16(this._dataByteOffset, true);
        this._dataByteOffset += 2;
        return value;
    }
    /**
     * Read a signed 16-bit integer from the currently loaded data range.
     * @returns The 16-bit integer read
     */
    readInt16() {
        const value = this._dataView.getInt16(this._dataByteOffset, true);
        this._dataByteOffset += 2;
        return value;
    }
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint32() {
        const value = this._dataView.getUint32(this._dataByteOffset, true);
        this._dataByteOffset += 4;
        return value;
    }
    /**
     * Read a signed 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readInt32() {
        const value = this._dataView.getInt32(this._dataByteOffset, true);
        this._dataByteOffset += 4;
        return value;
    }
    /**
     * Read a unsigned 32-bit integer from the currently loaded data range.
     * @returns The 32-bit integer read
     */
    readUint64() {
        // split 64-bit number into two 32-bit (4-byte) parts
        const left = this._dataView.getUint32(this._dataByteOffset, true);
        const right = this._dataView.getUint32(this._dataByteOffset + 4, true);
        // combine the two 32-bit values
        const combined = left + 2 ** 32 * right; // That was weird..Keeping it for posterity: true ? left + 2 ** 32 * right : 2 ** 32 * left + right;
        /*if (!Number.isSafeInteger(combined)) {
            console.warn('DataReader: ' + combined + ' exceeds MAX_SAFE_INTEGER. Precision may be lost.');
        }*/
        this._dataByteOffset += 8;
        return combined;
    }
    /**
     * Read a byte array from the currently loaded data range.
     * @param byteLength The byte length to read
     * @returns The byte array read
     */
    readUint8Array(byteLength) {
        const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._dataByteOffset, byteLength);
        this._dataByteOffset += byteLength;
        return value;
    }
    /**
     * Skips the given byte length the currently loaded data range.
     * @param byteLength The byte length to skip
     * @returns This instance
     */
    skipBytes(byteLength) {
        this._dataByteOffset += byteLength;
        return this;
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Misc/index.js":
/*!*****************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Misc/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _dataReader__WEBPACK_IMPORTED_MODULE_0__.DataReader)
/* harmony export */ });
/* harmony import */ var _dataReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataReader */ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js");



/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/index.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _liteTranscoder__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_2__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_3__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_4__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _mscTranscoder__WEBPACK_IMPORTED_MODULE_7__.MSCTranscoder)
/* harmony export */ });
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");
/* harmony import */ var _liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder_UASTC_ASTC */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js");
/* harmony import */ var _liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./liteTranscoder_UASTC_BC7 */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js");
/* harmony import */ var _liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./liteTranscoder_UASTC_R8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RG8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RGBA_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js");
/* harmony import */ var _liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./liteTranscoder_UASTC_RGBA_SRGB */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js");
/* harmony import */ var _mscTranscoder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mscTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js");










/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js":
/*!*********************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder: () => (/* binding */ LiteTranscoder)
/* harmony export */ });
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");


/**
 * @internal
 */
class LiteTranscoder extends _transcoder__WEBPACK_IMPORTED_MODULE_0__.Transcoder {
    _loadModule() {
        if (this._modulePromise) {
            return this._modulePromise;
        }
        this._modulePromise = _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__.WASMMemoryManager.LoadWASM(this._modulePath).then((wasmBinary) => {
            return new Promise((resolve) => {
                WebAssembly.instantiate(wasmBinary, { env: { memory: this._memoryManager.wasmMemory } }).then((moduleWrapper) => {
                    resolve({ module: moduleWrapper.instance.exports });
                });
            });
        });
        return this._modulePromise;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get memoryManager() {
        return this._memoryManager;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setModulePath(modulePath) {
        this._modulePath = _transcoder__WEBPACK_IMPORTED_MODULE_0__.Transcoder.GetWasmUrl(modulePath);
    }
    initialize() {
        this._transcodeInPlace = true;
    }
    needMemoryManager() {
        return true;
    }
    setMemoryManager(memoryMgr) {
        this._memoryManager = memoryMgr;
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [textureView, uncompressedTextureView, nBlocks] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData);
            return transcoder.transcode(nBlocks) === 0 ? (this._transcodeInPlace ? textureView.slice() : uncompressedTextureView.slice()) : null;
        });
    }
    _prepareTranscoding(width, height, uncompressedByteLength, encodedData, uncompressedNumComponents) {
        const nBlocks = ((width + 3) >> 2) * ((height + 3) >> 2);
        if (uncompressedNumComponents !== undefined) {
            uncompressedByteLength = width * ((height + 3) >> 2) * 4 * uncompressedNumComponents;
        }
        const texMemoryPages = ((nBlocks * 16 + 65535 + (this._transcodeInPlace ? 0 : uncompressedByteLength)) >> 16) + 1;
        const textureView = this.memoryManager.getMemoryView(texMemoryPages, 65536, nBlocks * 16);
        const uncompressedTextureView = this._transcodeInPlace
            ? null
            : new Uint8Array(this._memoryManager.wasmMemory.buffer, 65536 + nBlocks * 16, uncompressedNumComponents !== undefined ? width * height * uncompressedNumComponents : uncompressedByteLength);
        textureView.set(encodedData);
        return [textureView, uncompressedTextureView, nBlocks];
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js":
/*!********************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* binding */ LiteTranscoder_UASTC_ASTC)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_ASTC extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ASTC_4X4_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_ASTC.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_ASTC.WasmModuleURL);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_ASTC.WasmModuleURL = "ktx2Transcoders/1/uastc_astc.wasm";
LiteTranscoder_UASTC_ASTC.Name = "UniversalTranscoder_UASTC_ASTC";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js":
/*!*******************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* binding */ LiteTranscoder_UASTC_BC7)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_BC7 extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA;
    }
    getName() {
        return LiteTranscoder_UASTC_BC7.Name;
    }
    initialize() {
        super.initialize();
        this.setModulePath(LiteTranscoder_UASTC_BC7.WasmModuleURL);
    }
}
/**
 * URL to use when loading the wasm module for the transcoder
 */
LiteTranscoder_UASTC_BC7.WasmModuleURL = "ktx2Transcoders/1/uastc_bc7.wasm";
LiteTranscoder_UASTC_BC7.Name = "UniversalTranscoder_UASTC_BC7";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js":
/*!************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* binding */ LiteTranscoder_UASTC_R8_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_R8_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.R8;
    }
    getName() {
        return LiteTranscoder_UASTC_R8_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 1);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL = "ktx2Transcoders/1/uastc_r8_unorm.wasm";
LiteTranscoder_UASTC_R8_UNORM.Name = "UniversalTranscoder_UASTC_R8_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js":
/*!*************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* binding */ LiteTranscoder_UASTC_RG8_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RG8_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RG8;
    }
    getName() {
        return LiteTranscoder_UASTC_RG8_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 2);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL = "ktx2Transcoders/1/uastc_rg8_unorm.wasm";
LiteTranscoder_UASTC_RG8_UNORM.Name = "UniversalTranscoder_UASTC_RG8_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js":
/*!*************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* binding */ LiteTranscoder_UASTC_RGBA_SRGB)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RGBA_SRGB extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32 && isInGammaSpace;
    }
    getName() {
        return LiteTranscoder_UASTC_RGBA_SRGB.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 4);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (srgb)
 */
LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL = "ktx2Transcoders/1/uastc_rgba8_srgb_v2.wasm";
LiteTranscoder_UASTC_RGBA_SRGB.Name = "UniversalTranscoder_UASTC_RGBA_SRGB";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js":
/*!**************************************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* binding */ LiteTranscoder_UASTC_RGBA_UNORM)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liteTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder.js");


/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
class LiteTranscoder_UASTC_RGBA_UNORM extends _liteTranscoder__WEBPACK_IMPORTED_MODULE_1__.LiteTranscoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 && dst === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32 && !isInGammaSpace;
    }
    getName() {
        return LiteTranscoder_UASTC_RGBA_UNORM.Name;
    }
    initialize() {
        super.initialize();
        this._transcodeInPlace = false;
        this.setModulePath(LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL);
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return this._loadModule().then((moduleWrapper) => {
            const transcoder = moduleWrapper.module;
            const [, uncompressedTextureView] = this._prepareTranscoding(width, height, uncompressedByteLength, encodedData, 4);
            return transcoder.decode(width, height) === 0 ? uncompressedTextureView.slice() : null;
        });
    }
}
/**
 * URL to use when loading the wasm module for the transcoder (unorm)
 */
LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL = "ktx2Transcoders/1/uastc_rgba8_unorm_v2.wasm";
LiteTranscoder_UASTC_RGBA_UNORM.Name = "UniversalTranscoder_UASTC_RGBA_UNORM";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js":
/*!********************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSCTranscoder: () => (/* binding */ MSCTranscoder)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");



/**
 * @internal
 */
class MSCTranscoder extends _transcoder__WEBPACK_IMPORTED_MODULE_1__.Transcoder {
    getName() {
        return MSCTranscoder.Name;
    }
    _getMSCBasisTranscoder() {
        if (this._mscBasisTranscoderPromise) {
            return this._mscBasisTranscoderPromise;
        }
        this._mscBasisTranscoderPromise = _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_2__.WASMMemoryManager.LoadWASM(_transcoder__WEBPACK_IMPORTED_MODULE_1__.Transcoder.GetWasmUrl(MSCTranscoder.WasmModuleURL)).then((wasmBinary) => {
            if (MSCTranscoder.UseFromWorkerThread) {
                importScripts(_transcoder__WEBPACK_IMPORTED_MODULE_1__.Transcoder.GetWasmUrl(MSCTranscoder.JSModuleURL));
            }
            // Worker Number = 0 and MSC_TRANSCODER has not been loaded yet.
            else if (typeof MSC_TRANSCODER === "undefined") {
                return new Promise((resolve, reject) => {
                    const head = document.getElementsByTagName("head")[0];
                    const script = document.createElement("script");
                    script.setAttribute("type", "text/javascript");
                    script.setAttribute("src", _transcoder__WEBPACK_IMPORTED_MODULE_1__.Transcoder.GetWasmUrl(MSCTranscoder.JSModuleURL));
                    script.onload = () => {
                        MSC_TRANSCODER({ wasmBinary }).then((basisModule) => {
                            basisModule.initTranscoders();
                            this._mscBasisModule = basisModule;
                            resolve();
                        });
                    };
                    script.onerror = () => {
                        reject("Can not load MSC_TRANSCODER script.");
                    };
                    head.appendChild(script);
                });
            }
            return new Promise((resolve) => {
                MSC_TRANSCODER({ wasmBinary }).then((basisModule) => {
                    basisModule.initTranscoders();
                    this._mscBasisModule = basisModule;
                    resolve();
                });
            });
        });
        return this._mscBasisTranscoderPromise;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static CanTranscode(src, dst, isInGammaSpace) {
        return true;
    }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        const isVideo = false;
        return this._getMSCBasisTranscoder().then(() => {
            const basisModule = this._mscBasisModule;
            let transcoder;
            let imageInfo;
            let result;
            let textureData = null;
            try {
                transcoder = src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? new basisModule.UastcImageTranscoder() : new basisModule.BasisLzEtc1sImageTranscoder();
                const texFormat = src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? basisModule.TextureFormat.UASTC4x4 : basisModule.TextureFormat.ETC1S;
                imageInfo = new basisModule.ImageInfo(texFormat, width, height, level);
                const targetFormat = basisModule.TranscodeTarget[core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst]]; // works because the labels of the sourceTextureFormat enum are the same as the property names used in TranscodeTarget!
                if (!basisModule.isFormatSupported(targetFormat, texFormat)) {
                    throw new Error(`MSCTranscoder: Transcoding from "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[src]}" to "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst]}" not supported by current transcoder build.`);
                }
                if (src === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S) {
                    const sgd = ktx2Reader.supercompressionGlobalData;
                    transcoder.decodePalettes(sgd.endpointCount, sgd.endpointsData, sgd.selectorCount, sgd.selectorsData);
                    transcoder.decodeTables(sgd.tablesData);
                    imageInfo.flags = imageDesc.imageFlags;
                    imageInfo.rgbByteOffset = 0;
                    imageInfo.rgbByteLength = imageDesc.rgbSliceByteLength;
                    imageInfo.alphaByteOffset = imageDesc.alphaSliceByteOffset > 0 ? imageDesc.rgbSliceByteLength : 0;
                    imageInfo.alphaByteLength = imageDesc.alphaSliceByteLength;
                    result = transcoder.transcodeImage(targetFormat, encodedData, imageInfo, 0, isVideo);
                }
                else {
                    imageInfo.flags = 0;
                    imageInfo.rgbByteOffset = 0;
                    imageInfo.rgbByteLength = uncompressedByteLength;
                    imageInfo.alphaByteOffset = 0;
                    imageInfo.alphaByteLength = 0;
                    result = transcoder.transcodeImage(targetFormat, encodedData, imageInfo, 0, ktx2Reader.hasAlpha, isVideo);
                }
            }
            finally {
                if (transcoder) {
                    transcoder.delete();
                }
                if (imageInfo) {
                    imageInfo.delete();
                }
                if (result && result.transcodedImage) {
                    textureData = result.transcodedImage.get_typed_memory_view().slice();
                    result.transcodedImage.delete();
                }
            }
            return textureData;
        });
    }
}
/**
 * URL to use when loading the MSC transcoder
 */
MSCTranscoder.JSModuleURL = "ktx2Transcoders/1/msc_basis_transcoder.js";
/**
 * URL to use when loading the wasm module for the transcoder
 */
MSCTranscoder.WasmModuleURL = "ktx2Transcoders/1/msc_basis_transcoder.wasm";
MSCTranscoder.UseFromWorkerThread = true;
MSCTranscoder.Name = "MSCTranscoder";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/index.js":
/*!************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _Misc_index__WEBPACK_IMPORTED_MODULE_6__.DataReader),
/* harmony export */   KTX2Decoder: () => (/* reexport safe */ _ktx2Decoder__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder),
/* harmony export */   KTX2FileReader: () => (/* reexport safe */ _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.KTX2FileReader),
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__.MSCTranscoder),
/* harmony export */   SupercompressionScheme: () => (/* reexport safe */ _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme),
/* harmony export */   Transcoder: () => (/* reexport safe */ _transcoder__WEBPACK_IMPORTED_MODULE_2__.Transcoder),
/* harmony export */   TranscoderManager: () => (/* reexport safe */ _transcoderManager__WEBPACK_IMPORTED_MODULE_3__.TranscoderManager),
/* harmony export */   WASMMemoryManager: () => (/* reexport safe */ _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_4__.WASMMemoryManager),
/* harmony export */   ZSTDDecoder: () => (/* reexport safe */ _zstddec__WEBPACK_IMPORTED_MODULE_5__.ZSTDDecoder)
/* harmony export */ });
/* harmony import */ var _ktx2Decoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ktx2Decoder */ "../../../tools/ktx2Decoder/dist/ktx2Decoder.js");
/* harmony import */ var _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ktx2FileReader */ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js");
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* harmony import */ var _transcoderManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transcoderManager */ "../../../tools/ktx2Decoder/dist/transcoderManager.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");
/* harmony import */ var _zstddec__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zstddec */ "../../../tools/ktx2Decoder/dist/zstddec.js");
/* harmony import */ var _Misc_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Misc/index */ "../../../tools/ktx2Decoder/dist/Misc/index.js");
/* harmony import */ var _Transcoders_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Transcoders/index */ "../../../tools/ktx2Decoder/dist/Transcoders/index.js");
/* eslint-disable import/no-internal-modules */










/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/ktx2Decoder.js":
/*!******************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/ktx2Decoder.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KTX2Decoder: () => (/* binding */ KTX2Decoder)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ktx2FileReader */ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js");
/* harmony import */ var _transcoderManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transcoderManager */ "../../../tools/ktx2Decoder/dist/transcoderManager.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_ASTC */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_ASTC.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_BC7 */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_BC7.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RGBA_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_UNORM.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RGBA_SRGB */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RGBA_SRGB.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_R8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_R8_UNORM.js");
/* harmony import */ var _Transcoders_liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Transcoders/liteTranscoder_UASTC_RG8_UNORM */ "../../../tools/ktx2Decoder/dist/Transcoders/liteTranscoder_UASTC_RG8_UNORM.js");
/* harmony import */ var _Transcoders_mscTranscoder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Transcoders/mscTranscoder */ "../../../tools/ktx2Decoder/dist/Transcoders/mscTranscoder.js");
/* harmony import */ var _zstddec__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./zstddec */ "../../../tools/ktx2Decoder/dist/zstddec.js");
/* harmony import */ var _transcodeDecisionTree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transcodeDecisionTree */ "../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js");
/**
 * Resources used for the implementation:
 *  - 3js KTX2 loader: https://github.com/mrdoob/three.js/blob/dfb5c23ce126ec845e4aa240599915fef5375797/examples/jsm/loaders/KTX2Loader.js
 *  - Universal Texture Transcoders: https://github.com/KhronosGroup/Universal-Texture-Transcoders
 *  - KTX2 specification: http://github.khronos.org/KTX-Specification/
 *  - KTX2 binaries to convert files: https://github.com/KhronosGroup/KTX-Software/releases
 *  - KTX specification: https://www.khronos.org/registry/DataFormat/specs/1.3/dataformat.1.3.html
 *  - KTX-Software: https://github.com/KhronosGroup/KTX-Software
 */












const isPowerOfTwo = (value) => {
    return (value & (value - 1)) === 0 && value !== 0;
};
/**
 * Class for decoding KTX2 files
 *
 */
class KTX2Decoder {
    constructor() {
        this._transcoderMgr = new _transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager();
    }
    decode(data, caps, options) {
        const finalOptions = { ...options, ...KTX2Decoder.DefaultDecoderOptions };
        return Promise.resolve().then(() => {
            const kfr = new _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.KTX2FileReader(data);
            if (!kfr.isValid()) {
                throw new Error("Invalid KT2 file: wrong signature");
            }
            kfr.parse();
            if (kfr.needZSTDDecoder) {
                if (!this._zstdDecoder) {
                    this._zstdDecoder = new _zstddec__WEBPACK_IMPORTED_MODULE_10__.ZSTDDecoder();
                }
                return this._zstdDecoder.init().then(() => {
                    return this._decodeData(kfr, caps, finalOptions);
                });
            }
            return this._decodeData(kfr, caps, finalOptions);
        });
    }
    _decodeData(kfr, caps, options) {
        const width = kfr.header.pixelWidth;
        const height = kfr.header.pixelHeight;
        const srcTexFormat = kfr.textureFormat;
        const decisionTree = new _transcodeDecisionTree__WEBPACK_IMPORTED_MODULE_11__.TranscodeDecisionTree(srcTexFormat, kfr.hasAlpha, isPowerOfTwo(width) && isPowerOfTwo(height), caps, options);
        if (options?.transcodeFormatDecisionTree) {
            decisionTree.parseTree(options?.transcodeFormatDecisionTree);
        }
        const transcodeFormat = decisionTree.transcodeFormat;
        const engineFormat = decisionTree.engineFormat;
        const roundToMultiple4 = decisionTree.roundToMultiple4;
        const transcoder = this._transcoderMgr.findTranscoder(srcTexFormat, transcodeFormat, kfr.isInGammaSpace, options?.bypassTranscoders);
        if (transcoder === null) {
            throw new Error(`no transcoder found to transcode source texture format "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[srcTexFormat]}" to format "${core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[transcodeFormat]}"`);
        }
        const mipmaps = [];
        const dataPromises = [];
        const decodedData = {
            width: 0,
            height: 0,
            transcodedFormat: engineFormat,
            mipmaps,
            isInGammaSpace: kfr.isInGammaSpace,
            hasAlpha: kfr.hasAlpha,
            transcoderName: transcoder.getName(),
        };
        let firstImageDescIndex = 0;
        for (let level = 0; level < kfr.header.levelCount; level++) {
            if (level > 0) {
                firstImageDescIndex += Math.max(kfr.header.layerCount, 1) * kfr.header.faceCount * Math.max(kfr.header.pixelDepth >> (level - 1), 1);
            }
            const levelWidth = Math.floor(width / (1 << level)) || 1;
            const levelHeight = Math.floor(height / (1 << level)) || 1;
            const numImagesInLevel = kfr.header.faceCount; // note that cubemap are not supported yet (see KTX2FileReader), so faceCount == 1
            const levelImageByteLength = ((levelWidth + 3) >> 2) * ((levelHeight + 3) >> 2) * kfr.dfdBlock.bytesPlane[0];
            const levelUncompressedByteLength = kfr.levels[level].uncompressedByteLength;
            let levelDataBuffer = kfr.data.buffer;
            let levelDataOffset = kfr.levels[level].byteOffset + kfr.data.byteOffset;
            let imageOffsetInLevel = 0;
            if (kfr.header.supercompressionScheme === _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme.ZStandard) {
                levelDataBuffer = this._zstdDecoder.decode(new Uint8Array(levelDataBuffer, levelDataOffset, kfr.levels[level].byteLength), levelUncompressedByteLength);
                levelDataOffset = 0;
            }
            if (level === 0) {
                decodedData.width = roundToMultiple4 ? (levelWidth + 3) & ~3 : levelWidth;
                decodedData.height = roundToMultiple4 ? (levelHeight + 3) & ~3 : levelHeight;
            }
            for (let imageIndex = 0; imageIndex < numImagesInLevel; imageIndex++) {
                let encodedData;
                let imageDesc = null;
                if (kfr.header.supercompressionScheme === _ktx2FileReader__WEBPACK_IMPORTED_MODULE_1__.SupercompressionScheme.BasisLZ) {
                    imageDesc = kfr.supercompressionGlobalData.imageDescs[firstImageDescIndex + imageIndex];
                    encodedData = new Uint8Array(levelDataBuffer, levelDataOffset + imageDesc.rgbSliceByteOffset, imageDesc.rgbSliceByteLength + imageDesc.alphaSliceByteLength);
                }
                else {
                    encodedData = new Uint8Array(levelDataBuffer, levelDataOffset + imageOffsetInLevel, levelImageByteLength);
                    imageOffsetInLevel += levelImageByteLength;
                }
                const mipmap = {
                    data: null,
                    width: levelWidth,
                    height: levelHeight,
                };
                const transcodedData = transcoder
                    .transcode(srcTexFormat, transcodeFormat, level, levelWidth, levelHeight, levelUncompressedByteLength, kfr, imageDesc, encodedData)
                    .then((data) => {
                    mipmap.data = data;
                    return data;
                })
                    .catch((reason) => {
                    decodedData.errors = decodedData.errors ?? "";
                    decodedData.errors += reason + "\n" + reason.stack + "\n";
                    return null;
                });
                dataPromises.push(transcodedData);
                mipmaps.push(mipmap);
            }
        }
        return Promise.all(dataPromises).then(() => {
            return decodedData;
        });
    }
}
KTX2Decoder.DefaultDecoderOptions = {};
// Put in the order you want the transcoders to be used in priority
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_ASTC__WEBPACK_IMPORTED_MODULE_3__.LiteTranscoder_UASTC_ASTC);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_BC7__WEBPACK_IMPORTED_MODULE_4__.LiteTranscoder_UASTC_BC7);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RGBA_UNORM__WEBPACK_IMPORTED_MODULE_5__.LiteTranscoder_UASTC_RGBA_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RGBA_SRGB__WEBPACK_IMPORTED_MODULE_6__.LiteTranscoder_UASTC_RGBA_SRGB);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_R8_UNORM__WEBPACK_IMPORTED_MODULE_7__.LiteTranscoder_UASTC_R8_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_liteTranscoder_UASTC_RG8_UNORM__WEBPACK_IMPORTED_MODULE_8__.LiteTranscoder_UASTC_RG8_UNORM);
_transcoderManager__WEBPACK_IMPORTED_MODULE_2__.TranscoderManager.RegisterTranscoder(_Transcoders_mscTranscoder__WEBPACK_IMPORTED_MODULE_9__.MSCTranscoder); // catch all transcoder - will throw an error if the format can't be transcoded


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/ktx2FileReader.js":
/*!*********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/ktx2FileReader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KTX2FileReader: () => (/* binding */ KTX2FileReader),
/* harmony export */   SupercompressionScheme: () => (/* binding */ SupercompressionScheme)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Misc/dataReader */ "../../../tools/ktx2Decoder/dist/Misc/dataReader.js");
/* eslint-disable @typescript-eslint/naming-convention */


/** @internal */
var SupercompressionScheme;
(function (SupercompressionScheme) {
    SupercompressionScheme[SupercompressionScheme["None"] = 0] = "None";
    SupercompressionScheme[SupercompressionScheme["BasisLZ"] = 1] = "BasisLZ";
    SupercompressionScheme[SupercompressionScheme["ZStandard"] = 2] = "ZStandard";
    SupercompressionScheme[SupercompressionScheme["ZLib"] = 3] = "ZLib";
})(SupercompressionScheme || (SupercompressionScheme = {}));
class KTX2FileReader {
    /**
     * Will throw an exception if the file can't be parsed
     * @param data
     */
    constructor(data) {
        this._data = data;
    }
    get data() {
        return this._data;
    }
    get header() {
        return this._header;
    }
    get levels() {
        return this._levels;
    }
    get dfdBlock() {
        return this._dfdBlock;
    }
    get supercompressionGlobalData() {
        return this._supercompressionGlobalData;
    }
    isValid() {
        return KTX2FileReader.IsValid(this._data);
    }
    parse() {
        let offsetInFile = 12; // skip the header
        /**
         * Get the header
         */
        const hdrReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, offsetInFile, 17 * 4);
        const header = (this._header = {
            vkFormat: hdrReader.readUint32(),
            typeSize: hdrReader.readUint32(),
            pixelWidth: hdrReader.readUint32(),
            pixelHeight: hdrReader.readUint32(),
            pixelDepth: hdrReader.readUint32(),
            layerCount: hdrReader.readUint32(),
            faceCount: hdrReader.readUint32(),
            levelCount: hdrReader.readUint32(),
            supercompressionScheme: hdrReader.readUint32(),
            dfdByteOffset: hdrReader.readUint32(),
            dfdByteLength: hdrReader.readUint32(),
            kvdByteOffset: hdrReader.readUint32(),
            kvdByteLength: hdrReader.readUint32(),
            sgdByteOffset: hdrReader.readUint64(),
            sgdByteLength: hdrReader.readUint64(),
        });
        if (header.pixelDepth > 0) {
            throw new Error(`Failed to parse KTX2 file - Only 2D textures are currently supported.`);
        }
        if (header.layerCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Array textures are not currently supported.`);
        }
        if (header.faceCount > 1) {
            throw new Error(`Failed to parse KTX2 file - Cube textures are not currently supported.`);
        }
        offsetInFile += hdrReader.byteOffset;
        /**
         * Get the levels
         */
        let levelCount = Math.max(1, header.levelCount);
        const levelReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, offsetInFile, levelCount * 3 * (2 * 4));
        const levels = (this._levels = []);
        while (levelCount--) {
            levels.push({
                byteOffset: levelReader.readUint64(),
                byteLength: levelReader.readUint64(),
                uncompressedByteLength: levelReader.readUint64(),
            });
        }
        offsetInFile += levelReader.byteOffset;
        /**
         * Get the data format descriptor (DFD) blocks
         */
        const dfdReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, header.dfdByteOffset, header.dfdByteLength);
        const dfdBlock = (this._dfdBlock = {
            vendorId: dfdReader.skipBytes(4 /* skip totalSize */).readUint16(),
            descriptorType: dfdReader.readUint16(),
            versionNumber: dfdReader.readUint16(),
            descriptorBlockSize: dfdReader.readUint16(),
            colorModel: dfdReader.readUint8(),
            colorPrimaries: dfdReader.readUint8(),
            transferFunction: dfdReader.readUint8(),
            flags: dfdReader.readUint8(),
            texelBlockDimension: {
                x: dfdReader.readUint8() + 1,
                y: dfdReader.readUint8() + 1,
                z: dfdReader.readUint8() + 1,
                w: dfdReader.readUint8() + 1,
            },
            bytesPlane: [
                dfdReader.readUint8() /* bytesPlane0 */,
                dfdReader.readUint8() /* bytesPlane1 */,
                dfdReader.readUint8() /* bytesPlane2 */,
                dfdReader.readUint8() /* bytesPlane3 */,
                dfdReader.readUint8() /* bytesPlane4 */,
                dfdReader.readUint8() /* bytesPlane5 */,
                dfdReader.readUint8() /* bytesPlane6 */,
                dfdReader.readUint8() /* bytesPlane7 */,
            ],
            numSamples: 0,
            samples: new Array(),
        });
        dfdBlock.numSamples = (dfdBlock.descriptorBlockSize - 24) / 16;
        for (let i = 0; i < dfdBlock.numSamples; i++) {
            const sample = {
                bitOffset: dfdReader.readUint16(),
                bitLength: dfdReader.readUint8() + 1,
                channelType: dfdReader.readUint8(),
                channelFlags: 0,
                samplePosition: [
                    dfdReader.readUint8() /* samplePosition0 */,
                    dfdReader.readUint8() /* samplePosition1 */,
                    dfdReader.readUint8() /* samplePosition2 */,
                    dfdReader.readUint8() /* samplePosition3 */,
                ],
                sampleLower: dfdReader.readUint32(),
                sampleUpper: dfdReader.readUint32(),
            };
            sample.channelFlags = (sample.channelType & 0xf0) >> 4;
            sample.channelType = sample.channelType & 0x0f;
            dfdBlock.samples.push(sample);
        }
        /**
         * Get the Supercompression Global Data (sgd)
         */
        const sgd = (this._supercompressionGlobalData = {});
        if (header.sgdByteLength > 0) {
            const sgdReader = new _Misc_dataReader__WEBPACK_IMPORTED_MODULE_1__.DataReader(this._data, header.sgdByteOffset, header.sgdByteLength);
            sgd.endpointCount = sgdReader.readUint16();
            sgd.selectorCount = sgdReader.readUint16();
            sgd.endpointsByteLength = sgdReader.readUint32();
            sgd.selectorsByteLength = sgdReader.readUint32();
            sgd.tablesByteLength = sgdReader.readUint32();
            sgd.extendedByteLength = sgdReader.readUint32();
            sgd.imageDescs = [];
            const imageCount = this._getImageCount();
            for (let i = 0; i < imageCount; i++) {
                sgd.imageDescs.push({
                    imageFlags: sgdReader.readUint32(),
                    rgbSliceByteOffset: sgdReader.readUint32(),
                    rgbSliceByteLength: sgdReader.readUint32(),
                    alphaSliceByteOffset: sgdReader.readUint32(),
                    alphaSliceByteLength: sgdReader.readUint32(),
                });
            }
            const endpointsByteOffset = header.sgdByteOffset + sgdReader.byteOffset;
            const selectorsByteOffset = endpointsByteOffset + sgd.endpointsByteLength;
            const tablesByteOffset = selectorsByteOffset + sgd.selectorsByteLength;
            const extendedByteOffset = tablesByteOffset + sgd.tablesByteLength;
            sgd.endpointsData = new Uint8Array(this._data.buffer, this._data.byteOffset + endpointsByteOffset, sgd.endpointsByteLength);
            sgd.selectorsData = new Uint8Array(this._data.buffer, this._data.byteOffset + selectorsByteOffset, sgd.selectorsByteLength);
            sgd.tablesData = new Uint8Array(this._data.buffer, this._data.byteOffset + tablesByteOffset, sgd.tablesByteLength);
            sgd.extendedData = new Uint8Array(this._data.buffer, this._data.byteOffset + extendedByteOffset, sgd.extendedByteLength);
        }
    }
    _getImageCount() {
        let layerPixelDepth = Math.max(this._header.pixelDepth, 1);
        for (let i = 1; i < this._header.levelCount; i++) {
            layerPixelDepth += Math.max(this._header.pixelDepth >> i, 1);
        }
        return Math.max(this._header.layerCount, 1) * this._header.faceCount * layerPixelDepth;
    }
    get textureFormat() {
        return this._dfdBlock.colorModel === 166 /* DFDModel.UASTC */ ? core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 : core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S;
    }
    get hasAlpha() {
        const tformat = this.textureFormat;
        switch (tformat) {
            case core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.ETC1S:
                return (this._dfdBlock.numSamples === 2 &&
                    (this._dfdBlock.samples[0].channelType === 15 /* DFDChannel_ETC1S.AAA */ || this._dfdBlock.samples[1].channelType === 15 /* DFDChannel_ETC1S.AAA */));
            case core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4:
                return this._dfdBlock.samples[0].channelType === 3 /* DFDChannel_UASTC.RGBA */;
        }
        return false;
    }
    get needZSTDDecoder() {
        return this._header.supercompressionScheme === SupercompressionScheme.ZStandard;
    }
    get isInGammaSpace() {
        return this._dfdBlock.transferFunction === 2 /* DFDTransferFunction.sRGB */;
    }
    static IsValid(data) {
        if (data.byteLength >= 12) {
            // '«', 'K', 'T', 'X', ' ', '2', '0', '»', '\r', '\n', '\x1A', '\n'
            const identifier = new Uint8Array(data.buffer, data.byteOffset, 12);
            if (identifier[0] === 0xab &&
                identifier[1] === 0x4b &&
                identifier[2] === 0x54 &&
                identifier[3] === 0x58 &&
                identifier[4] === 0x20 &&
                identifier[5] === 0x32 &&
                identifier[6] === 0x30 &&
                identifier[7] === 0xbb &&
                identifier[8] === 0x0d &&
                identifier[9] === 0x0a &&
                identifier[10] === 0x1a &&
                identifier[11] === 0x0a) {
                return true;
            }
        }
        return false;
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/legacy/legacy.js":
/*!********************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/legacy/legacy.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataReader: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.DataReader),
/* harmony export */   KTX2Decoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder),
/* harmony export */   KTX2FileReader: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.KTX2FileReader),
/* harmony export */   LiteTranscoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder),
/* harmony export */   LiteTranscoder_UASTC_ASTC: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_ASTC),
/* harmony export */   LiteTranscoder_UASTC_BC7: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_BC7),
/* harmony export */   LiteTranscoder_UASTC_R8_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_R8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RG8_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RG8_UNORM),
/* harmony export */   LiteTranscoder_UASTC_RGBA_SRGB: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RGBA_SRGB),
/* harmony export */   LiteTranscoder_UASTC_RGBA_UNORM: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.LiteTranscoder_UASTC_RGBA_UNORM),
/* harmony export */   MSCTranscoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.MSCTranscoder),
/* harmony export */   SupercompressionScheme: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.SupercompressionScheme),
/* harmony export */   Transcoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.Transcoder),
/* harmony export */   TranscoderManager: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.TranscoderManager),
/* harmony export */   WASMMemoryManager: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.WASMMemoryManager),
/* harmony export */   ZSTDDecoder: () => (/* reexport safe */ _index__WEBPACK_IMPORTED_MODULE_0__.ZSTDDecoder)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "../../../tools/ktx2Decoder/dist/index.js");
/* eslint-disable import/no-internal-modules */

const globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.KTX2DECODER = _index__WEBPACK_IMPORTED_MODULE_0__.KTX2Decoder;
}



/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js":
/*!****************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcodeDecisionTree.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranscodeDecisionTree: () => (/* binding */ TranscodeDecisionTree)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* eslint-disable @typescript-eslint/naming-convention */

const DecisionTree = {
    ETC1S: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
            roundToMultiple4: false,
        },
        no: {
            cap: "etc2",
            yes: {
                alpha: true,
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC2_RGBA,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC,
                },
                no: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB8_ETC2,
                },
            },
            no: {
                cap: "etc1",
                alpha: false,
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL,
                },
                no: {
                    cap: "bptc",
                    yes: {
                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA,
                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT,
                    },
                    no: {
                        cap: "s3tc",
                        yes: {
                            alpha: true,
                            yes: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC3_RGBA,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT,
                            },
                            no: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC1_RGB,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT,
                            },
                        },
                        no: {
                            cap: "pvrtc",
                            needsPowerOfTwo: true,
                            yes: {
                                alpha: true,
                                yes: {
                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGBA,
                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
                                },
                                no: {
                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGB,
                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
                                },
                            },
                            no: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                roundToMultiple4: false,
                            },
                        },
                    },
                },
            },
        },
    },
    UASTC: {
        option: "forceRGBA",
        yes: {
            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
            roundToMultiple4: false,
        },
        no: {
            option: "forceR8",
            yes: {
                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.R8,
                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.R8Format,
                roundToMultiple4: false,
            },
            no: {
                option: "forceRG8",
                yes: {
                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RG8,
                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RG8Format,
                    roundToMultiple4: false,
                },
                no: {
                    cap: "astc",
                    yes: {
                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ASTC_4X4_RGBA,
                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_ASTC_4X4_KHR,
                    },
                    no: {
                        cap: "bptc",
                        yes: {
                            transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC7_RGBA,
                            engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_BPTC_UNORM_EXT,
                        },
                        no: {
                            option: "useRGBAIfASTCBC7NotAvailableWhenUASTC",
                            yes: {
                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                roundToMultiple4: false,
                            },
                            no: {
                                cap: "etc2",
                                yes: {
                                    alpha: true,
                                    yes: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC2_RGBA,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA8_ETC2_EAC,
                                    },
                                    no: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB8_ETC2,
                                    },
                                },
                                no: {
                                    cap: "etc1",
                                    yes: {
                                        transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.ETC1_RGB,
                                        engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_ETC1_WEBGL,
                                    },
                                    no: {
                                        cap: "s3tc",
                                        yes: {
                                            alpha: true,
                                            yes: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC3_RGBA,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_S3TC_DXT5_EXT,
                                            },
                                            no: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.BC1_RGB,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_S3TC_DXT1_EXT,
                                            },
                                        },
                                        no: {
                                            cap: "pvrtc",
                                            needsPowerOfTwo: true,
                                            yes: {
                                                alpha: true,
                                                yes: {
                                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGBA,
                                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
                                                },
                                                no: {
                                                    transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.PVRTC1_4_RGB,
                                                    engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
                                                },
                                            },
                                            no: {
                                                transcodeFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget.RGBA32,
                                                engineFormat: core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.EngineFormat.RGBA8Format,
                                                roundToMultiple4: false,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
class TranscodeDecisionTree {
    static _IsLeafNode(node) {
        return node.engineFormat !== undefined;
    }
    get transcodeFormat() {
        return this._transcodeFormat;
    }
    get engineFormat() {
        return this._engineFormat;
    }
    get roundToMultiple4() {
        return this._roundToMultiple4;
    }
    constructor(textureFormat, hasAlpha, isPowerOfTwo, caps, options) {
        this._textureFormat = textureFormat;
        this._hasAlpha = hasAlpha;
        this._isPowerOfTwo = isPowerOfTwo;
        this._caps = caps;
        this._options = options ?? {};
        this.parseTree(DecisionTree);
    }
    parseTree(tree) {
        const node = this._textureFormat === core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat.UASTC4x4 ? tree.UASTC : tree.ETC1S;
        if (node) {
            this._parseNode(node);
        }
        return node !== undefined;
    }
    _parseNode(node) {
        if (!node) {
            return;
        }
        if (TranscodeDecisionTree._IsLeafNode(node)) {
            this._transcodeFormat = node.transcodeFormat;
            this._engineFormat = node.engineFormat;
            this._roundToMultiple4 = node.roundToMultiple4 ?? true;
        }
        else {
            let condition = true;
            if (node.cap !== undefined) {
                condition = condition && !!this._caps[node.cap];
            }
            if (node.option !== undefined) {
                condition = condition && !!this._options[node.option];
            }
            if (node.alpha !== undefined) {
                condition = condition && this._hasAlpha === node.alpha;
            }
            if (node.needsPowerOfTwo !== undefined) {
                condition = condition && this._isPowerOfTwo === node.needsPowerOfTwo;
            }
            if (node.transcodeFormat !== undefined) {
                if (Array.isArray(node.transcodeFormat)) {
                    condition = condition && node.transcodeFormat.indexOf(this._transcodeFormat) !== -1;
                }
                else {
                    condition = condition && node.transcodeFormat === this._transcodeFormat;
                }
            }
            this._parseNode(condition ? node.yes : node.no);
        }
    }
}


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcoder.js":
/*!*****************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcoder.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transcoder: () => (/* binding */ Transcoder)
/* harmony export */ });
/**
 * @internal
 */
class Transcoder {
    static CanTranscode(src, dst, isInGammaSpace) {
        return false;
    }
    static GetWasmUrl(wasmUrl) {
        return `${Transcoder.WasmBaseUrl}${wasmUrl}`;
    }
    getName() {
        return Transcoder.Name;
    }
    initialize() { }
    needMemoryManager() {
        return false;
    }
    setMemoryManager(memoryMgr) { }
    transcode(src, dst, level, width, height, uncompressedByteLength, ktx2Reader, imageDesc, encodedData) {
        return Promise.resolve(null);
    }
}
Transcoder.Name = "Transcoder";
Transcoder.WasmBaseUrl = "https://preview.babylonjs.com/";


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/transcoderManager.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/transcoderManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranscoderManager: () => (/* binding */ TranscoderManager)
/* harmony export */ });
/* harmony import */ var core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/Materials/Textures/ktx2decoderTypes */ "../../../dev/core/dist/Materials/Textures/ktx2decoderTypes.js");
/* harmony import */ var _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasmMemoryManager */ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js");


/**
 * @internal
 */
class TranscoderManager {
    static RegisterTranscoder(transcoder) {
        TranscoderManager._Transcoders.push(transcoder);
    }
    findTranscoder(src, dst, isInGammaSpace, bypass) {
        let transcoder = null;
        const key = core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.SourceTextureFormat[src] + "_" + core_Materials_Textures_ktx2decoderTypes__WEBPACK_IMPORTED_MODULE_0__.TranscodeTarget[dst];
        for (let i = 0; i < TranscoderManager._Transcoders.length; ++i) {
            if (TranscoderManager._Transcoders[i].CanTranscode(src, dst, isInGammaSpace) && (!bypass || bypass.indexOf(TranscoderManager._Transcoders[i].Name) < 0)) {
                transcoder = this._getExistingTranscoder(key, TranscoderManager._Transcoders[i].Name);
                if (!transcoder) {
                    transcoder = new TranscoderManager._Transcoders[i]();
                    transcoder.initialize();
                    if (transcoder.needMemoryManager()) {
                        if (!this._wasmMemoryManager) {
                            this._wasmMemoryManager = new _wasmMemoryManager__WEBPACK_IMPORTED_MODULE_1__.WASMMemoryManager();
                        }
                        transcoder.setMemoryManager(this._wasmMemoryManager);
                    }
                    if (!TranscoderManager._TranscoderInstances[key]) {
                        TranscoderManager._TranscoderInstances[key] = [];
                    }
                    TranscoderManager._TranscoderInstances[key].push(transcoder);
                }
                break;
            }
        }
        return transcoder;
    }
    _getExistingTranscoder(key, transcoderName) {
        const transcoders = TranscoderManager._TranscoderInstances[key];
        if (transcoders) {
            for (let t = 0; t < transcoders.length; ++t) {
                const transcoder = transcoders[t];
                if (transcoderName === transcoder.getName()) {
                    return transcoder;
                }
            }
        }
        return null;
    }
}
TranscoderManager._Transcoders = [];
TranscoderManager._TranscoderInstances = {};


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/wasmMemoryManager.js":
/*!************************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/wasmMemoryManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WASMMemoryManager: () => (/* binding */ WASMMemoryManager)
/* harmony export */ });
/**
 * @internal
 */
class WASMMemoryManager {
    static LoadWASM(path) {
        if (this.LoadBinariesFromCurrentThread) {
            return new Promise((resolve, reject) => {
                fetch(path)
                    .then((response) => {
                    if (response.ok) {
                        return response.arrayBuffer();
                    }
                    throw new Error(`Could not fetch the wasm component from "${path}": ${response.status} - ${response.statusText}`);
                })
                    .then((wasmBinary) => resolve(wasmBinary))
                    .catch((reason) => {
                    reject(reason);
                });
            });
        }
        const id = this._RequestId++;
        return new Promise((resolve) => {
            const wasmLoadedHandler = (msg) => {
                if (msg.data.action === "wasmLoaded" && msg.data.id === id) {
                    self.removeEventListener("message", wasmLoadedHandler);
                    resolve(msg.data.wasmBinary);
                }
            };
            self.addEventListener("message", wasmLoadedHandler);
            postMessage({ action: "loadWASM", path: path, id: id });
        });
    }
    constructor(initialMemoryPages = WASMMemoryManager.InitialMemoryPages) {
        this._numPages = initialMemoryPages;
        this._memory = new WebAssembly.Memory({ initial: this._numPages });
        this._memoryViewByteLength = this._numPages << 16;
        this._memoryViewOffset = 0;
        this._memoryView = new Uint8Array(this._memory.buffer, this._memoryViewOffset, this._memoryViewByteLength);
    }
    get wasmMemory() {
        return this._memory;
    }
    getMemoryView(numPages, offset = 0, byteLength) {
        byteLength = byteLength ?? numPages << 16;
        if (this._numPages < numPages) {
            this._memory.grow(numPages - this._numPages);
            this._numPages = numPages;
            this._memoryView = new Uint8Array(this._memory.buffer, offset, byteLength);
            this._memoryViewByteLength = byteLength;
            this._memoryViewOffset = offset;
        }
        else {
            this._memoryView = new Uint8Array(this._memory.buffer, offset, byteLength);
            this._memoryViewByteLength = byteLength;
            this._memoryViewOffset = offset;
        }
        return this._memoryView;
    }
}
WASMMemoryManager.LoadBinariesFromCurrentThread = true;
WASMMemoryManager.InitialMemoryPages = (1 * 1024 * 1024) >> 16; // 1 Mbytes
WASMMemoryManager._RequestId = 0;


/***/ }),

/***/ "../../../tools/ktx2Decoder/dist/zstddec.js":
/*!**************************************************!*\
  !*** ../../../tools/ktx2Decoder/dist/zstddec.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZSTDDecoder: () => (/* binding */ ZSTDDecoder)
/* harmony export */ });
/* harmony import */ var _transcoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transcoder */ "../../../tools/ktx2Decoder/dist/transcoder.js");
/* eslint-disable @typescript-eslint/naming-convention */

let init;
let instance;
let heap;
const IMPORT_OBJECT = {
    env: {
        emscripten_notify_memory_growth: function () {
            heap = new Uint8Array(instance.exports.memory.buffer);
        },
    },
};
/**
 * ZSTD (Zstandard) decoder.
 */
class ZSTDDecoder {
    init() {
        if (init) {
            return init;
        }
        if (typeof fetch !== "undefined") {
            // Web.
            init = fetch(_transcoder__WEBPACK_IMPORTED_MODULE_0__.Transcoder.GetWasmUrl(ZSTDDecoder.WasmModuleURL))
                .then((response) => {
                if (response.ok) {
                    return response.arrayBuffer();
                }
                throw new Error(`Could not fetch the wasm component for the Zstandard decompression lib: ${response.status} - ${response.statusText}`);
            })
                .then((arrayBuffer) => WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT))
                .then(this._init);
        }
        else {
            // Node.js.
            init = WebAssembly.instantiateStreaming(fetch(ZSTDDecoder.WasmModuleURL), IMPORT_OBJECT).then(this._init);
        }
        return init;
    }
    _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(); // initialize heap.
    }
    decode(array, uncompressedSize = 0) {
        if (!instance) {
            throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        }
        // Write compressed data into WASM memory.
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        // Decompress into WASM memory.
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        // Read decompressed data and free WASM memory.
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
    }
}
ZSTDDecoder.WasmModuleURL = "zstddec.wasm";
/**
 * BSD License
 *
 * For Zstandard software
 *
 * Copyright (c) 2016-present, Yann Collet, Facebook, Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 *  * Neither the name Facebook nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ktx2decoder: () => (/* reexport module object */ ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ktx2decoder/legacy/legacy */ "../../../tools/ktx2Decoder/dist/legacy/legacy.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ktx2decoder_legacy_legacy__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5rdHgyRGVjb2Rlci5tYXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUdBOztBQUVBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQW5CQTs7QUFFQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQW5CQTs7QUFFQTtBQUNBO0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBdENBOztBQUVBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFFQTtBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUF0Q0E7O0FBRUE7QUFDQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUVBO0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQXRDQTs7QUFFQTtBQUNBO0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFXQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBdENBOztBQUVBO0FBQ0E7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBRUE7QUFFQTtBQU1BOztBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVdBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBaEpBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUExSUE7QUE2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeExBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEyR0E7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelhBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM1BBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFXQTtBQUNBOztBQWhDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQXBEQTtBQU1BOzs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7QUFFQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQXpFQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUVBO0FBY0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUF2REE7QUEwREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkE7Ozs7Ozs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0tUWDJERUNPREVSL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi9kZXYvY29yZS9zcmMvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXMudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL01pc2MvZGF0YVJlYWRlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvTWlzYy9pbmRleC50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19BU1RDLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzcudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk0udHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQi50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STS50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvVHJhbnNjb2RlcnMvbXNjVHJhbnNjb2Rlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL2t0eDJEZWNvZGVyLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy9rdHgyRmlsZVJlYWRlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvbGVnYWN5L2xlZ2FjeS50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvdHJhbnNjb2RlRGVjaXNpb25UcmVlLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy90cmFuc2NvZGVyLnRzIiwid2VicGFjazovL0tUWDJERUNPREVSLy4uLy4uLy4uL3Rvb2xzL2t0eDJEZWNvZGVyL3NyYy90cmFuc2NvZGVyTWFuYWdlci50cyIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi8uLi8uLi8uLi90b29scy9rdHgyRGVjb2Rlci9zcmMvd2FzbU1lbW9yeU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvLi4vLi4vLi4vdG9vbHMva3R4MkRlY29kZXIvc3JjL3pzdGRkZWMudHMiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0tUWDJERUNPREVSL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vS1RYMkRFQ09ERVIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9LVFgyREVDT0RFUi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0tUWDJERUNPREVSLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLWt0eDJkZWNvZGVyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1rdHgyZGVjb2RlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJLVFgyREVDT0RFUlwiXSA9IGZhY3RvcnkoKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksICgpID0+IHtcbnJldHVybiAiLCJleHBvcnQgZW51bSBTb3VyY2VUZXh0dXJlRm9ybWF0IHtcclxuICAgIEVUQzFTLFxyXG4gICAgVUFTVEM0eDQsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRyYW5zY29kZVRhcmdldCB7XHJcbiAgICBBU1RDXzRYNF9SR0JBLFxyXG4gICAgQkM3X1JHQkEsXHJcbiAgICBCQzNfUkdCQSxcclxuICAgIEJDMV9SR0IsXHJcbiAgICBQVlJUQzFfNF9SR0JBLFxyXG4gICAgUFZSVEMxXzRfUkdCLFxyXG4gICAgRVRDMl9SR0JBLFxyXG4gICAgRVRDMV9SR0IsXHJcbiAgICBSR0JBMzIsXHJcbiAgICBSOCxcclxuICAgIFJHOCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRW5naW5lRm9ybWF0IHtcclxuICAgIENPTVBSRVNTRURfUkdCQV9CUFRDX1VOT1JNX0VYVCA9IDB4OGU4YyxcclxuICAgIENPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjAsXHJcbiAgICBDT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4M2YwLFxyXG4gICAgQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFQgPSAweDgzZjMsXHJcbiAgICBDT01QUkVTU0VEX1JHQkFfUFZSVENfNEJQUFYxX0lNRyA9IDB4OGMwMixcclxuICAgIENPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDAsXHJcbiAgICBDT01QUkVTU0VEX1JHQkE4X0VUQzJfRUFDID0gMHg5Mjc4LFxyXG4gICAgQ09NUFJFU1NFRF9SR0I4X0VUQzIgPSAweDkyNzQsXHJcbiAgICBDT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMID0gMHg4ZDY0LFxyXG4gICAgUkdCQThGb3JtYXQgPSAweDgwNTgsXHJcbiAgICBSOEZvcm1hdCA9IDB4ODIyOSxcclxuICAgIFJHOEZvcm1hdCA9IDB4ODIyYixcclxufVxyXG5cclxuLyoqXHJcbiAqIExlYWYgbm9kZSBvZiBhIGRlY2lzaW9uIHRyZWVcclxuICogSXQgZGVmaW5lcyB0aGUgdHJhbnNjb2RpbmcgZm9ybWF0IHRvIHVzZSB0byB0cmFuc2NvZGUgdGhlIHRleHR1cmUgYXMgd2VsbCBhcyB0aGUgY29ycmVzcG9uZGluZyBmb3JtYXQgdG8gdXNlIGF0IHRoZSBlbmdpbmUgbGV2ZWwgd2hlbiBjcmVhdGluZyB0aGUgdGV4dHVyZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJTGVhZiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb3JtYXQgdG8gdHJhbnNjb2RlIHRvXHJcbiAgICAgKi9cclxuICAgIHRyYW5zY29kZUZvcm1hdDogVHJhbnNjb2RlVGFyZ2V0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZvcm1hdCB0byB1c2Ugd2hlbiBjcmVhdGluZyB0aGUgdGV4dHVyZSBhdCB0aGUgZW5naW5lIGxldmVsIGFmdGVyIGl0IGhhcyBiZWVuIHRyYW5zY29kZWQgdG8gdHJhbnNjb2RlRm9ybWF0XHJcbiAgICAgKi9cclxuICAgIGVuZ2luZUZvcm1hdDogRW5naW5lRm9ybWF0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgdGV4dHVyZSBtdXN0IGJlIHJvdW5kZWQgdG8gYSBtdWx0aXBsZSBvZiA0IChzaG91bGQgbm9ybWFsbHkgYmUgdGhlIGNhc2UgZm9yIGFsbCBjb21wcmVzc2VkIGZvcm1hdHMpLiBEZWZhdWx0OiB0cnVlXHJcbiAgICAgKi9cclxuICAgIHJvdW5kVG9NdWx0aXBsZTQ/OiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogUmVndWxhciBub2RlIG9mIGEgZGVjaXNpb24gdHJlZVxyXG4gKlxyXG4gKiBFYWNoIHByb3BlcnR5IChleGNlcHQgZm9yIFwieWVzXCIgYW5kIFwibm9cIiksIGlmIG5vdCBlbXB0eSwgd2lsbCBiZSBjaGVja2VkIGluIG9yZGVyIHRvIGRldGVybWluZSB0aGUgbmV4dCBub2RlIHRvIHNlbGVjdC5cclxuICogSWYgYWxsIGNoZWNrcyBhcmUgc3VjY2Vzc2Z1bCwgdGhlIFwieWVzXCIgbm9kZSB3aWxsIGJlIHNlbGVjdGVkLCBlbHNlIHRoZSBcIm5vXCIgbm9kZSB3aWxsIGJlIHNlbGVjdGVkLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJTm9kZSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBjYXBhYmlsaXR5IHRvIGNoZWNrLiBDYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XHJcbiAgICAgKiAgICAgIGFzdGNcclxuICAgICAqICAgICAgYnB0Y1xyXG4gICAgICogICAgICBzM3RjXHJcbiAgICAgKiAgICAgIHB2cnRjXHJcbiAgICAgKiAgICAgIGV0YzJcclxuICAgICAqICAgICAgZXRjMVxyXG4gICAgICovXHJcbiAgICBjYXA/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgb3B0aW9uIHRvIGNoZWNrIGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgS1RYMiBkZWNvZGUgZnVuY3Rpb24uIHtAbGluayBJS1RYMkRlY29kZXJPcHRpb25zfVxyXG4gICAgICovXHJcbiAgICBvcHRpb24/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgYWxwaGEgaXMgcHJlc2VudCBpbiB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBhbHBoYT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB0cmFuc2NvZGluZyBmb3JtYXQuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zY29kZUZvcm1hdD86IFRyYW5zY29kZVRhcmdldCB8IFRyYW5zY29kZVRhcmdldFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHRoYXQgdGhlIHRleHR1cmUgaXMgYSBwb3dlciBvZiB0d29cclxuICAgICAqL1xyXG4gICAgbmVlZHNQb3dlck9mVHdvPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBub2RlIHRvIHNlbGVjdCBpZiBhbGwgY2hlY2tzIGFyZSBzdWNjZXNzZnVsXHJcbiAgICAgKi9cclxuICAgIHllcz86IElOb2RlIHwgSUxlYWY7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbm9kZSB0byBzZWxlY3QgaWYgYXQgbGVhc3Qgb25lIGNoZWNrIGlzIG5vdCBzdWNjZXNzZnVsXHJcbiAgICAgKi9cclxuICAgIG5vPzogSU5vZGUgfCBJTGVhZjtcclxufVxyXG5cclxuLyoqXHJcbiAqIERlY2lzaW9uIHRyZWUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHRyYW5zY29kaW5nIGZvcm1hdCB0byB1c2UgZm9yIGEgZ2l2ZW4gc291cmNlIHRleHR1cmUgZm9ybWF0XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElEZWNpc2lvblRyZWUge1xyXG4gICAgLyoqXHJcbiAgICAgKiB0ZXh0dXJlRm9ybWF0IGNhbiBiZSBlaXRoZXIgVUFTVEMgb3IgRVRDMVNcclxuICAgICAqL1xyXG4gICAgW3RleHR1cmVGb3JtYXQ6IHN0cmluZ106IElOb2RlO1xyXG59XHJcblxyXG4vKipcclxuICogUmVzdWx0IG9mIHRoZSBLVFgyIGRlY29kZSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRGVjb2RlZERhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaWR0aCBvZiB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVpZ2h0IG9mIHRoZSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZvcm1hdCB0byB1c2Ugd2hlbiBjcmVhdGluZyB0aGUgdGV4dHVyZSBhdCB0aGUgZW5naW5lIGxldmVsXHJcbiAgICAgKiBUaGlzIGNvcnJlc3BvbmRzIHRvIHRoZSBlbmdpbmVGb3JtYXQgcHJvcGVydHkgb2YgdGhlIGxlYWYgbm9kZSBvZiB0aGUgZGVjaXNpb24gdHJlZVxyXG4gICAgICovXHJcbiAgICB0cmFuc2NvZGVkRm9ybWF0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0IG9mIG1pcG1hcCBsZXZlbHMuXHJcbiAgICAgKiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGUgYmFzZSBsZXZlbCwgdGhlIGxhc3QgZWxlbWVudCBpcyB0aGUgc21hbGxlc3QgbWlwbWFwIGxldmVsIChpZiBtb3JlIHRoYW4gb25lIG1pcG1hcCBsZXZlbCBpcyBwcmVzZW50KVxyXG4gICAgICovXHJcbiAgICBtaXBtYXBzOiBBcnJheTxJTWlwbWFwPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHRleHR1cmUgZGF0YSBpcyBpbiBnYW1tYSBzcGFjZSBvciBub3RcclxuICAgICAqL1xyXG4gICAgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSB0ZXh0dXJlIGhhcyBhbiBhbHBoYSBjaGFubmVsIG9yIG5vdFxyXG4gICAgICovXHJcbiAgICBoYXNBbHBoYTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSB0cmFuc2NvZGVyIHVzZWQgdG8gdHJhbnNjb2RlIHRoZSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHRyYW5zY29kZXJOYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXJyb3JzIChpZiBhbnkpIGVuY291bnRlcmVkIGR1cmluZyB0aGUgZGVjb2RpbmcgcHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBlcnJvcnM/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGEgbWlwbWFwIGxldmVsXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElNaXBtYXAge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0YSBvZiB0aGUgbWlwbWFwIGxldmVsXHJcbiAgICAgKi9cclxuICAgIGRhdGE6IFVpbnQ4QXJyYXkgfCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHdpZHRoIG9mIHRoZSBtaXBtYXAgbGV2ZWxcclxuICAgICAqL1xyXG4gICAgd2lkdGg6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIG1pcG1hcCBsZXZlbFxyXG4gICAgICovXHJcbiAgICBoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBjb21wcmVzc2VkIHRleHR1cmUgZm9ybWF0cyBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXByZXNzZWRGb3JtYXRDYXBhYmlsaXRpZXMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIEFTVENcclxuICAgICAqL1xyXG4gICAgYXN0Yz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIEJQVENcclxuICAgICAqL1xyXG4gICAgYnB0Yz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIFMzVENcclxuICAgICAqL1xyXG4gICAgczN0Yz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIFBWUlRDXHJcbiAgICAgKi9cclxuICAgIHB2cnRjPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgRVRDMlxyXG4gICAgICovXHJcbiAgICBldGMyPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgRVRDMVxyXG4gICAgICovXHJcbiAgICBldGMxPzogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBLVFgyIGRlY29kZSBmdW5jdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJS1RYMkRlY29kZXJPcHRpb25zIHtcclxuICAgIC8qKiB1c2UgUkdCQSBmb3JtYXQgaWYgQVNUQyBhbmQgQkM3IGFyZSBub3QgYXZhaWxhYmxlIGFzIHRyYW5zY29kZWQgZm9ybWF0ICovXHJcbiAgICB1c2VSR0JBSWZBU1RDQkM3Tm90QXZhaWxhYmxlV2hlblVBU1RDPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogZm9yY2UgdG8gYWx3YXlzIHVzZSAodW5jb21wcmVzc2VkKSBSR0JBIGZvciB0cmFuc2NvZGVkIGZvcm1hdCAqL1xyXG4gICAgZm9yY2VSR0JBPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKiogZm9yY2UgdG8gYWx3YXlzIHVzZSAodW5jb21wcmVzc2VkKSBSOCBmb3IgdHJhbnNjb2RlZCBmb3JtYXQgKi9cclxuICAgIGZvcmNlUjg/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBmb3JjZSB0byBhbHdheXMgdXNlICh1bmNvbXByZXNzZWQpIFJHOCBmb3IgdHJhbnNjb2RlZCBmb3JtYXQgKi9cclxuICAgIGZvcmNlUkc4PzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGxpc3Qgb2YgdHJhbnNjb2RlcnMgdG8gYnlwYXNzIHdoZW4gbG9va2luZyBmb3IgYSBzdWl0YWJsZSB0cmFuc2NvZGVyLiBUaGUgYXZhaWxhYmxlIHRyYW5zY29kZXJzIGFyZTpcclxuICAgICAqICAgICAgVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19BU1RDXHJcbiAgICAgKiAgICAgIFVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfQkM3XHJcbiAgICAgKiAgICAgIFVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STVxyXG4gICAgICogICAgICBVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQlxyXG4gICAgICogICAgICBVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNXHJcbiAgICAgKiAgICAgIFVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfUkc4X1VOT1JNXHJcbiAgICAgKiAgICAgIE1TQ1RyYW5zY29kZXJcclxuICAgICAqL1xyXG4gICAgYnlwYXNzVHJhbnNjb2RlcnM/OiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBkZWNpc2lvbiB0cmVlIHRvIGFwcGx5IGFmdGVyIHRoZSBkZWZhdWx0IGRlY2lzaW9uIHRyZWUgaGFzIHNlbGVjdGVkIGEgdHJhbnNjb2RpbmcgZm9ybWF0LlxyXG4gICAgICogQWxsb3dzIHRoZSB1c2VyIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IGRlY2lzaW9uIHRyZWUgc2VsZWN0aW9uLlxyXG4gICAgICogVGhlIGRlY2lzaW9uIHRyZWUgY2FuIHVzZSB0aGUgSU5vZGUudHJhbnNjb2RlRm9ybWF0IHByb3BlcnR5IHRvIGJhc2UgaXRzIGRlY2lzaW9uIG9uIHRoZSB0cmFuc2NvZGluZyBmb3JtYXQgc2VsZWN0ZWQgYnkgdGhlIGRlZmF1bHQgZGVjaXNpb24gdHJlZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNjb2RlRm9ybWF0RGVjaXNpb25UcmVlPzogSURlY2lzaW9uVHJlZTtcclxufVxyXG4iLCIvKipcclxuICogVXRpbGl0eSBjbGFzcyBmb3IgcmVhZGluZyBmcm9tIGEgZGF0YSBidWZmZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRhUmVhZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGN1cnJlbnQgYnl0ZSBvZmZzZXQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBkYXRhIGJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBieXRlT2Zmc2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhQnl0ZU9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kYXRhVmlldzogRGF0YVZpZXc7XHJcbiAgICBwcml2YXRlIF9kYXRhQnl0ZU9mZnNldDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSBidWZmZXIgVGhlIGJ1ZmZlciB0byBzZXRcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBzdGFydGluZyBvZmZzZXQgaW4gdGhlIGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGJ5dGVMZW5ndGggVGhlIGJ5dGUgbGVuZ3RoIG9mIHRoZSBidWZmZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoYnVmZmVyOiBBcnJheUJ1ZmZlciB8IEFycmF5QnVmZmVyVmlldywgYnl0ZU9mZnNldD86IG51bWJlciwgYnl0ZUxlbmd0aD86IG51bWJlcikge1xyXG4gICAgICAgIGlmICgoYnVmZmVyIGFzIEFycmF5QnVmZmVyVmlldykuYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3ID0gbmV3IERhdGFWaWV3KFxyXG4gICAgICAgICAgICAgICAgKGJ1ZmZlciBhcyBBcnJheUJ1ZmZlclZpZXcpLmJ1ZmZlcixcclxuICAgICAgICAgICAgICAgIChidWZmZXIgYXMgQXJyYXlCdWZmZXJWaWV3KS5ieXRlT2Zmc2V0ICsgKGJ5dGVPZmZzZXQgPz8gMCksXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoID8/IChidWZmZXIgYXMgQXJyYXlCdWZmZXJWaWV3KS5ieXRlTGVuZ3RoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyIGFzIEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0ID8/IDAsIGJ5dGVMZW5ndGggPz8gKGJ1ZmZlciBhcyBBcnJheUJ1ZmZlcikuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kYXRhQnl0ZU9mZnNldCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgdW5zaWduZWQgOC1iaXQgaW50ZWdlciBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgOC1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVWludDgoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldFVpbnQ4KHRoaXMuX2RhdGFCeXRlT2Zmc2V0KTtcclxuICAgICAgICB0aGlzLl9kYXRhQnl0ZU9mZnNldCArPSAxO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYSBzaWduZWQgOC1iaXQgaW50ZWdlciBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgOC1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkSW50OCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZGF0YVZpZXcuZ2V0SW50OCh0aGlzLl9kYXRhQnl0ZU9mZnNldCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gMTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgdW5zaWduZWQgMTYtYml0IGludGVnZXIgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgVGhlIDE2LWJpdCBpbnRlZ2VyIHJlYWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRVaW50MTYoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldFVpbnQxNih0aGlzLl9kYXRhQnl0ZU9mZnNldCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gMjtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgc2lnbmVkIDE2LWJpdCBpbnRlZ2VyIGZyb20gdGhlIGN1cnJlbnRseSBsb2FkZWQgZGF0YSByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIFRoZSAxNi1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkSW50MTYoKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2RhdGFWaWV3LmdldEludDE2KHRoaXMuX2RhdGFCeXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICB0aGlzLl9kYXRhQnl0ZU9mZnNldCArPSAyO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYSB1bnNpZ25lZCAzMi1iaXQgaW50ZWdlciBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgMzItYml0IGludGVnZXIgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVpbnQzMigpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZGF0YVZpZXcuZ2V0VWludDMyKHRoaXMuX2RhdGFCeXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICB0aGlzLl9kYXRhQnl0ZU9mZnNldCArPSA0O1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYSBzaWduZWQgMzItYml0IGludGVnZXIgZnJvbSB0aGUgY3VycmVudGx5IGxvYWRlZCBkYXRhIHJhbmdlLlxyXG4gICAgICogQHJldHVybnMgVGhlIDMyLWJpdCBpbnRlZ2VyIHJlYWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRJbnQzMigpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZGF0YVZpZXcuZ2V0SW50MzIodGhpcy5fZGF0YUJ5dGVPZmZzZXQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2RhdGFCeXRlT2Zmc2V0ICs9IDQ7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIHVuc2lnbmVkIDMyLWJpdCBpbnRlZ2VyIGZyb20gdGhlIGN1cnJlbnRseSBsb2FkZWQgZGF0YSByYW5nZS5cclxuICAgICAqIEByZXR1cm5zIFRoZSAzMi1iaXQgaW50ZWdlciByZWFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkVWludDY0KCk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gc3BsaXQgNjQtYml0IG51bWJlciBpbnRvIHR3byAzMi1iaXQgKDQtYnl0ZSkgcGFydHNcclxuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5fZGF0YVZpZXcuZ2V0VWludDMyKHRoaXMuX2RhdGFCeXRlT2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHRoaXMuX2RhdGFWaWV3LmdldFVpbnQzMih0aGlzLl9kYXRhQnl0ZU9mZnNldCArIDQsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBjb21iaW5lIHRoZSB0d28gMzItYml0IHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IGNvbWJpbmVkID0gbGVmdCArIDIgKiogMzIgKiByaWdodDsgLy8gVGhhdCB3YXMgd2VpcmQuLktlZXBpbmcgaXQgZm9yIHBvc3Rlcml0eTogdHJ1ZSA/IGxlZnQgKyAyICoqIDMyICogcmlnaHQgOiAyICoqIDMyICogbGVmdCArIHJpZ2h0O1xyXG5cclxuICAgICAgICAvKmlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoY29tYmluZWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGF0YVJlYWRlcjogJyArIGNvbWJpbmVkICsgJyBleGNlZWRzIE1BWF9TQUZFX0lOVEVHRVIuIFByZWNpc2lvbiBtYXkgYmUgbG9zdC4nKTtcclxuICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gODtcclxuICAgICAgICByZXR1cm4gY29tYmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIGEgYnl0ZSBhcnJheSBmcm9tIHRoZSBjdXJyZW50bHkgbG9hZGVkIGRhdGEgcmFuZ2UuXHJcbiAgICAgKiBAcGFyYW0gYnl0ZUxlbmd0aCBUaGUgYnl0ZSBsZW5ndGggdG8gcmVhZFxyXG4gICAgICogQHJldHVybnMgVGhlIGJ5dGUgYXJyYXkgcmVhZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZFVpbnQ4QXJyYXkoYnl0ZUxlbmd0aDogbnVtYmVyKTogVWludDhBcnJheSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBuZXcgVWludDhBcnJheSh0aGlzLl9kYXRhVmlldy5idWZmZXIsIHRoaXMuX2RhdGFWaWV3LmJ5dGVPZmZzZXQgKyB0aGlzLl9kYXRhQnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gYnl0ZUxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTa2lwcyB0aGUgZ2l2ZW4gYnl0ZSBsZW5ndGggdGhlIGN1cnJlbnRseSBsb2FkZWQgZGF0YSByYW5nZS5cclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIFRoZSBieXRlIGxlbmd0aCB0byBza2lwXHJcbiAgICAgKiBAcmV0dXJucyBUaGlzIGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBza2lwQnl0ZXMoYnl0ZUxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YUJ5dGVPZmZzZXQgKz0gYnl0ZUxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9kYXRhUmVhZGVyXCI7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyX1VBU1RDX0FTVENcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1VOT1JNXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9tc2NUcmFuc2NvZGVyXCI7XHJcbiIsImltcG9ydCB0eXBlICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgVHJhbnNjb2RlciB9IGZyb20gXCIuLi90cmFuc2NvZGVyXCI7XHJcbmltcG9ydCB7IFdBU01NZW1vcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL3dhc21NZW1vcnlNYW5hZ2VyXCI7XHJcbmltcG9ydCB0eXBlIHsgS1RYMkZpbGVSZWFkZXIsIElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExpdGVUcmFuc2NvZGVyIGV4dGVuZHMgVHJhbnNjb2RlciB7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9tb2R1bGVQcm9taXNlOiBQcm9taXNlPHsgbW9kdWxlOiBhbnkgfT47XHJcbiAgICBwcml2YXRlIF9tZW1vcnlNYW5hZ2VyOiBXQVNNTWVtb3J5TWFuYWdlcjtcclxuICAgIHByb3RlY3RlZCBfdHJhbnNjb2RlSW5QbGFjZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2xvYWRNb2R1bGUoKTogUHJvbWlzZTx7IG1vZHVsZTogYW55IH0+IHtcclxuICAgICAgICBpZiAodGhpcy5fbW9kdWxlUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21vZHVsZVByb21pc2UgPSBXQVNNTWVtb3J5TWFuYWdlci5Mb2FkV0FTTSh0aGlzLl9tb2R1bGVQYXRoKS50aGVuKCh3YXNtQmluYXJ5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUod2FzbUJpbmFyeSBhcyBBcnJheUJ1ZmZlciwgeyBlbnY6IHsgbWVtb3J5OiB0aGlzLl9tZW1vcnlNYW5hZ2VyLndhc21NZW1vcnkgfSB9KS50aGVuKChtb2R1bGVXcmFwcGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IG1vZHVsZTogbW9kdWxlV3JhcHBlci5pbnN0YW5jZS5leHBvcnRzIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlUHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IG1lbW9yeU1hbmFnZXIoKTogV0FTTU1lbW9yeU1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnlNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHByb3RlY3RlZCBzZXRNb2R1bGVQYXRoKG1vZHVsZVBhdGg6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21vZHVsZVBhdGggPSBUcmFuc2NvZGVyLkdldFdhc21VcmwobW9kdWxlUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNjb2RlSW5QbGFjZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5lZWRNZW1vcnlNYW5hZ2VyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW1vcnlNYW5hZ2VyKG1lbW9yeU1ncjogV0FTTU1lbW9yeU1hbmFnZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tZW1vcnlNYW5hZ2VyID0gbWVtb3J5TWdyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkTW9kdWxlKCkudGhlbigobW9kdWxlV3JhcHBlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZXI6IGFueSA9IG1vZHVsZVdyYXBwZXIubW9kdWxlO1xyXG4gICAgICAgICAgICBjb25zdCBbdGV4dHVyZVZpZXcsIHVuY29tcHJlc3NlZFRleHR1cmVWaWV3LCBuQmxvY2tzXSA9IHRoaXMuX3ByZXBhcmVUcmFuc2NvZGluZyh3aWR0aCwgaGVpZ2h0LCB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoLCBlbmNvZGVkRGF0YSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNjb2Rlci50cmFuc2NvZGUobkJsb2NrcykgPT09IDAgPyAodGhpcy5fdHJhbnNjb2RlSW5QbGFjZSA/IHRleHR1cmVWaWV3LnNsaWNlKCkgOiB1bmNvbXByZXNzZWRUZXh0dXJlVmlldyEuc2xpY2UoKSkgOiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfcHJlcGFyZVRyYW5zY29kaW5nKFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGVuY29kZWREYXRhOiBVaW50OEFycmF5LFxyXG4gICAgICAgIHVuY29tcHJlc3NlZE51bUNvbXBvbmVudHM/OiBudW1iZXJcclxuICAgICk6IFtVaW50OEFycmF5LCBVaW50OEFycmF5IHwgbnVsbCwgbnVtYmVyXSB7XHJcbiAgICAgICAgY29uc3QgbkJsb2NrcyA9ICgod2lkdGggKyAzKSA+PiAyKSAqICgoaGVpZ2h0ICsgMykgPj4gMik7XHJcblxyXG4gICAgICAgIGlmICh1bmNvbXByZXNzZWROdW1Db21wb25lbnRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aCA9IHdpZHRoICogKChoZWlnaHQgKyAzKSA+PiAyKSAqIDQgKiB1bmNvbXByZXNzZWROdW1Db21wb25lbnRzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGV4TWVtb3J5UGFnZXMgPSAoKG5CbG9ja3MgKiAxNiArIDY1NTM1ICsgKHRoaXMuX3RyYW5zY29kZUluUGxhY2UgPyAwIDogdW5jb21wcmVzc2VkQnl0ZUxlbmd0aCkpID4+IDE2KSArIDE7XHJcblxyXG4gICAgICAgIGNvbnN0IHRleHR1cmVWaWV3ID0gdGhpcy5tZW1vcnlNYW5hZ2VyLmdldE1lbW9yeVZpZXcodGV4TWVtb3J5UGFnZXMsIDY1NTM2LCBuQmxvY2tzICogMTYpO1xyXG5cclxuICAgICAgICBjb25zdCB1bmNvbXByZXNzZWRUZXh0dXJlVmlldyA9IHRoaXMuX3RyYW5zY29kZUluUGxhY2VcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogbmV3IFVpbnQ4QXJyYXkoXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuX21lbW9yeU1hbmFnZXIud2FzbU1lbW9yeS5idWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgIDY1NTM2ICsgbkJsb2NrcyAqIDE2LFxyXG4gICAgICAgICAgICAgICAgICB1bmNvbXByZXNzZWROdW1Db21wb25lbnRzICE9PSB1bmRlZmluZWQgPyB3aWR0aCAqIGhlaWdodCAqIHVuY29tcHJlc3NlZE51bUNvbXBvbmVudHMgOiB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGV4dHVyZVZpZXcuc2V0KGVuY29kZWREYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFt0ZXh0dXJlVmlldywgdW5jb21wcmVzc2VkVGV4dHVyZVZpZXcsIG5CbG9ja3NdO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyIH0gZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIExpdGVUcmFuc2NvZGVyX1VBU1RDX0FTVEMgZXh0ZW5kcyBMaXRlVHJhbnNjb2RlciB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSB3YXNtIG1vZHVsZSBmb3IgdGhlIHRyYW5zY29kZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtTW9kdWxlVVJMID0gXCJrdHgyVHJhbnNjb2RlcnMvMS91YXN0Y19hc3RjLndhc21cIjtcclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBwdWJsaWMgc3RhdGljIENhblRyYW5zY29kZShzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCwgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgJiYgZHN0ID09PSBLVFgyLlRyYW5zY29kZVRhcmdldC5BU1RDXzRYNF9SR0JBO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9IFwiVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19BU1RDXCI7XHJcblxyXG4gICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gTGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQy5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLnNldE1vZHVsZVBhdGgoTGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQy5XYXNtTW9kdWxlVVJMKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2RlciB9IGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzcgZXh0ZW5kcyBMaXRlVHJhbnNjb2RlciB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSB3YXNtIG1vZHVsZSBmb3IgdGhlIHRyYW5zY29kZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtTW9kdWxlVVJMID0gXCJrdHgyVHJhbnNjb2RlcnMvMS91YXN0Y19iYzcud2FzbVwiO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCAmJiBkc3QgPT09IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkJDN19SR0JBO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9IFwiVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19CQzdcIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19CQzcuTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb2R1bGVQYXRoKExpdGVUcmFuc2NvZGVyX1VBU1RDX0JDNy5XYXNtTW9kdWxlVVJMKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2RlciB9IGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgS1RYMkZpbGVSZWFkZXIsIElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgTGl0ZVRyYW5zY29kZXJfVUFTVENfUjhfVU5PUk0gZXh0ZW5kcyBMaXRlVHJhbnNjb2RlciB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSB3YXNtIG1vZHVsZSBmb3IgdGhlIHRyYW5zY29kZXIgKHVub3JtKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcImt0eDJUcmFuc2NvZGVycy8xL3Vhc3RjX3I4X3Vub3JtLndhc21cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENhblRyYW5zY29kZShzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCwgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgJiYgZHN0ID09PSBLVFgyLlRyYW5zY29kZVRhcmdldC5SODtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUgPSBcIlVuaXZlcnNhbFRyYW5zY29kZXJfVUFTVENfUjhfVU5PUk1cIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STS5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLl90cmFuc2NvZGVJblBsYWNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRNb2R1bGVQYXRoKExpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNLldhc21Nb2R1bGVVUkwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkTW9kdWxlKCkudGhlbigobW9kdWxlV3JhcHBlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zY29kZXI6IGFueSA9IG1vZHVsZVdyYXBwZXIubW9kdWxlO1xyXG4gICAgICAgICAgICBjb25zdCBbLCB1bmNvbXByZXNzZWRUZXh0dXJlVmlld10gPSB0aGlzLl9wcmVwYXJlVHJhbnNjb2Rpbmcod2lkdGgsIGhlaWdodCwgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aCwgZW5jb2RlZERhdGEsIDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zY29kZXIuZGVjb2RlKHdpZHRoLCBoZWlnaHQpID09PSAwID8gdW5jb21wcmVzc2VkVGV4dHVyZVZpZXchLnNsaWNlKCkgOiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEtUWDIgZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2t0eDJkZWNvZGVyVHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyIH0gZnJvbSBcIi4vbGl0ZVRyYW5zY29kZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBLVFgyRmlsZVJlYWRlciwgSUtUWDJfSW1hZ2VEZXNjIH0gZnJvbSBcIi4uL2t0eDJGaWxlUmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk0gZXh0ZW5kcyBMaXRlVHJhbnNjb2RlciB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSB3YXNtIG1vZHVsZSBmb3IgdGhlIHRyYW5zY29kZXIgKHVub3JtKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcImt0eDJUcmFuc2NvZGVycy8xL3Vhc3RjX3JnOF91bm9ybS53YXNtXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDYW5UcmFuc2NvZGUoc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHNyYyA9PT0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LlVBU1RDNHg0ICYmIGRzdCA9PT0gS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkc4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSA9IFwiVW5pdmVyc2FsVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk1cIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk0uTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5fdHJhbnNjb2RlSW5QbGFjZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0TW9kdWxlUGF0aChMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SRzhfVU5PUk0uV2FzbU1vZHVsZVVSTCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zY29kZShcclxuICAgICAgICBzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCxcclxuICAgICAgICBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LFxyXG4gICAgICAgIGxldmVsOiBudW1iZXIsXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoOiBudW1iZXIsXHJcbiAgICAgICAga3R4MlJlYWRlcjogS1RYMkZpbGVSZWFkZXIsXHJcbiAgICAgICAgaW1hZ2VEZXNjOiBJS1RYMl9JbWFnZURlc2MgfCBudWxsLFxyXG4gICAgICAgIGVuY29kZWREYXRhOiBVaW50OEFycmF5XHJcbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCBudWxsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRNb2R1bGUoKS50aGVuKChtb2R1bGVXcmFwcGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNjb2RlcjogYW55ID0gbW9kdWxlV3JhcHBlci5tb2R1bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IFssIHVuY29tcHJlc3NlZFRleHR1cmVWaWV3XSA9IHRoaXMuX3ByZXBhcmVUcmFuc2NvZGluZyh3aWR0aCwgaGVpZ2h0LCB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoLCBlbmNvZGVkRGF0YSwgMik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNjb2Rlci5kZWNvZGUod2lkdGgsIGhlaWdodCkgPT09IDAgPyB1bmNvbXByZXNzZWRUZXh0dXJlVmlldyEuc2xpY2UoKSA6IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXIgfSBmcm9tIFwiLi9saXRlVHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEtUWDJGaWxlUmVhZGVyLCBJS1RYMl9JbWFnZURlc2MgfSBmcm9tIFwiLi4va3R4MkZpbGVSZWFkZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQiBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlciAoc3JnYilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtTW9kdWxlVVJMID0gXCJrdHgyVHJhbnNjb2RlcnMvMS91YXN0Y19yZ2JhOF9zcmdiX3YyLndhc21cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIENhblRyYW5zY29kZShzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCwgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgJiYgZHN0ID09PSBLVFgyLlRyYW5zY29kZVRhcmdldC5SR0JBMzIgJiYgaXNJbkdhbW1hU3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQlwiO1xyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQi5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLl90cmFuc2NvZGVJblBsYWNlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRNb2R1bGVQYXRoKExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQi5XYXNtTW9kdWxlVVJMKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNjb2RlKFxyXG4gICAgICAgIHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LFxyXG4gICAgICAgIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsXHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGg6IG51bWJlcixcclxuICAgICAgICBrdHgyUmVhZGVyOiBLVFgyRmlsZVJlYWRlcixcclxuICAgICAgICBpbWFnZURlc2M6IElLVFgyX0ltYWdlRGVzYyB8IG51bGwsXHJcbiAgICAgICAgZW5jb2RlZERhdGE6IFVpbnQ4QXJyYXlcclxuICAgICk6IFByb21pc2U8VWludDhBcnJheSB8IG51bGw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZE1vZHVsZSgpLnRoZW4oKG1vZHVsZVdyYXBwZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2NvZGVyOiBhbnkgPSBtb2R1bGVXcmFwcGVyLm1vZHVsZTtcclxuICAgICAgICAgICAgY29uc3QgWywgdW5jb21wcmVzc2VkVGV4dHVyZVZpZXddID0gdGhpcy5fcHJlcGFyZVRyYW5zY29kaW5nKHdpZHRoLCBoZWlnaHQsIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGgsIGVuY29kZWREYXRhLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2NvZGVyLmRlY29kZSh3aWR0aCwgaGVpZ2h0KSA9PT0gMCA/IHVuY29tcHJlc3NlZFRleHR1cmVWaWV3IS5zbGljZSgpIDogbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2RlciB9IGZyb20gXCIuL2xpdGVUcmFuc2NvZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgS1RYMkZpbGVSZWFkZXIsIElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STSBleHRlbmRzIExpdGVUcmFuc2NvZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogVVJMIHRvIHVzZSB3aGVuIGxvYWRpbmcgdGhlIHdhc20gbW9kdWxlIGZvciB0aGUgdHJhbnNjb2RlciAodW5vcm0pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV2FzbU1vZHVsZVVSTCA9IFwia3R4MlRyYW5zY29kZXJzLzEvdWFzdGNfcmdiYThfdW5vcm1fdjIud2FzbVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBzcmMgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCAmJiBkc3QgPT09IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlJHQkEzMiAmJiAhaXNJbkdhbW1hU3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJVbml2ZXJzYWxUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk1cIjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1VOT1JNLk5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuX3RyYW5zY29kZUluUGxhY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldE1vZHVsZVBhdGgoTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9VTk9STS5XYXNtTW9kdWxlVVJMKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhbnNjb2RlKFxyXG4gICAgICAgIHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LFxyXG4gICAgICAgIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsXHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgICAgIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGg6IG51bWJlcixcclxuICAgICAgICBrdHgyUmVhZGVyOiBLVFgyRmlsZVJlYWRlcixcclxuICAgICAgICBpbWFnZURlc2M6IElLVFgyX0ltYWdlRGVzYyB8IG51bGwsXHJcbiAgICAgICAgZW5jb2RlZERhdGE6IFVpbnQ4QXJyYXlcclxuICAgICk6IFByb21pc2U8VWludDhBcnJheSB8IG51bGw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZE1vZHVsZSgpLnRoZW4oKG1vZHVsZVdyYXBwZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2NvZGVyOiBhbnkgPSBtb2R1bGVXcmFwcGVyLm1vZHVsZTtcclxuICAgICAgICAgICAgY29uc3QgWywgdW5jb21wcmVzc2VkVGV4dHVyZVZpZXddID0gdGhpcy5fcHJlcGFyZVRyYW5zY29kaW5nKHdpZHRoLCBoZWlnaHQsIHVuY29tcHJlc3NlZEJ5dGVMZW5ndGgsIGVuY29kZWREYXRhLCA0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2NvZGVyLmRlY29kZSh3aWR0aCwgaGVpZ2h0KSA9PT0gMCA/IHVuY29tcHJlc3NlZFRleHR1cmVWaWV3IS5zbGljZSgpIDogbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBLVFgyIGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9rdHgyZGVjb2RlclR5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBUcmFuc2NvZGVyIH0gZnJvbSBcIi4uL3RyYW5zY29kZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBLVFgyRmlsZVJlYWRlciwgSUtUWDJfSW1hZ2VEZXNjIH0gZnJvbSBcIi4uL2t0eDJGaWxlUmVhZGVyXCI7XHJcbmltcG9ydCB7IFdBU01NZW1vcnlNYW5hZ2VyIH0gZnJvbSBcIi4uL3dhc21NZW1vcnlNYW5hZ2VyXCI7XHJcblxyXG5kZWNsYXJlIGxldCBNU0NfVFJBTlNDT0RFUjogYW55O1xyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiBpbXBvcnRTY3JpcHRzKC4uLnVybHM6IHN0cmluZ1tdKTogdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNU0NUcmFuc2NvZGVyIGV4dGVuZHMgVHJhbnNjb2RlciB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byB1c2Ugd2hlbiBsb2FkaW5nIHRoZSBNU0MgdHJhbnNjb2RlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEpTTW9kdWxlVVJMID0gXCJrdHgyVHJhbnNjb2RlcnMvMS9tc2NfYmFzaXNfdHJhbnNjb2Rlci5qc1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVUkwgdG8gdXNlIHdoZW4gbG9hZGluZyB0aGUgd2FzbSBtb2R1bGUgZm9yIHRoZSB0cmFuc2NvZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV2FzbU1vZHVsZVVSTCA9IFwia3R4MlRyYW5zY29kZXJzLzEvbXNjX2Jhc2lzX3RyYW5zY29kZXIud2FzbVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVXNlRnJvbVdvcmtlclRocmVhZCA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJNU0NUcmFuc2NvZGVyXCI7XHJcblxyXG4gICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gTVNDVHJhbnNjb2Rlci5OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21zY0Jhc2lzVHJhbnNjb2RlclByb21pc2U6IFByb21pc2U8dm9pZD47XHJcbiAgICBwcml2YXRlIF9tc2NCYXNpc01vZHVsZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2dldE1TQ0Jhc2lzVHJhbnNjb2RlcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fbXNjQmFzaXNUcmFuc2NvZGVyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbXNjQmFzaXNUcmFuc2NvZGVyUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21zY0Jhc2lzVHJhbnNjb2RlclByb21pc2UgPSBXQVNNTWVtb3J5TWFuYWdlci5Mb2FkV0FTTShUcmFuc2NvZGVyLkdldFdhc21VcmwoTVNDVHJhbnNjb2Rlci5XYXNtTW9kdWxlVVJMKSkudGhlbigod2FzbUJpbmFyeSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoTVNDVHJhbnNjb2Rlci5Vc2VGcm9tV29ya2VyVGhyZWFkKSB7XHJcbiAgICAgICAgICAgICAgICBpbXBvcnRTY3JpcHRzKFRyYW5zY29kZXIuR2V0V2FzbVVybChNU0NUcmFuc2NvZGVyLkpTTW9kdWxlVVJMKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV29ya2VyIE51bWJlciA9IDAgYW5kIE1TQ19UUkFOU0NPREVSIGhhcyBub3QgYmVlbiBsb2FkZWQgeWV0LlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgTVNDX1RSQU5TQ09ERVIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgVHJhbnNjb2Rlci5HZXRXYXNtVXJsKE1TQ1RyYW5zY29kZXIuSlNNb2R1bGVVUkwpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTVNDX1RSQU5TQ09ERVIoeyB3YXNtQmluYXJ5IH0pLnRoZW4oKGJhc2lzTW9kdWxlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2lzTW9kdWxlLmluaXRUcmFuc2NvZGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXNjQmFzaXNNb2R1bGUgPSBiYXNpc01vZHVsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIkNhbiBub3QgbG9hZCBNU0NfVFJBTlNDT0RFUiBzY3JpcHQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgIE1TQ19UUkFOU0NPREVSKHsgd2FzbUJpbmFyeSB9KS50aGVuKChiYXNpc01vZHVsZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzaXNNb2R1bGUuaW5pdFRyYW5zY29kZXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXNjQmFzaXNNb2R1bGUgPSBiYXNpc01vZHVsZTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9tc2NCYXNpc1RyYW5zY29kZXJQcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FuVHJhbnNjb2RlKHNyYzogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LCBkc3Q6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LCBpc0luR2FtbWFTcGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIGNvbnN0IGlzVmlkZW8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE1TQ0Jhc2lzVHJhbnNjb2RlcigpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiYXNpc01vZHVsZSA9IHRoaXMuX21zY0Jhc2lzTW9kdWxlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRyYW5zY29kZXI6IGFueTtcclxuICAgICAgICAgICAgbGV0IGltYWdlSW5mbzogYW55O1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnk7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlRGF0YTogYW55ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2NvZGVyID0gc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgPyBuZXcgYmFzaXNNb2R1bGUuVWFzdGNJbWFnZVRyYW5zY29kZXIoKSA6IG5ldyBiYXNpc01vZHVsZS5CYXNpc0x6RXRjMXNJbWFnZVRyYW5zY29kZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleEZvcm1hdCA9IHNyYyA9PT0gS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0LlVBU1RDNHg0ID8gYmFzaXNNb2R1bGUuVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCA6IGJhc2lzTW9kdWxlLlRleHR1cmVGb3JtYXQuRVRDMVM7XHJcblxyXG4gICAgICAgICAgICAgICAgaW1hZ2VJbmZvID0gbmV3IGJhc2lzTW9kdWxlLkltYWdlSW5mbyh0ZXhGb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGxldmVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRGb3JtYXQgPSBiYXNpc01vZHVsZS5UcmFuc2NvZGVUYXJnZXRbS1RYMi5UcmFuc2NvZGVUYXJnZXRbZHN0XV07IC8vIHdvcmtzIGJlY2F1c2UgdGhlIGxhYmVscyBvZiB0aGUgc291cmNlVGV4dHVyZUZvcm1hdCBlbnVtIGFyZSB0aGUgc2FtZSBhcyB0aGUgcHJvcGVydHkgbmFtZXMgdXNlZCBpbiBUcmFuc2NvZGVUYXJnZXQhXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFiYXNpc01vZHVsZS5pc0Zvcm1hdFN1cHBvcnRlZCh0YXJnZXRGb3JtYXQsIHRleEZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBNU0NUcmFuc2NvZGVyOiBUcmFuc2NvZGluZyBmcm9tIFwiJHtLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXRbc3JjXX1cIiB0byBcIiR7S1RYMi5UcmFuc2NvZGVUYXJnZXRbZHN0XX1cIiBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgdHJhbnNjb2RlciBidWlsZC5gXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3JjID09PSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuRVRDMVMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZ2QgPSBrdHgyUmVhZGVyLnN1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVyLmRlY29kZVBhbGV0dGVzKHNnZC5lbmRwb2ludENvdW50LCBzZ2QuZW5kcG9pbnRzRGF0YSwgc2dkLnNlbGVjdG9yQ291bnQsIHNnZC5zZWxlY3RvcnNEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVyLmRlY29kZVRhYmxlcyhzZ2QudGFibGVzRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5mbGFncyA9IGltYWdlRGVzYyEuaW1hZ2VGbGFncztcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8ucmdiQnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLnJnYkJ5dGVMZW5ndGggPSBpbWFnZURlc2MhLnJnYlNsaWNlQnl0ZUxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8uYWxwaGFCeXRlT2Zmc2V0ID0gaW1hZ2VEZXNjIS5hbHBoYVNsaWNlQnl0ZU9mZnNldCA+IDAgPyBpbWFnZURlc2MhLnJnYlNsaWNlQnl0ZUxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmFscGhhQnl0ZUxlbmd0aCA9IGltYWdlRGVzYyEuYWxwaGFTbGljZUJ5dGVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyYW5zY29kZXIudHJhbnNjb2RlSW1hZ2UodGFyZ2V0Rm9ybWF0LCBlbmNvZGVkRGF0YSwgaW1hZ2VJbmZvLCAwLCBpc1ZpZGVvKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLmZsYWdzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZUluZm8ucmdiQnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VJbmZvLnJnYkJ5dGVMZW5ndGggPSB1bmNvbXByZXNzZWRCeXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5hbHBoYUJ5dGVPZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5hbHBoYUJ5dGVMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cmFuc2NvZGVyLnRyYW5zY29kZUltYWdlKHRhcmdldEZvcm1hdCwgZW5jb2RlZERhdGEsIGltYWdlSW5mbywgMCwga3R4MlJlYWRlci5oYXNBbHBoYSwgaXNWaWRlbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNjb2Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIuZGVsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlSW5mby5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50cmFuc2NvZGVkSW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YSA9IHJlc3VsdC50cmFuc2NvZGVkSW1hZ2UuZ2V0X3R5cGVkX21lbW9yeV92aWV3KCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudHJhbnNjb2RlZEltYWdlLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGV4dHVyZURhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuZXhwb3J0ICogZnJvbSBcIi4va3R4MkRlY29kZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4va3R4MkZpbGVSZWFkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdHJhbnNjb2RlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi90cmFuc2NvZGVyTWFuYWdlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi93YXNtTWVtb3J5TWFuYWdlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi96c3RkZGVjXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL01pc2MvaW5kZXhcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vVHJhbnNjb2RlcnMvaW5kZXhcIjtcclxuIiwiLyoqXHJcbiAqIFJlc291cmNlcyB1c2VkIGZvciB0aGUgaW1wbGVtZW50YXRpb246XHJcbiAqICAtIDNqcyBLVFgyIGxvYWRlcjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL2RmYjVjMjNjZTEyNmVjODQ1ZTRhYTI0MDU5OTkxNWZlZjUzNzU3OTcvZXhhbXBsZXMvanNtL2xvYWRlcnMvS1RYMkxvYWRlci5qc1xyXG4gKiAgLSBVbml2ZXJzYWwgVGV4dHVyZSBUcmFuc2NvZGVyczogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9Vbml2ZXJzYWwtVGV4dHVyZS1UcmFuc2NvZGVyc1xyXG4gKiAgLSBLVFgyIHNwZWNpZmljYXRpb246IGh0dHA6Ly9naXRodWIua2hyb25vcy5vcmcvS1RYLVNwZWNpZmljYXRpb24vXHJcbiAqICAtIEtUWDIgYmluYXJpZXMgdG8gY29udmVydCBmaWxlczogaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9LVFgtU29mdHdhcmUvcmVsZWFzZXNcclxuICogIC0gS1RYIHNwZWNpZmljYXRpb246IGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L0RhdGFGb3JtYXQvc3BlY3MvMS4zL2RhdGFmb3JtYXQuMS4zLmh0bWxcclxuICogIC0gS1RYLVNvZnR3YXJlOiBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL0tUWC1Tb2Z0d2FyZVxyXG4gKi9cclxuaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJS1RYMl9JbWFnZURlc2MgfSBmcm9tIFwiLi9rdHgyRmlsZVJlYWRlclwiO1xyXG5pbXBvcnQgeyBLVFgyRmlsZVJlYWRlciwgU3VwZXJjb21wcmVzc2lvblNjaGVtZSB9IGZyb20gXCIuL2t0eDJGaWxlUmVhZGVyXCI7XHJcbmltcG9ydCB7IFRyYW5zY29kZXJNYW5hZ2VyIH0gZnJvbSBcIi4vdHJhbnNjb2Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXJfVUFTVENfQVNUQyB9IGZyb20gXCIuL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX0FTVENcIjtcclxuaW1wb3J0IHsgTGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3IH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3XCI7XHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk0gfSBmcm9tIFwiLi9UcmFuc2NvZGVycy9saXRlVHJhbnNjb2Rlcl9VQVNUQ19SR0JBX1VOT1JNXCI7XHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQiB9IGZyb20gXCIuL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfU1JHQlwiO1xyXG5pbXBvcnQgeyBMaXRlVHJhbnNjb2Rlcl9VQVNUQ19SOF9VTk9STSB9IGZyb20gXCIuL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNXCI7XHJcbmltcG9ydCB7IExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STSB9IGZyb20gXCIuL1RyYW5zY29kZXJzL2xpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STVwiO1xyXG5pbXBvcnQgeyBNU0NUcmFuc2NvZGVyIH0gZnJvbSBcIi4vVHJhbnNjb2RlcnMvbXNjVHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgeyBaU1RERGVjb2RlciB9IGZyb20gXCIuL3pzdGRkZWNcIjtcclxuaW1wb3J0IHsgVHJhbnNjb2RlRGVjaXNpb25UcmVlIH0gZnJvbSBcIi4vdHJhbnNjb2RlRGVjaXNpb25UcmVlXCI7XHJcblxyXG5jb25zdCBpc1Bvd2VyT2ZUd28gPSAodmFsdWU6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuICh2YWx1ZSAmICh2YWx1ZSAtIDEpKSA9PT0gMCAmJiB2YWx1ZSAhPT0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgZGVjb2RpbmcgS1RYMiBmaWxlc1xyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEtUWDJEZWNvZGVyIHtcclxuICAgIHByaXZhdGUgX3RyYW5zY29kZXJNZ3I6IFRyYW5zY29kZXJNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBfenN0ZERlY29kZXI6IFpTVEREZWNvZGVyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVmYXVsdERlY29kZXJPcHRpb25zOiBLVFgyLklLVFgyRGVjb2Rlck9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl90cmFuc2NvZGVyTWdyID0gbmV3IFRyYW5zY29kZXJNYW5hZ2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShkYXRhOiBVaW50OEFycmF5LCBjYXBzOiBLVFgyLklDb21wcmVzc2VkRm9ybWF0Q2FwYWJpbGl0aWVzLCBvcHRpb25zPzogS1RYMi5JS1RYMkRlY29kZXJPcHRpb25zKTogUHJvbWlzZTxLVFgyLklEZWNvZGVkRGF0YT4ge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsT3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgLi4uS1RYMkRlY29kZXIuRGVmYXVsdERlY29kZXJPcHRpb25zIH07XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qga2ZyID0gbmV3IEtUWDJGaWxlUmVhZGVyKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFrZnIuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIEtUMiBmaWxlOiB3cm9uZyBzaWduYXR1cmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGtmci5wYXJzZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtmci5uZWVkWlNURERlY29kZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fenN0ZERlY29kZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96c3RkRGVjb2RlciA9IG5ldyBaU1RERGVjb2RlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl96c3RkRGVjb2Rlci5pbml0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZURhdGEoa2ZyLCBjYXBzLCBmaW5hbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWNvZGVEYXRhKGtmciwgY2FwcywgZmluYWxPcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kZWNvZGVEYXRhKGtmcjogS1RYMkZpbGVSZWFkZXIsIGNhcHM6IEtUWDIuSUNvbXByZXNzZWRGb3JtYXRDYXBhYmlsaXRpZXMsIG9wdGlvbnM/OiBLVFgyLklLVFgyRGVjb2Rlck9wdGlvbnMpOiBQcm9taXNlPEtUWDIuSURlY29kZWREYXRhPiB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBrZnIuaGVhZGVyLnBpeGVsV2lkdGg7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0ga2ZyLmhlYWRlci5waXhlbEhlaWdodDtcclxuICAgICAgICBjb25zdCBzcmNUZXhGb3JtYXQgPSBrZnIudGV4dHVyZUZvcm1hdDtcclxuXHJcbiAgICAgICAgY29uc3QgZGVjaXNpb25UcmVlID0gbmV3IFRyYW5zY29kZURlY2lzaW9uVHJlZShzcmNUZXhGb3JtYXQsIGtmci5oYXNBbHBoYSwgaXNQb3dlck9mVHdvKHdpZHRoKSAmJiBpc1Bvd2VyT2ZUd28oaGVpZ2h0KSwgY2Fwcywgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zPy50cmFuc2NvZGVGb3JtYXREZWNpc2lvblRyZWUpIHtcclxuICAgICAgICAgICAgZGVjaXNpb25UcmVlLnBhcnNlVHJlZShvcHRpb25zPy50cmFuc2NvZGVGb3JtYXREZWNpc2lvblRyZWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHJhbnNjb2RlRm9ybWF0ID0gZGVjaXNpb25UcmVlLnRyYW5zY29kZUZvcm1hdDtcclxuICAgICAgICBjb25zdCBlbmdpbmVGb3JtYXQgPSBkZWNpc2lvblRyZWUuZW5naW5lRm9ybWF0O1xyXG4gICAgICAgIGNvbnN0IHJvdW5kVG9NdWx0aXBsZTQgPSBkZWNpc2lvblRyZWUucm91bmRUb011bHRpcGxlNDtcclxuXHJcbiAgICAgICAgY29uc3QgdHJhbnNjb2RlciA9IHRoaXMuX3RyYW5zY29kZXJNZ3IuZmluZFRyYW5zY29kZXIoc3JjVGV4Rm9ybWF0LCB0cmFuc2NvZGVGb3JtYXQsIGtmci5pc0luR2FtbWFTcGFjZSwgb3B0aW9ucz8uYnlwYXNzVHJhbnNjb2RlcnMpO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNjb2RlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgbm8gdHJhbnNjb2RlciBmb3VuZCB0byB0cmFuc2NvZGUgc291cmNlIHRleHR1cmUgZm9ybWF0IFwiJHtLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXRbc3JjVGV4Rm9ybWF0XX1cIiB0byBmb3JtYXQgXCIke0tUWDIuVHJhbnNjb2RlVGFyZ2V0W3RyYW5zY29kZUZvcm1hdF19XCJgXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaXBtYXBzOiBBcnJheTxLVFgyLklNaXBtYXA+ID0gW107XHJcbiAgICAgICAgY29uc3QgZGF0YVByb21pc2VzOiBBcnJheTxQcm9taXNlPFVpbnQ4QXJyYXkgfCBudWxsPj4gPSBbXTtcclxuICAgICAgICBjb25zdCBkZWNvZGVkRGF0YTogS1RYMi5JRGVjb2RlZERhdGEgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIHRyYW5zY29kZWRGb3JtYXQ6IGVuZ2luZUZvcm1hdCxcclxuICAgICAgICAgICAgbWlwbWFwcyxcclxuICAgICAgICAgICAgaXNJbkdhbW1hU3BhY2U6IGtmci5pc0luR2FtbWFTcGFjZSxcclxuICAgICAgICAgICAgaGFzQWxwaGE6IGtmci5oYXNBbHBoYSxcclxuICAgICAgICAgICAgdHJhbnNjb2Rlck5hbWU6IHRyYW5zY29kZXIuZ2V0TmFtZSgpLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBmaXJzdEltYWdlRGVzY0luZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgbGV2ZWwgPSAwOyBsZXZlbCA8IGtmci5oZWFkZXIubGV2ZWxDb3VudDsgbGV2ZWwrKykge1xyXG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdEltYWdlRGVzY0luZGV4ICs9IE1hdGgubWF4KGtmci5oZWFkZXIubGF5ZXJDb3VudCwgMSkgKiBrZnIuaGVhZGVyLmZhY2VDb3VudCAqIE1hdGgubWF4KGtmci5oZWFkZXIucGl4ZWxEZXB0aCA+PiAobGV2ZWwgLSAxKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsV2lkdGggPSBNYXRoLmZsb29yKHdpZHRoIC8gKDEgPDwgbGV2ZWwpKSB8fCAxO1xyXG4gICAgICAgICAgICBjb25zdCBsZXZlbEhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gKDEgPDwgbGV2ZWwpKSB8fCAxO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbnVtSW1hZ2VzSW5MZXZlbCA9IGtmci5oZWFkZXIuZmFjZUNvdW50OyAvLyBub3RlIHRoYXQgY3ViZW1hcCBhcmUgbm90IHN1cHBvcnRlZCB5ZXQgKHNlZSBLVFgyRmlsZVJlYWRlciksIHNvIGZhY2VDb3VudCA9PSAxXHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsSW1hZ2VCeXRlTGVuZ3RoID0gKChsZXZlbFdpZHRoICsgMykgPj4gMikgKiAoKGxldmVsSGVpZ2h0ICsgMykgPj4gMikgKiBrZnIuZGZkQmxvY2suYnl0ZXNQbGFuZVswXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxldmVsVW5jb21wcmVzc2VkQnl0ZUxlbmd0aCA9IGtmci5sZXZlbHNbbGV2ZWxdLnVuY29tcHJlc3NlZEJ5dGVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGV2ZWxEYXRhQnVmZmVyID0ga2ZyLmRhdGEuYnVmZmVyO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxldmVsRGF0YU9mZnNldCA9IGtmci5sZXZlbHNbbGV2ZWxdLmJ5dGVPZmZzZXQgKyBrZnIuZGF0YS5ieXRlT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VPZmZzZXRJbkxldmVsID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZnIuaGVhZGVyLnN1cGVyY29tcHJlc3Npb25TY2hlbWUgPT09IFN1cGVyY29tcHJlc3Npb25TY2hlbWUuWlN0YW5kYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXZlbERhdGFCdWZmZXIgPSB0aGlzLl96c3RkRGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkobGV2ZWxEYXRhQnVmZmVyLCBsZXZlbERhdGFPZmZzZXQsIGtmci5sZXZlbHNbbGV2ZWxdLmJ5dGVMZW5ndGgpLCBsZXZlbFVuY29tcHJlc3NlZEJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxEYXRhT2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkZWNvZGVkRGF0YS53aWR0aCA9IHJvdW5kVG9NdWx0aXBsZTQgPyAobGV2ZWxXaWR0aCArIDMpICYgfjMgOiBsZXZlbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgZGVjb2RlZERhdGEuaGVpZ2h0ID0gcm91bmRUb011bHRpcGxlNCA/IChsZXZlbEhlaWdodCArIDMpICYgfjMgOiBsZXZlbEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW1hZ2VJbmRleCA9IDA7IGltYWdlSW5kZXggPCBudW1JbWFnZXNJbkxldmVsOyBpbWFnZUluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbmNvZGVkRGF0YTogVWludDhBcnJheTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZURlc2M6IElLVFgyX0ltYWdlRGVzYyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChrZnIuaGVhZGVyLnN1cGVyY29tcHJlc3Npb25TY2hlbWUgPT09IFN1cGVyY29tcHJlc3Npb25TY2hlbWUuQmFzaXNMWikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGVzYyA9IGtmci5zdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YS5pbWFnZURlc2NzIVtmaXJzdEltYWdlRGVzY0luZGV4ICsgaW1hZ2VJbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZWREYXRhID0gbmV3IFVpbnQ4QXJyYXkobGV2ZWxEYXRhQnVmZmVyLCBsZXZlbERhdGFPZmZzZXQgKyBpbWFnZURlc2MucmdiU2xpY2VCeXRlT2Zmc2V0LCBpbWFnZURlc2MucmdiU2xpY2VCeXRlTGVuZ3RoICsgaW1hZ2VEZXNjLmFscGhhU2xpY2VCeXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlZERhdGEgPSBuZXcgVWludDhBcnJheShsZXZlbERhdGFCdWZmZXIsIGxldmVsRGF0YU9mZnNldCArIGltYWdlT2Zmc2V0SW5MZXZlbCwgbGV2ZWxJbWFnZUJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpbWFnZU9mZnNldEluTGV2ZWwgKz0gbGV2ZWxJbWFnZUJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWlwbWFwOiBLVFgyLklNaXBtYXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbGV2ZWxXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGxldmVsSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2NvZGVkRGF0YSA9IHRyYW5zY29kZXJcclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNjb2RlKHNyY1RleEZvcm1hdCwgdHJhbnNjb2RlRm9ybWF0LCBsZXZlbCwgbGV2ZWxXaWR0aCwgbGV2ZWxIZWlnaHQsIGxldmVsVW5jb21wcmVzc2VkQnl0ZUxlbmd0aCwga2ZyLCBpbWFnZURlc2MsIGVuY29kZWREYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pcG1hcC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVkRGF0YS5lcnJvcnMgPSBkZWNvZGVkRGF0YS5lcnJvcnMgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjb2RlZERhdGEuZXJyb3JzICs9IHJlYXNvbiArIFwiXFxuXCIgKyByZWFzb24uc3RhY2sgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhUHJvbWlzZXMucHVzaCh0cmFuc2NvZGVkRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWlwbWFwcy5wdXNoKG1pcG1hcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChkYXRhUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlZERhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFB1dCBpbiB0aGUgb3JkZXIgeW91IHdhbnQgdGhlIHRyYW5zY29kZXJzIHRvIGJlIHVzZWQgaW4gcHJpb3JpdHlcclxuVHJhbnNjb2Rlck1hbmFnZXIuUmVnaXN0ZXJUcmFuc2NvZGVyKExpdGVUcmFuc2NvZGVyX1VBU1RDX0FTVEMpO1xyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfQkM3KTtcclxuVHJhbnNjb2Rlck1hbmFnZXIuUmVnaXN0ZXJUcmFuc2NvZGVyKExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHQkFfVU5PUk0pO1xyXG5UcmFuc2NvZGVyTWFuYWdlci5SZWdpc3RlclRyYW5zY29kZXIoTGl0ZVRyYW5zY29kZXJfVUFTVENfUkdCQV9TUkdCKTtcclxuVHJhbnNjb2Rlck1hbmFnZXIuUmVnaXN0ZXJUcmFuc2NvZGVyKExpdGVUcmFuc2NvZGVyX1VBU1RDX1I4X1VOT1JNKTtcclxuVHJhbnNjb2Rlck1hbmFnZXIuUmVnaXN0ZXJUcmFuc2NvZGVyKExpdGVUcmFuc2NvZGVyX1VBU1RDX1JHOF9VTk9STSk7XHJcblRyYW5zY29kZXJNYW5hZ2VyLlJlZ2lzdGVyVHJhbnNjb2RlcihNU0NUcmFuc2NvZGVyKTsgLy8gY2F0Y2ggYWxsIHRyYW5zY29kZXIgLSB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBmb3JtYXQgY2FuJ3QgYmUgdHJhbnNjb2RlZFxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHsgRGF0YVJlYWRlciB9IGZyb20gXCIuL01pc2MvZGF0YVJlYWRlclwiO1xyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgZW51bSBTdXBlcmNvbXByZXNzaW9uU2NoZW1lIHtcclxuICAgIE5vbmUgPSAwLFxyXG4gICAgQmFzaXNMWiA9IDEsXHJcbiAgICBaU3RhbmRhcmQgPSAyLFxyXG4gICAgWkxpYiA9IDMsXHJcbn1cclxuXHJcbmNvbnN0IGVudW0gREZETW9kZWwge1xyXG4gICAgRVRDMVMgPSAxNjMsXHJcbiAgICBVQVNUQyA9IDE2NixcclxufVxyXG5cclxuY29uc3QgZW51bSBERkRDaGFubmVsX0VUQzFTIHtcclxuICAgIFJHQiA9IDAsXHJcbiAgICBSUlIgPSAzLFxyXG4gICAgR0dHID0gNCxcclxuICAgIEFBQSA9IDE1LFxyXG59XHJcblxyXG5jb25zdCBlbnVtIERGRENoYW5uZWxfVUFTVEMge1xyXG4gICAgUkdCID0gMCxcclxuICAgIFJHQkEgPSAzLFxyXG4gICAgUlJSID0gNCxcclxuICAgIFJSUkcgPSA1LFxyXG59XHJcblxyXG5jb25zdCBlbnVtIERGRFRyYW5zZmVyRnVuY3Rpb24ge1xyXG4gICAgbGluZWFyID0gMSxcclxuICAgIHNSR0IgPSAyLFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtUWDJfSGVhZGVyIHtcclxuICAgIHZrRm9ybWF0OiBudW1iZXI7XHJcbiAgICB0eXBlU2l6ZTogbnVtYmVyO1xyXG4gICAgcGl4ZWxXaWR0aDogbnVtYmVyO1xyXG4gICAgcGl4ZWxIZWlnaHQ6IG51bWJlcjtcclxuICAgIHBpeGVsRGVwdGg6IG51bWJlcjtcclxuICAgIGxheWVyQ291bnQ6IG51bWJlcjtcclxuICAgIGZhY2VDb3VudDogbnVtYmVyO1xyXG4gICAgbGV2ZWxDb3VudDogbnVtYmVyO1xyXG4gICAgc3VwZXJjb21wcmVzc2lvblNjaGVtZTogbnVtYmVyO1xyXG4gICAgZGZkQnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgZGZkQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAga3ZkQnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAga3ZkQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgc2dkQnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgc2dkQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUtUWDJfTGV2ZWwge1xyXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgYnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUtUWDJfU2FtcGxlIHtcclxuICAgIGJpdE9mZnNldDogbnVtYmVyO1xyXG4gICAgYml0TGVuZ3RoOiBudW1iZXI7XHJcbiAgICBjaGFubmVsVHlwZTogbnVtYmVyO1xyXG4gICAgY2hhbm5lbEZsYWdzOiBudW1iZXI7XHJcbiAgICBzYW1wbGVQb3NpdGlvbjogbnVtYmVyW107XHJcbiAgICBzYW1wbGVMb3dlcjogbnVtYmVyO1xyXG4gICAgc2FtcGxlVXBwZXI6IG51bWJlcjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElLVFgyX0RGRCB7XHJcbiAgICB2ZW5kb3JJZDogbnVtYmVyO1xyXG4gICAgZGVzY3JpcHRvclR5cGU6IG51bWJlcjtcclxuICAgIHZlcnNpb25OdW1iZXI6IG51bWJlcjtcclxuICAgIGRlc2NyaXB0b3JCbG9ja1NpemU6IG51bWJlcjtcclxuICAgIGNvbG9yTW9kZWw6IG51bWJlcjtcclxuICAgIGNvbG9yUHJpbWFyaWVzOiBudW1iZXI7XHJcbiAgICB0cmFuc2ZlckZ1bmN0aW9uOiBudW1iZXI7XHJcbiAgICBmbGFnczogbnVtYmVyO1xyXG4gICAgdGV4ZWxCbG9ja0RpbWVuc2lvbjoge1xyXG4gICAgICAgIHg6IG51bWJlcjtcclxuICAgICAgICB5OiBudW1iZXI7XHJcbiAgICAgICAgejogbnVtYmVyO1xyXG4gICAgICAgIHc6IG51bWJlcjtcclxuICAgIH07XHJcbiAgICBieXRlc1BsYW5lOiBBcnJheTxudW1iZXI+O1xyXG4gICAgbnVtU2FtcGxlczogbnVtYmVyO1xyXG4gICAgc2FtcGxlczogQXJyYXk8SUtUWDJfU2FtcGxlPjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElLVFgyX0ltYWdlRGVzYyB7XHJcbiAgICBpbWFnZUZsYWdzOiBudW1iZXI7XHJcbiAgICByZ2JTbGljZUJ5dGVPZmZzZXQ6IG51bWJlcjtcclxuICAgIHJnYlNsaWNlQnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgYWxwaGFTbGljZUJ5dGVPZmZzZXQ6IG51bWJlcjtcclxuICAgIGFscGhhU2xpY2VCeXRlTGVuZ3RoOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJS1RYMl9TdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YSB7XHJcbiAgICBlbmRwb2ludENvdW50PzogbnVtYmVyO1xyXG4gICAgc2VsZWN0b3JDb3VudD86IG51bWJlcjtcclxuICAgIGVuZHBvaW50c0J5dGVMZW5ndGg/OiBudW1iZXI7XHJcbiAgICBzZWxlY3RvcnNCeXRlTGVuZ3RoPzogbnVtYmVyO1xyXG4gICAgdGFibGVzQnl0ZUxlbmd0aD86IG51bWJlcjtcclxuICAgIGV4dGVuZGVkQnl0ZUxlbmd0aD86IG51bWJlcjtcclxuICAgIGltYWdlRGVzY3M/OiBBcnJheTxJS1RYMl9JbWFnZURlc2M+O1xyXG4gICAgZW5kcG9pbnRzRGF0YT86IFVpbnQ4QXJyYXk7XHJcbiAgICBzZWxlY3RvcnNEYXRhPzogVWludDhBcnJheTtcclxuICAgIHRhYmxlc0RhdGE/OiBVaW50OEFycmF5O1xyXG4gICAgZXh0ZW5kZWREYXRhPzogVWludDhBcnJheTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEtUWDJGaWxlUmVhZGVyIHtcclxuICAgIHByaXZhdGUgX2RhdGE6IFVpbnQ4QXJyYXk7XHJcbiAgICBwcml2YXRlIF9oZWFkZXI6IElLVFgyX0hlYWRlcjtcclxuICAgIHByaXZhdGUgX2xldmVsczogQXJyYXk8SUtUWDJfTGV2ZWw+O1xyXG4gICAgcHJpdmF0ZSBfZGZkQmxvY2s6IElLVFgyX0RGRDtcclxuICAgIHByaXZhdGUgX3N1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhOiBJS1RYMl9TdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIHRoZSBmaWxlIGNhbid0IGJlIHBhcnNlZFxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YTogVWludDhBcnJheSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBVaW50OEFycmF5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhlYWRlcigpOiBJS1RYMl9IZWFkZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBsZXZlbHMoKTogQXJyYXk8SUtUWDJfTGV2ZWw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGV2ZWxzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGZkQmxvY2soKTogSUtUWDJfREZEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGZkQmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YSgpOiBJS1RYMl9TdXBlcmNvbXByZXNzaW9uR2xvYmFsRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1cGVyY29tcHJlc3Npb25HbG9iYWxEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiBLVFgyRmlsZVJlYWRlci5Jc1ZhbGlkKHRoaXMuX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZSgpIHtcclxuICAgICAgICBsZXQgb2Zmc2V0SW5GaWxlID0gMTI7IC8vIHNraXAgdGhlIGhlYWRlclxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGhlYWRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IGhkclJlYWRlciA9IG5ldyBEYXRhUmVhZGVyKHRoaXMuX2RhdGEsIG9mZnNldEluRmlsZSwgMTcgKiA0KTtcclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gKHRoaXMuX2hlYWRlciA9IHtcclxuICAgICAgICAgICAgdmtGb3JtYXQ6IGhkclJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIHR5cGVTaXplOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBwaXhlbFdpZHRoOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBwaXhlbEhlaWdodDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgcGl4ZWxEZXB0aDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgbGF5ZXJDb3VudDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgZmFjZUNvdW50OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBsZXZlbENvdW50OiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICBzdXBlcmNvbXByZXNzaW9uU2NoZW1lOiBoZHJSZWFkZXIucmVhZFVpbnQzMigpLFxyXG5cclxuICAgICAgICAgICAgZGZkQnl0ZU9mZnNldDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgZGZkQnl0ZUxlbmd0aDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAga3ZkQnl0ZU9mZnNldDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAga3ZkQnl0ZUxlbmd0aDogaGRyUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgc2dkQnl0ZU9mZnNldDogaGRyUmVhZGVyLnJlYWRVaW50NjQoKSxcclxuICAgICAgICAgICAgc2dkQnl0ZUxlbmd0aDogaGRyUmVhZGVyLnJlYWRVaW50NjQoKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWRlci5waXhlbERlcHRoID4gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBLVFgyIGZpbGUgLSBPbmx5IDJEIHRleHR1cmVzIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhlYWRlci5sYXllckNvdW50ID4gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBLVFgyIGZpbGUgLSBBcnJheSB0ZXh0dXJlcyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLmZhY2VDb3VudCA+IDEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gcGFyc2UgS1RYMiBmaWxlIC0gQ3ViZSB0ZXh0dXJlcyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZmZzZXRJbkZpbGUgKz0gaGRyUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgbGV2ZWxzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGV0IGxldmVsQ291bnQgPSBNYXRoLm1heCgxLCBoZWFkZXIubGV2ZWxDb3VudCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxldmVsUmVhZGVyID0gbmV3IERhdGFSZWFkZXIodGhpcy5fZGF0YSwgb2Zmc2V0SW5GaWxlLCBsZXZlbENvdW50ICogMyAqICgyICogNCkpO1xyXG5cclxuICAgICAgICBjb25zdCBsZXZlbHM6IEFycmF5PElLVFgyX0xldmVsPiA9ICh0aGlzLl9sZXZlbHMgPSBbXSk7XHJcblxyXG4gICAgICAgIHdoaWxlIChsZXZlbENvdW50LS0pIHtcclxuICAgICAgICAgICAgbGV2ZWxzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldDogbGV2ZWxSZWFkZXIucmVhZFVpbnQ2NCgpLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogbGV2ZWxSZWFkZXIucmVhZFVpbnQ2NCgpLFxyXG4gICAgICAgICAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbGV2ZWxSZWFkZXIucmVhZFVpbnQ2NCgpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZnNldEluRmlsZSArPSBsZXZlbFJlYWRlci5ieXRlT2Zmc2V0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGRhdGEgZm9ybWF0IGRlc2NyaXB0b3IgKERGRCkgYmxvY2tzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgZGZkUmVhZGVyID0gbmV3IERhdGFSZWFkZXIodGhpcy5fZGF0YSwgaGVhZGVyLmRmZEJ5dGVPZmZzZXQsIGhlYWRlci5kZmRCeXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGZkQmxvY2sgPSAodGhpcy5fZGZkQmxvY2sgPSB7XHJcbiAgICAgICAgICAgIHZlbmRvcklkOiBkZmRSZWFkZXIuc2tpcEJ5dGVzKDQgLyogc2tpcCB0b3RhbFNpemUgKi8pLnJlYWRVaW50MTYoKSxcclxuICAgICAgICAgICAgZGVzY3JpcHRvclR5cGU6IGRmZFJlYWRlci5yZWFkVWludDE2KCksXHJcbiAgICAgICAgICAgIHZlcnNpb25OdW1iZXI6IGRmZFJlYWRlci5yZWFkVWludDE2KCksXHJcbiAgICAgICAgICAgIGRlc2NyaXB0b3JCbG9ja1NpemU6IGRmZFJlYWRlci5yZWFkVWludDE2KCksXHJcbiAgICAgICAgICAgIGNvbG9yTW9kZWw6IGRmZFJlYWRlci5yZWFkVWludDgoKSxcclxuICAgICAgICAgICAgY29sb3JQcmltYXJpZXM6IGRmZFJlYWRlci5yZWFkVWludDgoKSxcclxuICAgICAgICAgICAgdHJhbnNmZXJGdW5jdGlvbjogZGZkUmVhZGVyLnJlYWRVaW50OCgpLFxyXG4gICAgICAgICAgICBmbGFnczogZGZkUmVhZGVyLnJlYWRVaW50OCgpLFxyXG4gICAgICAgICAgICB0ZXhlbEJsb2NrRGltZW5zaW9uOiB7XHJcbiAgICAgICAgICAgICAgICB4OiBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgKyAxLFxyXG4gICAgICAgICAgICAgICAgeTogZGZkUmVhZGVyLnJlYWRVaW50OCgpICsgMSxcclxuICAgICAgICAgICAgICAgIHo6IGRmZFJlYWRlci5yZWFkVWludDgoKSArIDEsXHJcbiAgICAgICAgICAgICAgICB3OiBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgKyAxLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBieXRlc1BsYW5lOiBbXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTAgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTEgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTIgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTMgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTQgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTUgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTYgKi8sXHJcbiAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogYnl0ZXNQbGFuZTcgKi8sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG51bVNhbXBsZXM6IDAsXHJcbiAgICAgICAgICAgIHNhbXBsZXM6IG5ldyBBcnJheTxJS1RYMl9TYW1wbGU+KCksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRmZEJsb2NrLm51bVNhbXBsZXMgPSAoZGZkQmxvY2suZGVzY3JpcHRvckJsb2NrU2l6ZSAtIDI0KSAvIDE2O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmZEJsb2NrLm51bVNhbXBsZXM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGUgPSB7XHJcbiAgICAgICAgICAgICAgICBiaXRPZmZzZXQ6IGRmZFJlYWRlci5yZWFkVWludDE2KCksXHJcbiAgICAgICAgICAgICAgICBiaXRMZW5ndGg6IGRmZFJlYWRlci5yZWFkVWludDgoKSArIDEsXHJcbiAgICAgICAgICAgICAgICBjaGFubmVsVHlwZTogZGZkUmVhZGVyLnJlYWRVaW50OCgpLFxyXG4gICAgICAgICAgICAgICAgY2hhbm5lbEZsYWdzOiAwLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlUG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogc2FtcGxlUG9zaXRpb24wICovLFxyXG4gICAgICAgICAgICAgICAgICAgIGRmZFJlYWRlci5yZWFkVWludDgoKSAvKiBzYW1wbGVQb3NpdGlvbjEgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgZGZkUmVhZGVyLnJlYWRVaW50OCgpIC8qIHNhbXBsZVBvc2l0aW9uMiAqLyxcclxuICAgICAgICAgICAgICAgICAgICBkZmRSZWFkZXIucmVhZFVpbnQ4KCkgLyogc2FtcGxlUG9zaXRpb24zICovLFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHNhbXBsZUxvd2VyOiBkZmRSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlVXBwZXI6IGRmZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzYW1wbGUuY2hhbm5lbEZsYWdzID0gKHNhbXBsZS5jaGFubmVsVHlwZSAmIDB4ZjApID4+IDQ7XHJcbiAgICAgICAgICAgIHNhbXBsZS5jaGFubmVsVHlwZSA9IHNhbXBsZS5jaGFubmVsVHlwZSAmIDB4MGY7XHJcblxyXG4gICAgICAgICAgICBkZmRCbG9jay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgU3VwZXJjb21wcmVzc2lvbiBHbG9iYWwgRGF0YSAoc2dkKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0IHNnZDogSUtUWDJfU3VwZXJjb21wcmVzc2lvbkdsb2JhbERhdGEgPSAodGhpcy5fc3VwZXJjb21wcmVzc2lvbkdsb2JhbERhdGEgPSB7fSk7XHJcblxyXG4gICAgICAgIGlmIChoZWFkZXIuc2dkQnl0ZUxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgc2dkUmVhZGVyID0gbmV3IERhdGFSZWFkZXIodGhpcy5fZGF0YSwgaGVhZGVyLnNnZEJ5dGVPZmZzZXQsIGhlYWRlci5zZ2RCeXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIHNnZC5lbmRwb2ludENvdW50ID0gc2dkUmVhZGVyLnJlYWRVaW50MTYoKTtcclxuICAgICAgICAgICAgc2dkLnNlbGVjdG9yQ291bnQgPSBzZ2RSZWFkZXIucmVhZFVpbnQxNigpO1xyXG4gICAgICAgICAgICBzZ2QuZW5kcG9pbnRzQnl0ZUxlbmd0aCA9IHNnZFJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgIHNnZC5zZWxlY3RvcnNCeXRlTGVuZ3RoID0gc2dkUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICAgICAgc2dkLnRhYmxlc0J5dGVMZW5ndGggPSBzZ2RSZWFkZXIucmVhZFVpbnQzMigpO1xyXG4gICAgICAgICAgICBzZ2QuZXh0ZW5kZWRCeXRlTGVuZ3RoID0gc2dkUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICAgICAgc2dkLmltYWdlRGVzY3MgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlQ291bnQgPSB0aGlzLl9nZXRJbWFnZUNvdW50KCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2dkLmltYWdlRGVzY3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VGbGFnczogc2dkUmVhZGVyLnJlYWRVaW50MzIoKSxcclxuICAgICAgICAgICAgICAgICAgICByZ2JTbGljZUJ5dGVPZmZzZXQ6IHNnZFJlYWRlci5yZWFkVWludDMyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcmdiU2xpY2VCeXRlTGVuZ3RoOiBzZ2RSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFscGhhU2xpY2VCeXRlT2Zmc2V0OiBzZ2RSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFscGhhU2xpY2VCeXRlTGVuZ3RoOiBzZ2RSZWFkZXIucmVhZFVpbnQzMigpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVuZHBvaW50c0J5dGVPZmZzZXQgPSBoZWFkZXIuc2dkQnl0ZU9mZnNldCArIHNnZFJlYWRlci5ieXRlT2Zmc2V0O1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvcnNCeXRlT2Zmc2V0ID0gZW5kcG9pbnRzQnl0ZU9mZnNldCArIHNnZC5lbmRwb2ludHNCeXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCB0YWJsZXNCeXRlT2Zmc2V0ID0gc2VsZWN0b3JzQnl0ZU9mZnNldCArIHNnZC5zZWxlY3RvcnNCeXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbmRlZEJ5dGVPZmZzZXQgPSB0YWJsZXNCeXRlT2Zmc2V0ICsgc2dkLnRhYmxlc0J5dGVMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBzZ2QuZW5kcG9pbnRzRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX2RhdGEuYnVmZmVyLCB0aGlzLl9kYXRhLmJ5dGVPZmZzZXQgKyBlbmRwb2ludHNCeXRlT2Zmc2V0LCBzZ2QuZW5kcG9pbnRzQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHNnZC5zZWxlY3RvcnNEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZGF0YS5idWZmZXIsIHRoaXMuX2RhdGEuYnl0ZU9mZnNldCArIHNlbGVjdG9yc0J5dGVPZmZzZXQsIHNnZC5zZWxlY3RvcnNCeXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgc2dkLnRhYmxlc0RhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLl9kYXRhLmJ1ZmZlciwgdGhpcy5fZGF0YS5ieXRlT2Zmc2V0ICsgdGFibGVzQnl0ZU9mZnNldCwgc2dkLnRhYmxlc0J5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICBzZ2QuZXh0ZW5kZWREYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fZGF0YS5idWZmZXIsIHRoaXMuX2RhdGEuYnl0ZU9mZnNldCArIGV4dGVuZGVkQnl0ZU9mZnNldCwgc2dkLmV4dGVuZGVkQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEltYWdlQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGF5ZXJQaXhlbERlcHRoID0gTWF0aC5tYXgodGhpcy5faGVhZGVyLnBpeGVsRGVwdGgsIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5faGVhZGVyLmxldmVsQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsYXllclBpeGVsRGVwdGggKz0gTWF0aC5tYXgodGhpcy5faGVhZGVyLnBpeGVsRGVwdGggPj4gaSwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5faGVhZGVyLmxheWVyQ291bnQsIDEpICogdGhpcy5faGVhZGVyLmZhY2VDb3VudCAqIGxheWVyUGl4ZWxEZXB0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRleHR1cmVGb3JtYXQoKTogS1RYMi5Tb3VyY2VUZXh0dXJlRm9ybWF0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGZkQmxvY2suY29sb3JNb2RlbCA9PT0gREZETW9kZWwuVUFTVEMgPyBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQgOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuRVRDMVM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoYXNBbHBoYSgpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0Zm9ybWF0ID0gdGhpcy50ZXh0dXJlRm9ybWF0O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRmb3JtYXQpIHtcclxuICAgICAgICAgICAgY2FzZSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuRVRDMVM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RmZEJsb2NrLm51bVNhbXBsZXMgPT09IDIgJiZcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5fZGZkQmxvY2suc2FtcGxlc1swXS5jaGFubmVsVHlwZSA9PT0gREZEQ2hhbm5lbF9FVEMxUy5BQUEgfHwgdGhpcy5fZGZkQmxvY2suc2FtcGxlc1sxXS5jaGFubmVsVHlwZSA9PT0gREZEQ2hhbm5lbF9FVEMxUy5BQUEpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQuVUFTVEM0eDQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGZkQmxvY2suc2FtcGxlc1swXS5jaGFubmVsVHlwZSA9PT0gREZEQ2hhbm5lbF9VQVNUQy5SR0JBO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbmVlZFpTVEREZWNvZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXIuc3VwZXJjb21wcmVzc2lvblNjaGVtZSA9PT0gU3VwZXJjb21wcmVzc2lvblNjaGVtZS5aU3RhbmRhcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0luR2FtbWFTcGFjZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGZkQmxvY2sudHJhbnNmZXJGdW5jdGlvbiA9PT0gREZEVHJhbnNmZXJGdW5jdGlvbi5zUkdCO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSXNWYWxpZChkYXRhOiBBcnJheUJ1ZmZlclZpZXcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoID49IDEyKSB7XHJcbiAgICAgICAgICAgIC8vICfCqycsICdLJywgJ1QnLCAnWCcsICcgJywgJzInLCAnMCcsICfCuycsICdcXHInLCAnXFxuJywgJ1xceDFBJywgJ1xcbidcclxuICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIDEyKTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclswXSA9PT0gMHhhYiAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclsxXSA9PT0gMHg0YiAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclsyXSA9PT0gMHg1NCAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclszXSA9PT0gMHg1OCAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls0XSA9PT0gMHgyMCAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls1XSA9PT0gMHgzMiAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls2XSA9PT0gMHgzMCAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls3XSA9PT0gMHhiYiAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls4XSA9PT0gMHgwZCAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcls5XSA9PT0gMHgwYSAmJlxyXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclsxMF0gPT09IDB4MWEgJiZcclxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJbMTFdID09PSAweDBhXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgeyBLVFgyRGVjb2RlciB9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAoPGFueT5nbG9iYWxPYmplY3QpLktUWDJERUNPREVSID0gS1RYMkRlY29kZXI7XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuLi9pbmRleFwiO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuY29uc3QgRGVjaXNpb25UcmVlOiBLVFgyLklEZWNpc2lvblRyZWUgPSB7XHJcbiAgICBFVEMxUzoge1xyXG4gICAgICAgIG9wdGlvbjogXCJmb3JjZVJHQkFcIixcclxuICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5SR0JBMzIsXHJcbiAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUkdCQThGb3JtYXQsXHJcbiAgICAgICAgICAgIHJvdW5kVG9NdWx0aXBsZTQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgY2FwOiBcImV0YzJcIixcclxuICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuRVRDMl9SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuRVRDMV9SR0IsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQjhfRVRDMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICBjYXA6IFwiZXRjMVwiLFxyXG4gICAgICAgICAgICAgICAgYWxwaGE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5FVEMxX1JHQixcclxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCX0VUQzFfV0VCR0wsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXA6IFwiYnB0Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkJDN19SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQV9CUFRDX1VOT1JNX0VYVCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJzM3RjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkJDM19SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkJDMV9SR0IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJwdnJ0Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVlZHNQb3dlck9mVHdvOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUFZSVEMxXzRfUkdCQSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQkFfUFZSVENfNEJQUFYxX0lNRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUFZSVEMxXzRfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkdCQTMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUkdCQThGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIFVBU1RDOiB7XHJcbiAgICAgICAgb3B0aW9uOiBcImZvcmNlUkdCQVwiLFxyXG4gICAgICAgIHllczoge1xyXG4gICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlJHQkEzMixcclxuICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5SR0JBOEZvcm1hdCxcclxuICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBubzoge1xyXG4gICAgICAgICAgICBvcHRpb246IFwiZm9yY2VSOFwiLFxyXG4gICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUjgsXHJcbiAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LlI4Rm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcm91bmRUb011bHRpcGxlNDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb246IFwiZm9yY2VSRzhcIixcclxuICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkc4LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuUkc4Rm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdW5kVG9NdWx0aXBsZTQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwOiBcImFzdGNcIixcclxuICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5BU1RDXzRYNF9SR0JBLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXA6IFwiYnB0Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkM3X1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQV9CUFRDX1VOT1JNX0VYVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbjogXCJ1c2VSR0JBSWZBU1RDQkM3Tm90QXZhaWxhYmxlV2hlblVBU1RDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlJHQkEzMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LlJHQkE4Rm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kVG9NdWx0aXBsZTQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwOiBcImV0YzJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5FVEMyX1JHQkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LkNPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LkVUQzFfUkdCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQjhfRVRDMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJldGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5FVEMxX1JHQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcDogXCJzM3RjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlRm9ybWF0OiBLVFgyLlRyYW5zY29kZVRhcmdldC5CQzNfUkdCQSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQ1X0VYVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuQkMxX1JHQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5naW5lRm9ybWF0OiBLVFgyLkVuZ2luZUZvcm1hdC5DT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXA6IFwicHZydGNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWVkc1Bvd2VyT2ZUd286IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUFZSVEMxXzRfUkdCQSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2NvZGVGb3JtYXQ6IEtUWDIuVHJhbnNjb2RlVGFyZ2V0LlBWUlRDMV80X1JHQixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZ2luZUZvcm1hdDogS1RYMi5FbmdpbmVGb3JtYXQuQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNRyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZUZvcm1hdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQuUkdCQTMyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmdpbmVGb3JtYXQ6IEtUWDIuRW5naW5lRm9ybWF0LlJHQkE4Rm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZFRvTXVsdGlwbGU0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2NvZGVEZWNpc2lvblRyZWUge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0lzTGVhZk5vZGUobm9kZTogS1RYMi5JTm9kZSB8IEtUWDIuSUxlYWYpOiBub2RlIGlzIEtUWDIuSUxlYWYge1xyXG4gICAgICAgIHJldHVybiAobm9kZSBhcyBLVFgyLklMZWFmKS5lbmdpbmVGb3JtYXQgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90ZXh0dXJlRm9ybWF0OiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQ7XHJcbiAgICBwcml2YXRlIF9oYXNBbHBoYTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2lzUG93ZXJPZlR3bzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2NhcHM6IEtUWDIuSUNvbXByZXNzZWRGb3JtYXRDYXBhYmlsaXRpZXM7XHJcbiAgICBwcml2YXRlIF9vcHRpb25zOiBLVFgyLklLVFgyRGVjb2Rlck9wdGlvbnM7XHJcbiAgICBwcml2YXRlIF90cmFuc2NvZGVGb3JtYXQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2VuZ2luZUZvcm1hdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcm91bmRUb011bHRpcGxlNDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHRyYW5zY29kZUZvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNjb2RlRm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5naW5lRm9ybWF0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmdpbmVGb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByb3VuZFRvTXVsdGlwbGU0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb3VuZFRvTXVsdGlwbGU0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRleHR1cmVGb3JtYXQ6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgaGFzQWxwaGE6IGJvb2xlYW4sIGlzUG93ZXJPZlR3bzogYm9vbGVhbiwgY2FwczogS1RYMi5JQ29tcHJlc3NlZEZvcm1hdENhcGFiaWxpdGllcywgb3B0aW9ucz86IEtUWDIuSUtUWDJEZWNvZGVyT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmVGb3JtYXQgPSB0ZXh0dXJlRm9ybWF0O1xyXG4gICAgICAgIHRoaXMuX2hhc0FscGhhID0gaGFzQWxwaGE7XHJcbiAgICAgICAgdGhpcy5faXNQb3dlck9mVHdvID0gaXNQb3dlck9mVHdvO1xyXG4gICAgICAgIHRoaXMuX2NhcHMgPSBjYXBzO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zID8/IHt9O1xyXG5cclxuICAgICAgICB0aGlzLnBhcnNlVHJlZShEZWNpc2lvblRyZWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJzZVRyZWUodHJlZTogS1RYMi5JRGVjaXNpb25UcmVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX3RleHR1cmVGb3JtYXQgPT09IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdC5VQVNUQzR4NCA/IHRyZWUuVUFTVEMgOiB0cmVlLkVUQzFTO1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnNlTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJzZU5vZGUobm9kZTogS1RYMi5JTm9kZSB8IEtUWDIuSUxlYWYgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFRyYW5zY29kZURlY2lzaW9uVHJlZS5fSXNMZWFmTm9kZShub2RlKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2NvZGVGb3JtYXQgPSBub2RlLnRyYW5zY29kZUZvcm1hdDtcclxuICAgICAgICAgICAgdGhpcy5fZW5naW5lRm9ybWF0ID0gbm9kZS5lbmdpbmVGb3JtYXQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvdW5kVG9NdWx0aXBsZTQgPSBub2RlLnJvdW5kVG9NdWx0aXBsZTQgPz8gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlLmNhcCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gJiYgISF0aGlzLl9jYXBzW25vZGUuY2FwIGFzIGtleW9mIHR5cGVvZiB0aGlzLl9jYXBzXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5vcHRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uICYmICEhdGhpcy5fb3B0aW9uc1tub2RlLm9wdGlvbiBhcyBrZXlvZiB0eXBlb2YgdGhpcy5fb3B0aW9uc107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUuYWxwaGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uICYmIHRoaXMuX2hhc0FscGhhID09PSBub2RlLmFscGhhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLm5lZWRzUG93ZXJPZlR3byAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25kaXRpb24gPSBjb25kaXRpb24gJiYgdGhpcy5faXNQb3dlck9mVHdvID09PSBub2RlLm5lZWRzUG93ZXJPZlR3bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS50cmFuc2NvZGVGb3JtYXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZS50cmFuc2NvZGVGb3JtYXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uID0gY29uZGl0aW9uICYmIG5vZGUudHJhbnNjb2RlRm9ybWF0LmluZGV4T2YodGhpcy5fdHJhbnNjb2RlRm9ybWF0KSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbiA9IGNvbmRpdGlvbiAmJiBub2RlLnRyYW5zY29kZUZvcm1hdCA9PT0gdGhpcy5fdHJhbnNjb2RlRm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wYXJzZU5vZGUoY29uZGl0aW9uID8gbm9kZS55ZXMhIDogbm9kZS5ubyEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbmltcG9ydCB0eXBlICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBXQVNNTWVtb3J5TWFuYWdlciB9IGZyb20gXCIuL3dhc21NZW1vcnlNYW5hZ2VyXCI7XHJcbmltcG9ydCB0eXBlIHsgS1RYMkZpbGVSZWFkZXIsIElLVFgyX0ltYWdlRGVzYyB9IGZyb20gXCIuL2t0eDJGaWxlUmVhZGVyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNjb2RlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIENhblRyYW5zY29kZShzcmM6IEtUWDIuU291cmNlVGV4dHVyZUZvcm1hdCwgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCwgaXNJbkdhbW1hU3BhY2U6IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lID0gXCJUcmFuc2NvZGVyXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBXYXNtQmFzZVVybCA9IFwiaHR0cHM6Ly9wcmV2aWV3LmJhYnlsb25qcy5jb20vXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRXYXNtVXJsKHdhc21Vcmw6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBgJHtUcmFuc2NvZGVyLldhc21CYXNlVXJsfSR7d2FzbVVybH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFRyYW5zY29kZXIuTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIG5lZWRNZW1vcnlNYW5hZ2VyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVtb3J5TWFuYWdlcihtZW1vcnlNZ3I6IFdBU01NZW1vcnlNYW5hZ2VyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyB0cmFuc2NvZGUoXHJcbiAgICAgICAgc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsXHJcbiAgICAgICAgZHN0OiBLVFgyLlRyYW5zY29kZVRhcmdldCxcclxuICAgICAgICBsZXZlbDogbnVtYmVyLFxyXG4gICAgICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgaGVpZ2h0OiBudW1iZXIsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkQnl0ZUxlbmd0aDogbnVtYmVyLFxyXG4gICAgICAgIGt0eDJSZWFkZXI6IEtUWDJGaWxlUmVhZGVyLFxyXG4gICAgICAgIGltYWdlRGVzYzogSUtUWDJfSW1hZ2VEZXNjIHwgbnVsbCxcclxuICAgICAgICBlbmNvZGVkRGF0YTogVWludDhBcnJheVxyXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5IHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgS1RYMiBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMva3R4MmRlY29kZXJUeXBlc1wiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBUcmFuc2NvZGVyIH0gZnJvbSBcIi4vdHJhbnNjb2RlclwiO1xyXG5pbXBvcnQgeyBXQVNNTWVtb3J5TWFuYWdlciB9IGZyb20gXCIuL3dhc21NZW1vcnlNYW5hZ2VyXCI7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNjb2Rlck1hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBfVHJhbnNjb2RlcnM6IEFycmF5PHR5cGVvZiBUcmFuc2NvZGVyPiA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUmVnaXN0ZXJUcmFuc2NvZGVyKHRyYW5zY29kZXI6IHR5cGVvZiBUcmFuc2NvZGVyKSB7XHJcbiAgICAgICAgVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJzLnB1c2godHJhbnNjb2Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1RyYW5zY29kZXJJbnN0YW5jZXM6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8VHJhbnNjb2Rlcj4gfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgX3dhc21NZW1vcnlNYW5hZ2VyOiBXQVNNTWVtb3J5TWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgZmluZFRyYW5zY29kZXIoc3JjOiBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXQsIGRzdDogS1RYMi5UcmFuc2NvZGVUYXJnZXQsIGlzSW5HYW1tYVNwYWNlOiBib29sZWFuLCBieXBhc3M/OiBzdHJpbmdbXSk6IFRyYW5zY29kZXIgfCBudWxsIHtcclxuICAgICAgICBsZXQgdHJhbnNjb2RlcjogVHJhbnNjb2RlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBrZXkgPSBLVFgyLlNvdXJjZVRleHR1cmVGb3JtYXRbc3JjXSArIFwiX1wiICsgS1RYMi5UcmFuc2NvZGVUYXJnZXRbZHN0XTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2RlcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKFRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVyc1tpXS5DYW5UcmFuc2NvZGUoc3JjLCBkc3QsIGlzSW5HYW1tYVNwYWNlKSAmJiAoIWJ5cGFzcyB8fCBieXBhc3MuaW5kZXhPZihUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2RlcnNbaV0uTmFtZSkgPCAwKSkge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNjb2RlciA9IHRoaXMuX2dldEV4aXN0aW5nVHJhbnNjb2RlcihrZXksIFRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVyc1tpXS5OYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghdHJhbnNjb2Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZXIgPSBuZXcgVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJzW2ldKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlciEuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2NvZGVyIS5uZWVkTWVtb3J5TWFuYWdlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fd2FzbU1lbW9yeU1hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhc21NZW1vcnlNYW5hZ2VyID0gbmV3IFdBU01NZW1vcnlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlciEuc2V0TWVtb3J5TWFuYWdlcih0aGlzLl93YXNtTWVtb3J5TWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghVHJhbnNjb2Rlck1hbmFnZXIuX1RyYW5zY29kZXJJbnN0YW5jZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2Rlckluc3RhbmNlc1trZXldID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zY29kZXJNYW5hZ2VyLl9UcmFuc2NvZGVySW5zdGFuY2VzW2tleV0ucHVzaCh0cmFuc2NvZGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJhbnNjb2RlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRFeGlzdGluZ1RyYW5zY29kZXIoa2V5OiBzdHJpbmcsIHRyYW5zY29kZXJOYW1lOiBzdHJpbmcpOiBUcmFuc2NvZGVyIHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNjb2RlcnMgPSBUcmFuc2NvZGVyTWFuYWdlci5fVHJhbnNjb2Rlckluc3RhbmNlc1trZXldO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNjb2RlcnMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCB0cmFuc2NvZGVycy5sZW5ndGg7ICsrdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNjb2RlciA9IHRyYW5zY29kZXJzW3RdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zY29kZXJOYW1lID09PSB0cmFuc2NvZGVyLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2NvZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJkZWNsYXJlIGZ1bmN0aW9uIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXI/OiBhbnlbXSk6IHZvaWQ7XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgV0FTTU1lbW9yeU1hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkQmluYXJpZXNGcm9tQ3VycmVudFRocmVhZCA9IHRydWU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEluaXRpYWxNZW1vcnlQYWdlcyA9ICgxICogMTAyNCAqIDEwMjQpID4+IDE2OyAvLyAxIE1ieXRlc1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9SZXF1ZXN0SWQgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZFdBU00ocGF0aDogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xyXG4gICAgICAgIGlmICh0aGlzLkxvYWRCaW5hcmllc0Zyb21DdXJyZW50VGhyZWFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZldGNoIHRoZSB3YXNtIGNvbXBvbmVudCBmcm9tIFwiJHtwYXRofVwiOiAke3Jlc3BvbnNlLnN0YXR1c30gLSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigod2FzbUJpbmFyeSkgPT4gcmVzb2x2ZSh3YXNtQmluYXJ5KSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZCA9IHRoaXMuX1JlcXVlc3RJZCsrO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgd2FzbUxvYWRlZEhhbmRsZXIgPSAobXNnOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtc2cuZGF0YS5hY3Rpb24gPT09IFwid2FzbUxvYWRlZFwiICYmIG1zZy5kYXRhLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgd2FzbUxvYWRlZEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobXNnLmRhdGEud2FzbUJpbmFyeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHdhc21Mb2FkZWRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgYWN0aW9uOiBcImxvYWRXQVNNXCIsIHBhdGg6IHBhdGgsIGlkOiBpZCB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tZW1vcnk6IFdlYkFzc2VtYmx5Lk1lbW9yeTtcclxuICAgIHByaXZhdGUgX251bVBhZ2VzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tZW1vcnlWaWV3OiBVaW50OEFycmF5O1xyXG4gICAgcHJpdmF0ZSBfbWVtb3J5Vmlld0J5dGVMZW5ndGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX21lbW9yeVZpZXdPZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsTWVtb3J5UGFnZXM6IG51bWJlciA9IFdBU01NZW1vcnlNYW5hZ2VyLkluaXRpYWxNZW1vcnlQYWdlcykge1xyXG4gICAgICAgIHRoaXMuX251bVBhZ2VzID0gaW5pdGlhbE1lbW9yeVBhZ2VzO1xyXG5cclxuICAgICAgICB0aGlzLl9tZW1vcnkgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHsgaW5pdGlhbDogdGhpcy5fbnVtUGFnZXMgfSk7XHJcbiAgICAgICAgdGhpcy5fbWVtb3J5Vmlld0J5dGVMZW5ndGggPSB0aGlzLl9udW1QYWdlcyA8PCAxNjtcclxuICAgICAgICB0aGlzLl9tZW1vcnlWaWV3T2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLl9tZW1vcnlWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgdGhpcy5fbWVtb3J5Vmlld09mZnNldCwgdGhpcy5fbWVtb3J5Vmlld0J5dGVMZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgd2FzbU1lbW9yeSgpOiBXZWJBc3NlbWJseS5NZW1vcnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZW1vcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1lbW9yeVZpZXcobnVtUGFnZXM6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIgPSAwLCBieXRlTGVuZ3RoPzogbnVtYmVyKTogVWludDhBcnJheSB7XHJcbiAgICAgICAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPz8gbnVtUGFnZXMgPDwgMTY7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9udW1QYWdlcyA8IG51bVBhZ2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeS5ncm93KG51bVBhZ2VzIC0gdGhpcy5fbnVtUGFnZXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9udW1QYWdlcyA9IG51bVBhZ2VzO1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnlWaWV3ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fbWVtb3J5LmJ1ZmZlciwgb2Zmc2V0LCBieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5fbWVtb3J5Vmlld0J5dGVMZW5ndGggPSBieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnlWaWV3T2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeVZpZXcgPSBuZXcgVWludDhBcnJheSh0aGlzLl9tZW1vcnkuYnVmZmVyLCBvZmZzZXQsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLl9tZW1vcnlWaWV3Qnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuX21lbW9yeVZpZXdPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWVtb3J5VmlldztcclxuICAgIH1cclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuXHJcbmltcG9ydCB7IFRyYW5zY29kZXIgfSBmcm9tIFwiLi90cmFuc2NvZGVyXCI7XHJcblxyXG4vKipcclxuICogRnJvbSBodHRwczovL2dpdGh1Yi5jb20vZG9ubWNjdXJkeS96c3RkZGVjIGJ5IERvbiBNY0N1cmR5XHJcbiAqL1xyXG5pbnRlcmZhY2UgRGVjb2RlckV4cG9ydHMge1xyXG4gICAgbWVtb3J5OiBVaW50OEFycmF5O1xyXG5cclxuICAgIFpTVERfZmluZERlY29tcHJlc3NlZFNpemU6IChjb21wcmVzc2VkUHRyOiBudW1iZXIsIGNvbXByZXNzZWRTaXplOiBudW1iZXIpID0+IG51bWJlcjtcclxuICAgIFpTVERfZGVjb21wcmVzczogKHVuY29tcHJlc3NlZFB0cjogbnVtYmVyLCB1bmNvbXByZXNzZWRTaXplOiBudW1iZXIsIGNvbXByZXNzZWRQdHI6IG51bWJlciwgY29tcHJlc3NlZFNpemU6IG51bWJlcikgPT4gbnVtYmVyO1xyXG4gICAgbWFsbG9jOiAocHRyOiBudW1iZXIpID0+IG51bWJlcjtcclxuICAgIGZyZWU6IChwdHI6IG51bWJlcikgPT4gdm9pZDtcclxufVxyXG5cclxubGV0IGluaXQ6IFByb21pc2U8dm9pZD47XHJcbmxldCBpbnN0YW5jZTogeyBleHBvcnRzOiBEZWNvZGVyRXhwb3J0cyB9O1xyXG5sZXQgaGVhcDogVWludDhBcnJheTtcclxuXHJcbmNvbnN0IElNUE9SVF9PQkpFQ1QgPSB7XHJcbiAgICBlbnY6IHtcclxuICAgICAgICBlbXNjcmlwdGVuX25vdGlmeV9tZW1vcnlfZ3Jvd3RoOiBmdW5jdGlvbiAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGhlYXAgPSBuZXcgVWludDhBcnJheShpbnN0YW5jZS5leHBvcnRzLm1lbW9yeS5idWZmZXIpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFpTVEQgKFpzdGFuZGFyZCkgZGVjb2Rlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBaU1RERGVjb2RlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdhc21Nb2R1bGVVUkwgPSBcInpzdGRkZWMud2FzbVwiO1xyXG5cclxuICAgIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGluaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluaXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGZldGNoICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8vIFdlYi5cclxuXHJcbiAgICAgICAgICAgIGluaXQgPSBmZXRjaChUcmFuc2NvZGVyLkdldFdhc21VcmwoWlNURERlY29kZXIuV2FzbU1vZHVsZVVSTCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZldGNoIHRoZSB3YXNtIGNvbXBvbmVudCBmb3IgdGhlIFpzdGFuZGFyZCBkZWNvbXByZXNzaW9uIGxpYjogJHtyZXNwb25zZS5zdGF0dXN9IC0gJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChhcnJheUJ1ZmZlcikgPT4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYXJyYXlCdWZmZXIsIElNUE9SVF9PQkpFQ1QpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5faW5pdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm9kZS5qcy5cclxuXHJcbiAgICAgICAgICAgIGluaXQgPSBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhmZXRjaChaU1RERGVjb2Rlci5XYXNtTW9kdWxlVVJMKSwgSU1QT1JUX09CSkVDVCkudGhlbih0aGlzLl9pbml0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbml0O1xyXG4gICAgfVxyXG5cclxuICAgIF9pbml0KHJlc3VsdDogV2ViQXNzZW1ibHkuV2ViQXNzZW1ibHlJbnN0YW50aWF0ZWRTb3VyY2UpOiB2b2lkIHtcclxuICAgICAgICBpbnN0YW5jZSA9IHJlc3VsdC5pbnN0YW5jZSBhcyB1bmtub3duIGFzIHsgZXhwb3J0czogRGVjb2RlckV4cG9ydHMgfTtcclxuXHJcbiAgICAgICAgSU1QT1JUX09CSkVDVC5lbnYuZW1zY3JpcHRlbl9ub3RpZnlfbWVtb3J5X2dyb3d0aCgpOyAvLyBpbml0aWFsaXplIGhlYXAuXHJcbiAgICB9XHJcblxyXG4gICAgZGVjb2RlKGFycmF5OiBVaW50OEFycmF5LCB1bmNvbXByZXNzZWRTaXplID0gMCk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBaU1RERGVjb2RlcjogQXdhaXQgLmluaXQoKSBiZWZvcmUgZGVjb2RpbmcuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXcml0ZSBjb21wcmVzc2VkIGRhdGEgaW50byBXQVNNIG1lbW9yeS5cclxuICAgICAgICBjb25zdCBjb21wcmVzc2VkU2l6ZSA9IGFycmF5LmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgY29uc3QgY29tcHJlc3NlZFB0ciA9IGluc3RhbmNlLmV4cG9ydHMubWFsbG9jKGNvbXByZXNzZWRTaXplKTtcclxuICAgICAgICBoZWFwLnNldChhcnJheSwgY29tcHJlc3NlZFB0cik7XHJcblxyXG4gICAgICAgIC8vIERlY29tcHJlc3MgaW50byBXQVNNIG1lbW9yeS5cclxuICAgICAgICB1bmNvbXByZXNzZWRTaXplID0gdW5jb21wcmVzc2VkU2l6ZSB8fCBOdW1iZXIoaW5zdGFuY2UuZXhwb3J0cy5aU1REX2ZpbmREZWNvbXByZXNzZWRTaXplKGNvbXByZXNzZWRQdHIsIGNvbXByZXNzZWRTaXplKSk7XHJcbiAgICAgICAgY29uc3QgdW5jb21wcmVzc2VkUHRyID0gaW5zdGFuY2UuZXhwb3J0cy5tYWxsb2ModW5jb21wcmVzc2VkU2l6ZSk7XHJcbiAgICAgICAgY29uc3QgYWN0dWFsU2l6ZSA9IGluc3RhbmNlLmV4cG9ydHMuWlNURF9kZWNvbXByZXNzKHVuY29tcHJlc3NlZFB0ciwgdW5jb21wcmVzc2VkU2l6ZSwgY29tcHJlc3NlZFB0ciwgY29tcHJlc3NlZFNpemUpO1xyXG5cclxuICAgICAgICAvLyBSZWFkIGRlY29tcHJlc3NlZCBkYXRhIGFuZCBmcmVlIFdBU00gbWVtb3J5LlxyXG4gICAgICAgIGNvbnN0IGRlYyA9IGhlYXAuc2xpY2UodW5jb21wcmVzc2VkUHRyLCB1bmNvbXByZXNzZWRQdHIgKyBhY3R1YWxTaXplKTtcclxuICAgICAgICBpbnN0YW5jZS5leHBvcnRzLmZyZWUoY29tcHJlc3NlZFB0cik7XHJcbiAgICAgICAgaW5zdGFuY2UuZXhwb3J0cy5mcmVlKHVuY29tcHJlc3NlZFB0cik7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCU0QgTGljZW5zZVxyXG4gKlxyXG4gKiBGb3IgWnN0YW5kYXJkIHNvZnR3YXJlXHJcbiAqXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50LCBZYW5uIENvbGxldCwgRmFjZWJvb2ssIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbixcclxuICogYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxyXG4gKlxyXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcclxuICogICAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXHJcbiAqXHJcbiAqICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcclxuICogICAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxyXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cclxuICpcclxuICogICogTmVpdGhlciB0aGUgbmFtZSBGYWNlYm9vayBub3IgdGhlIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG9cclxuICogICAgZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWNcclxuICogICAgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG4gKlxyXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcclxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcclxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxyXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxyXG4gKiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcclxuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xyXG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cclxuICogQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcclxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcclxuICogU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXHJcbiAqL1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMga3R4MmRlY29kZXIgZnJvbSBcImt0eDJkZWNvZGVyL2xlZ2FjeS9sZWdhY3lcIjtcclxuXHJcbmV4cG9ydCB7IGt0eDJkZWNvZGVyIH07XHJcbmV4cG9ydCBkZWZhdWx0IGt0eDJkZWNvZGVyO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=