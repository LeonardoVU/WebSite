(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_lights_image_based.ts":
/*!******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/EXT_lights_image_based.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_lights_image_based: () => (/* binding */ EXT_lights_image_based)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/Textures/rawCubeTexture */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");





var NAME = "EXT_lights_image_based";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_lights_image_based = /** @class */ (function () {
    /**
     * @internal
     */
    function EXT_lights_image_based(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    EXT_lights_image_based.prototype.dispose = function () {
        this._loader = null;
        delete this._lights;
    };
    /** @internal */
    EXT_lights_image_based.prototype.onLoading = function () {
        var extensions = this._loader.gltf.extensions;
        if (extensions && extensions[this.name]) {
            var extension = extensions[this.name];
            this._lights = extension.lights;
        }
    };
    /**
     * @internal
     */
    EXT_lights_image_based.prototype.loadSceneAsync = function (context, scene) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, scene, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadSceneAsync(context, scene));
            _this._loader.logOpen("".concat(extensionContext));
            var light = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(extensionContext, "/light"), _this._lights, extension.light);
            promises.push(_this._loadLightAsync("/extensions/".concat(_this.name, "/lights/").concat(extension.light), light).then(function (texture) {
                _this._loader.babylonScene.environmentTexture = texture;
            }));
            _this._loader.logClose();
            return Promise.all(promises).then(function () { });
        });
    };
    EXT_lights_image_based.prototype._loadLightAsync = function (context, light) {
        var _this = this;
        if (!light._loaded) {
            var promises = new Array();
            this._loader.logOpen("".concat(context));
            var imageData_1 = new Array(light.specularImages.length);
            var _loop_1 = function (mipmap) {
                var faces = light.specularImages[mipmap];
                imageData_1[mipmap] = new Array(faces.length);
                var _loop_2 = function (face) {
                    var specularImageContext = "".concat(context, "/specularImages/").concat(mipmap, "/").concat(face);
                    this_1._loader.logOpen("".concat(specularImageContext));
                    var index = faces[face];
                    var image = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(specularImageContext, this_1._loader.gltf.images, index);
                    promises.push(this_1._loader.loadImageAsync("/images/".concat(index), image).then(function (data) {
                        imageData_1[mipmap][face] = data;
                    }));
                    this_1._loader.logClose();
                };
                for (var face = 0; face < faces.length; face++) {
                    _loop_2(face);
                }
            };
            var this_1 = this;
            for (var mipmap = 0; mipmap < light.specularImages.length; mipmap++) {
                _loop_1(mipmap);
            }
            this._loader.logClose();
            light._loaded = Promise.all(promises).then(function () {
                var babylonTexture = new babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.RawCubeTexture(_this._loader.babylonScene, null, light.specularImageSize);
                babylonTexture.name = light.name || "environment";
                light._babylonTexture = babylonTexture;
                if (light.intensity != undefined) {
                    babylonTexture.level = light.intensity;
                }
                if (light.rotation) {
                    var rotation = babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(light.rotation);
                    // Invert the rotation so that positive rotation is counter-clockwise.
                    if (!_this._loader.babylonScene.useRightHandedSystem) {
                        rotation = babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Inverse(rotation);
                    }
                    babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromQuaternionToRef(rotation, babylonTexture.getReflectionTextureMatrix());
                }
                if (!light.irradianceCoefficients) {
                    throw new Error("".concat(context, ": Irradiance coefficients are missing"));
                }
                var sphericalHarmonics = babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.SphericalHarmonics.FromArray(light.irradianceCoefficients);
                sphericalHarmonics.scaleInPlace(light.intensity);
                sphericalHarmonics.convertIrradianceToLambertianRadiance();
                var sphericalPolynomial = babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.SphericalPolynomial.FromHarmonics(sphericalHarmonics);
                // Compute the lod generation scale to fit exactly to the number of levels available.
                var lodGenerationScale = (imageData_1.length - 1) / babylonjs_Maths_math_scalar__WEBPACK_IMPORTED_MODULE_0__.Scalar.Log2(light.specularImageSize);
                return babylonTexture.updateRGBDAsync(imageData_1, sphericalPolynomial, lodGenerationScale);
            });
        }
        return light._loaded.then(function () {
            return light._babylonTexture;
        });
    };
    return EXT_lights_image_based;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new EXT_lights_image_based(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* binding */ EXT_mesh_gpu_instancing)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Meshes/thinInstanceMesh */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "EXT_mesh_gpu_instancing";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 * [Playground Sample](https://playground.babylonjs.com/#QFIGLW#9)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_mesh_gpu_instancing = /** @class */ (function () {
    /**
     * @internal
     */
    function EXT_mesh_gpu_instancing(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    EXT_mesh_gpu_instancing.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    EXT_mesh_gpu_instancing.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
            _this._loader._disableInstancedMesh++;
            var promise = _this._loader.loadNodeAsync("/nodes/".concat(node.index), node, assign);
            _this._loader._disableInstancedMesh--;
            if (!node._primitiveBabylonMeshes) {
                return promise;
            }
            var promises = new Array();
            var instanceCount = 0;
            var loadAttribute = function (attribute) {
                if (extension.attributes[attribute] == undefined) {
                    promises.push(Promise.resolve(null));
                    return;
                }
                var accessor = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(extensionContext, "/attributes/").concat(attribute), _this._loader.gltf.accessors, extension.attributes[attribute]);
                promises.push(_this._loader._loadFloatAccessorAsync("/accessors/".concat(accessor.bufferView), accessor));
                if (instanceCount === 0) {
                    instanceCount = accessor.count;
                }
                else if (instanceCount !== accessor.count) {
                    throw new Error("".concat(extensionContext, "/attributes: Instance buffer accessors do not have the same count."));
                }
            };
            loadAttribute("TRANSLATION");
            loadAttribute("ROTATION");
            loadAttribute("SCALE");
            return promise.then(function (babylonTransformNode) {
                return Promise.all(promises).then(function (_a) {
                    var translationBuffer = _a[0], rotationBuffer = _a[1], scaleBuffer = _a[2];
                    var matrices = new Float32Array(instanceCount * 16);
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0].copyFromFloats(0, 0, 0); // translation
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0].copyFromFloats(0, 0, 0, 1); // rotation
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1].copyFromFloats(1, 1, 1); // scale
                    for (var i = 0; i < instanceCount; ++i) {
                        translationBuffer && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(translationBuffer, i * 3, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]);
                        rotationBuffer && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArrayToRef(rotationBuffer, i * 4, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0]);
                        scaleBuffer && babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArrayToRef(scaleBuffer, i * 3, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]);
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix.ComposeToRef(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1], babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Quaternion[0], babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0], babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0]);
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Matrix[0].copyToArray(matrices, i * 16);
                    }
                    for (var _i = 0, _b = node._primitiveBabylonMeshes; _i < _b.length; _i++) {
                        var babylonMesh = _b[_i];
                        babylonMesh.thinInstanceSetBuffer("matrix", matrices, 16, true);
                    }
                    return babylonTransformNode;
                });
            });
        });
    };
    return EXT_mesh_gpu_instancing;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new EXT_mesh_gpu_instancing(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_meshopt_compression.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/EXT_meshopt_compression.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_meshopt_compression: () => (/* binding */ EXT_meshopt_compression)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");
/* harmony import */ var babylonjs_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Meshes/Compression/meshoptCompression */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "EXT_meshopt_compression";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md)
 *
 * This extension uses a WebAssembly decoder module from https://github.com/zeux/meshoptimizer/tree/master/js
 * @since 5.0.0
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_meshopt_compression = /** @class */ (function () {
    /**
     * @internal
     */
    function EXT_meshopt_compression(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this.enabled = loader.isExtensionUsed(NAME);
        this._loader = loader;
    }
    /** @internal */
    EXT_meshopt_compression.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    EXT_meshopt_compression.prototype.loadBufferViewAsync = function (context, bufferView) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, bufferView, this.name, function (extensionContext, extension) {
            var bufferViewMeshopt = bufferView;
            if (bufferViewMeshopt._meshOptData) {
                return bufferViewMeshopt._meshOptData;
            }
            var buffer = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(context, "/buffer"), _this._loader.gltf.buffers, extension.buffer);
            bufferViewMeshopt._meshOptData = _this._loader.loadBufferAsync("/buffers/".concat(buffer.index), buffer, extension.byteOffset || 0, extension.byteLength).then(function (buffer) {
                return babylonjs_Meshes_Compression_meshoptCompression__WEBPACK_IMPORTED_MODULE_1__.MeshoptCompression.Default.decodeGltfBufferAsync(buffer, extension.count, extension.byteStride, extension.mode, extension.filter);
            });
            return bufferViewMeshopt._meshOptData;
        });
    };
    return EXT_meshopt_compression;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new EXT_meshopt_compression(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_texture_webp.ts":
/*!************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/EXT_texture_webp.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_texture_webp: () => (/* binding */ EXT_texture_webp)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");

var NAME = "EXT_texture_webp";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_texture_webp/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var EXT_texture_webp = /** @class */ (function () {
    /**
     * @internal
     */
    function EXT_texture_webp(loader) {
        /** The name of this extension. */
        this.name = NAME;
        this._loader = loader;
        this.enabled = loader.isExtensionUsed(NAME);
    }
    /** @internal */
    EXT_texture_webp.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    EXT_texture_webp.prototype._loadTextureAsync = function (context, texture, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, texture, this.name, function (extensionContext, extension) {
            var sampler = texture.sampler == undefined ? _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.DefaultSampler : _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(context, "/sampler"), _this._loader.gltf.samplers, texture.sampler);
            var image = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(extensionContext, "/source"), _this._loader.gltf.images, extension.source);
            return _this._loader._createTextureAsync(context, sampler, image, function (babylonTexture) {
                assign(babylonTexture);
            }, undefined, !texture._textureInfo.nonColorData);
        });
    };
    return EXT_texture_webp;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new EXT_texture_webp(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/ExtrasAsMetadata.ts":
/*!************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/ExtrasAsMetadata.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExtrasAsMetadata: () => (/* binding */ ExtrasAsMetadata)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");

var NAME = "ExtrasAsMetadata";
/**
 * Store glTF extras (if present) in BJS objects' metadata
 */
var ExtrasAsMetadata = /** @class */ (function () {
    /**
     * @internal
     */
    function ExtrasAsMetadata(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines whether this extension is enabled.
         */
        this.enabled = true;
        this._loader = loader;
    }
    ExtrasAsMetadata.prototype._assignExtras = function (babylonObject, gltfProp) {
        if (gltfProp.extras && Object.keys(gltfProp.extras).length > 0) {
            var metadata = (babylonObject.metadata = babylonObject.metadata || {});
            var gltf = (metadata.gltf = metadata.gltf || {});
            gltf.extras = gltfProp.extras;
        }
    };
    /** @internal */
    ExtrasAsMetadata.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    ExtrasAsMetadata.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        return this._loader.loadNodeAsync(context, node, function (babylonTransformNode) {
            _this._assignExtras(babylonTransformNode, node);
            assign(babylonTransformNode);
        });
    };
    /**
     * @internal
     */
    ExtrasAsMetadata.prototype.loadCameraAsync = function (context, camera, assign) {
        var _this = this;
        return this._loader.loadCameraAsync(context, camera, function (babylonCamera) {
            _this._assignExtras(babylonCamera, camera);
            assign(babylonCamera);
        });
    };
    /**
     * @internal
     */
    ExtrasAsMetadata.prototype.createMaterial = function (context, material, babylonDrawMode) {
        var babylonMaterial = this._loader.createMaterial(context, material, babylonDrawMode);
        this._assignExtras(babylonMaterial, material);
        return babylonMaterial;
    };
    return ExtrasAsMetadata;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new ExtrasAsMetadata(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.data.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.data.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animationPointerTree: () => (/* binding */ animationPointerTree)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.color */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoaderAnimation */ "../../../dev/loaders/src/glTF/2.0/glTFLoaderAnimation.ts");
/* eslint-disable @typescript-eslint/naming-convention */




function getColor3(_target, source, offset, scale) {
    return babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(source, offset).scale(scale);
}
function getAlpha(_target, source, offset, scale) {
    return source[offset + 3] * scale;
}
function getFloat(_target, source, offset, scale) {
    return source[offset] * scale;
}
function getMinusFloat(_target, source, offset, scale) {
    return -source[offset] * scale;
}
function getNextFloat(_target, source, offset, scale) {
    return source[offset + 1] * scale;
}
function getFloatBy2(_target, source, offset, scale) {
    return source[offset] * scale * 2;
}
function getTextureTransformTree(textureName) {
    return {
        scale: [
            new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "".concat(textureName, ".uScale"), getFloat, function () { return 2; }),
            new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "".concat(textureName, ".vScale"), getNextFloat, function () { return 2; }),
        ],
        offset: [
            new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "".concat(textureName, ".uOffset"), getFloat, function () { return 2; }),
            new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "".concat(textureName, ".vOffset"), getNextFloat, function () { return 2; }),
        ],
        rotation: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "".concat(textureName, ".wAng"), getMinusFloat, function () { return 1; })],
    };
}
var CameraAnimationPropertyInfo = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(CameraAnimationPropertyInfo, _super);
    function CameraAnimationPropertyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @internal */
    CameraAnimationPropertyInfo.prototype.buildAnimations = function (target, name, fps, keys, callback) {
        callback(target._babylonCamera, this._buildAnimation(name, fps, keys));
    };
    return CameraAnimationPropertyInfo;
}(_glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_1__.AnimationPropertyInfo));
var MaterialAnimationPropertyInfo = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(MaterialAnimationPropertyInfo, _super);
    function MaterialAnimationPropertyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @internal */
    MaterialAnimationPropertyInfo.prototype.buildAnimations = function (target, name, fps, keys, callback) {
        for (var fillMode in target._data) {
            callback(target._data[fillMode].babylonMaterial, this._buildAnimation(name, fps, keys));
        }
    };
    return MaterialAnimationPropertyInfo;
}(_glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_1__.AnimationPropertyInfo));
var LightAnimationPropertyInfo = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(LightAnimationPropertyInfo, _super);
    function LightAnimationPropertyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @internal */
    LightAnimationPropertyInfo.prototype.buildAnimations = function (target, name, fps, keys, callback) {
        callback(target._babylonLight, this._buildAnimation(name, fps, keys));
    };
    return LightAnimationPropertyInfo;
}(_glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_1__.AnimationPropertyInfo));
var nodesTree = {
    __array__: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({ __target__: true }, _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_1__.nodeAnimationData),
};
var camerasTree = {
    __array__: {
        __target__: true,
        orthographic: {
            xmag: [
                new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "orthoLeft", getMinusFloat, function () { return 1; }),
                new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "orthoRight", getNextFloat, function () { return 1; }),
            ],
            ymag: [
                new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "orthoBottom", getMinusFloat, function () { return 1; }),
                new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "orthoTop", getNextFloat, function () { return 1; }),
            ],
            zfar: [new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "maxZ", getFloat, function () { return 1; })],
            znear: [new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "minZ", getFloat, function () { return 1; })],
        },
        perspective: {
            yfov: [new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "fov", getFloat, function () { return 1; })],
            zfar: [new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "maxZ", getFloat, function () { return 1; })],
            znear: [new CameraAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "minZ", getFloat, function () { return 1; })],
        },
    },
};
var materialsTree = {
    __array__: {
        __target__: true,
        pbrMetallicRoughness: {
            baseColorFactor: [
                new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "albedoColor", getColor3, function () { return 4; }),
                new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "alpha", getAlpha, function () { return 4; }),
            ],
            metallicFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "metallic", getFloat, function () { return 1; })],
            roughnessFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "roughness", getFloat, function () { return 1; })],
            baseColorTexture: {
                extensions: {
                    KHR_texture_transform: getTextureTransformTree("albedoTexture"),
                },
            },
        },
        emissiveFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "emissiveColor", getColor3, function () { return 3; })],
        normalTexture: {
            scale: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "bumpTexture.level", getFloat, function () { return 1; })],
        },
        occlusionTexture: {
            strength: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "ambientTextureStrength", getFloat, function () { return 1; })],
            extensions: {
                KHR_texture_transform: getTextureTransformTree("ambientTexture"),
            },
        },
        emissiveTexture: {
            extensions: {
                KHR_texture_transform: getTextureTransformTree("emissiveTexture"),
            },
        },
        extensions: {
            KHR_materials_ior: {
                ior: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "indexOfRefraction", getFloat, function () { return 1; })],
            },
            KHR_materials_clearcoat: {
                clearcoatFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "clearCoat.intensity", getFloat, function () { return 1; })],
                clearcoatRoughnessFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "clearCoat.roughness", getFloat, function () { return 1; })],
            },
            KHR_materials_sheen: {
                sheenColorFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "sheen.color", getColor3, function () { return 3; })],
                sheenRoughnessFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "sheen.roughness", getFloat, function () { return 1; })],
            },
            KHR_materials_specular: {
                specularFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "metallicF0Factor", getFloat, function () { return 1; })],
                specularColorFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "metallicReflectanceColor", getColor3, function () { return 3; })],
            },
            KHR_materials_emissive_strength: {
                emissiveStrength: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "emissiveIntensity", getFloat, function () { return 1; })],
            },
            KHR_materials_transmission: {
                transmissionFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "subSurface.refractionIntensity", getFloat, function () { return 1; })],
            },
            KHR_materials_volume: {
                attenuationColor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "subSurface.tintColor", getColor3, function () { return 3; })],
                attenuationDistance: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "subSurface.tintColorAtDistance", getFloat, function () { return 1; })],
                thicknessFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "subSurface.maximumThickness", getFloat, function () { return 1; })],
            },
            KHR_materials_iridescence: {
                iridescenceFactor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "iridescence.intensity", getFloat, function () { return 1; })],
                iridescenceIor: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "iridescence.indexOfRefraction", getFloat, function () { return 1; })],
                iridescenceThicknessMinimum: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "iridescence.minimumThickness", getFloat, function () { return 1; })],
                iridescenceThicknessMaximum: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "iridescence.maximumThickness", getFloat, function () { return 1; })],
            },
            KHR_materials_anisotropy: {
                anisotropyStrength: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "anisotropy.intensity", getFloat, function () { return 1; })],
                anisotropyRotation: [new MaterialAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "anisotropy.angle", getFloat, function () { return 1; })],
            },
        },
    },
};
var extensionsTree = {
    KHR_lights_punctual: {
        lights: {
            __array__: {
                __target__: true,
                color: [new LightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_COLOR3, "diffuse", getColor3, function () { return 3; })],
                intensity: [new LightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "intensity", getFloat, function () { return 1; })],
                range: [new LightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "range", getFloat, function () { return 1; })],
                spot: {
                    innerConeAngle: [new LightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "innerAngle", getFloatBy2, function () { return 1; })],
                    outerConeAngle: [new LightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "angle", getFloatBy2, function () { return 1; })],
                },
            },
        },
    },
};
/** @internal */
var animationPointerTree = {
    nodes: nodesTree,
    materials: materialsTree,
    cameras: camerasTree,
    extensions: extensionsTree,
};


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_animation_pointer: () => (/* binding */ KHR_animation_pointer)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _KHR_animation_pointer_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KHR_animation_pointer.data */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.data.ts");



var NAME = "KHR_animation_pointer";
/**
 * [Specification PR](https://github.com/KhronosGroup/glTF/pull/2147)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_animation_pointer = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_animation_pointer(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
    }
    Object.defineProperty(KHR_animation_pointer.prototype, "enabled", {
        /**
         * Defines whether this extension is enabled.
         */
        get: function () {
            return this._loader.isExtensionUsed(NAME);
        },
        enumerable: false,
        configurable: true
    });
    /** @internal */
    KHR_animation_pointer.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete or null if not handled
     */
    KHR_animation_pointer.prototype._loadAnimationChannelAsync = function (context, animationContext, animation, channel, onLoad) {
        var _a;
        var extension = (_a = channel.target.extensions) === null || _a === void 0 ? void 0 : _a.KHR_animation_pointer;
        if (!extension) {
            return null;
        }
        if (channel.target.path !== "pointer" /* AnimationChannelTargetPath.POINTER */) {
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__.Logger.Warn("".concat(context, "/target/path: Value (").concat(channel.target.path, ") must be (").concat("pointer" /* AnimationChannelTargetPath.POINTER */, ") when using the ").concat(this.name, " extension"));
        }
        if (channel.target.node != undefined) {
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__.Logger.Warn("".concat(context, "/target/node: Value (").concat(channel.target.node, ") must not be present when using the ").concat(this.name, " extension"));
        }
        var extensionContext = "".concat(context, "/extensions/").concat(this.name);
        var pointer = extension.pointer;
        if (!pointer) {
            throw new Error("".concat(extensionContext, ": Pointer is missing"));
        }
        var targetInfo = this._parseAnimationPointer("".concat(extensionContext, "/pointer"), pointer);
        if (!targetInfo) {
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__.Logger.Warn("".concat(extensionContext, "/pointer: Invalid pointer (").concat(pointer, ") skipped"));
            return null;
        }
        return this._loader._loadAnimationChannelFromTargetInfoAsync(context, animationContext, animation, channel, targetInfo, onLoad);
    };
    /**
     * The pointer string is represented by a [JSON pointer](https://datatracker.ietf.org/doc/html/rfc6901).
     * <animationPointer> := /<rootNode>/<assetIndex>/<propertyPath>
     * <rootNode> := "nodes" | "materials" | "meshes" | "cameras" | "extensions"
     * <assetIndex> := <digit> | <name>
     * <propertyPath> := <extensionPath> | <standardPath>
     * <extensionPath> := "extensions"/<name>/<standardPath>
     * <standardPath> := <name> | <name>/<standardPath>
     * <name> := W+
     * <digit> := D+
     *
     * Examples:
     *  - "/nodes/0/rotation"
     *  - "/materials/2/emissiveFactor"
     *  - "/materials/2/pbrMetallicRoughness/baseColorFactor"
     *  - "/materials/2/extensions/KHR_materials_emissive_strength/emissiveStrength"
     */
    KHR_animation_pointer.prototype._parseAnimationPointer = function (context, pointer) {
        if (!pointer.startsWith("/")) {
            babylonjs_Misc_logger__WEBPACK_IMPORTED_MODULE_1__.Logger.Warn("".concat(context, ": Value (").concat(pointer, ") must start with a slash"));
            return null;
        }
        var parts = pointer.split("/");
        // Remove the first part since it will be empty string as pointers must start with a slash.
        parts.shift();
        var node = _KHR_animation_pointer_data__WEBPACK_IMPORTED_MODULE_2__.animationPointerTree;
        var gltfCurrentNode = this._loader.gltf;
        var gltfTargetNode = undefined;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (node.__array__) {
                node = node.__array__;
            }
            else {
                node = node[part];
                if (!node) {
                    return null;
                }
            }
            gltfCurrentNode = gltfCurrentNode && gltfCurrentNode[part];
            if (node.__target__) {
                gltfTargetNode = gltfCurrentNode;
            }
        }
        if (!gltfTargetNode || !Array.isArray(node)) {
            return null;
        }
        return {
            target: gltfTargetNode,
            properties: node,
        };
    };
    return KHR_animation_pointer;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_animation_pointer(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_draco_mesh_compression.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_draco_mesh_compression.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_draco_mesh_compression: () => (/* binding */ KHR_draco_mesh_compression)
/* harmony export */ });
/* harmony import */ var babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Buffers/buffer */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "KHR_draco_mesh_compression";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_draco_mesh_compression = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_draco_mesh_compression(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines whether to use the normalized flag from the glTF accessor instead of the Draco data. Defaults to true.
         */
        this.useNormalizedFlagFromAccessor = true;
        this._loader = loader;
        this.enabled = babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.DracoCompression.DecoderAvailable && this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_draco_mesh_compression.prototype.dispose = function () {
        delete this.dracoCompression;
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_draco_mesh_compression.prototype._loadVertexDataAsync = function (context, primitive, babylonMesh) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, primitive, this.name, function (extensionContext, extension) {
            if (primitive.mode != undefined) {
                if (primitive.mode !== 5 /* MeshPrimitiveMode.TRIANGLE_STRIP */ && primitive.mode !== 4 /* MeshPrimitiveMode.TRIANGLES */) {
                    throw new Error("".concat(context, ": Unsupported mode ").concat(primitive.mode));
                }
                // TODO: handle triangle strips
                if (primitive.mode === 5 /* MeshPrimitiveMode.TRIANGLE_STRIP */) {
                    throw new Error("".concat(context, ": Mode ").concat(primitive.mode, " is not currently supported"));
                }
            }
            var attributes = {};
            var normalized = {};
            var loadAttribute = function (name, kind) {
                var uniqueId = extension.attributes[name];
                if (uniqueId == undefined) {
                    return;
                }
                babylonMesh._delayInfo = babylonMesh._delayInfo || [];
                if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                    babylonMesh._delayInfo.push(kind);
                }
                attributes[kind] = uniqueId;
                if (_this.useNormalizedFlagFromAccessor) {
                    var accessor = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.TryGet(_this._loader.gltf.accessors, primitive.attributes[name]);
                    if (accessor) {
                        normalized[kind] = accessor.normalized || false;
                    }
                }
            };
            loadAttribute("POSITION", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
            loadAttribute("NORMAL", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
            loadAttribute("TANGENT", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind);
            loadAttribute("TEXCOORD_0", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
            loadAttribute("TEXCOORD_1", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
            loadAttribute("TEXCOORD_2", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV3Kind);
            loadAttribute("TEXCOORD_3", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV4Kind);
            loadAttribute("TEXCOORD_4", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV5Kind);
            loadAttribute("TEXCOORD_5", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV6Kind);
            loadAttribute("JOINTS_0", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind);
            loadAttribute("WEIGHTS_0", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind);
            loadAttribute("COLOR_0", babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
            var bufferView = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(extensionContext, _this._loader.gltf.bufferViews, extension.bufferView);
            if (!bufferView._dracoBabylonGeometry) {
                bufferView._dracoBabylonGeometry = _this._loader.loadBufferViewAsync("/bufferViews/".concat(bufferView.index), bufferView).then(function (data) {
                    var dracoCompression = _this.dracoCompression || babylonjs_Meshes_Compression_dracoCompression__WEBPACK_IMPORTED_MODULE_0__.DracoCompression.Default;
                    return dracoCompression._decodeMeshToGeometryForGltfAsync(babylonMesh.name, _this._loader.babylonScene, data, attributes, normalized).catch(function (error) {
                        throw new Error("".concat(context, ": ").concat(error.message));
                    });
                });
            }
            return bufferView._dracoBabylonGeometry;
        });
    };
    return KHR_draco_mesh_compression;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_draco_mesh_compression(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_lights_punctual.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_lights_punctual.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_lights: () => (/* binding */ KHR_lights)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Lights/light */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");







var NAME = "KHR_lights_punctual";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_lights = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_lights(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_lights.prototype.dispose = function () {
        this._loader = null;
        delete this._lights;
    };
    /** @internal */
    KHR_lights.prototype.onLoading = function () {
        var extensions = this._loader.gltf.extensions;
        if (extensions && extensions[this.name]) {
            var extension = extensions[this.name];
            this._lights = extension.lights;
            _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(this._lights);
        }
    };
    /**
     * @internal
     */
    KHR_lights.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
            return _this._loader.loadNodeAsync(context, node, function (babylonMesh) {
                var babylonLight;
                var light = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(extensionContext, _this._lights, extension.light);
                var name = light.name || babylonMesh.name;
                _this._loader.babylonScene._blockEntityCollection = !!_this._loader._assetContainer;
                switch (light.type) {
                    case "directional" /* KHRLightsPunctual_LightType.DIRECTIONAL */: {
                        var babylonDirectionalLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(name, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Backward(), _this._loader.babylonScene);
                        babylonDirectionalLight.position.setAll(0);
                        babylonLight = babylonDirectionalLight;
                        break;
                    }
                    case "point" /* KHRLightsPunctual_LightType.POINT */: {
                        babylonLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.PointLight(name, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), _this._loader.babylonScene);
                        break;
                    }
                    case "spot" /* KHRLightsPunctual_LightType.SPOT */: {
                        var babylonSpotLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SpotLight(name, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Backward(), 0, 1, _this._loader.babylonScene);
                        babylonSpotLight.angle = ((light.spot && light.spot.outerConeAngle) || Math.PI / 4) * 2;
                        babylonSpotLight.innerAngle = ((light.spot && light.spot.innerConeAngle) || 0) * 2;
                        babylonLight = babylonSpotLight;
                        break;
                    }
                    default: {
                        _this._loader.babylonScene._blockEntityCollection = false;
                        throw new Error("".concat(extensionContext, ": Invalid light type (").concat(light.type, ")"));
                    }
                }
                babylonLight._parentContainer = _this._loader._assetContainer;
                _this._loader.babylonScene._blockEntityCollection = false;
                light._babylonLight = babylonLight;
                babylonLight.falloffType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Light.FALLOFF_GLTF;
                babylonLight.diffuse = light.color ? babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(light.color) : babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                babylonLight.intensity = light.intensity == undefined ? 1 : light.intensity;
                babylonLight.range = light.range == undefined ? Number.MAX_VALUE : light.range;
                babylonLight.parent = babylonMesh;
                _this._loader._babylonLights.push(babylonLight);
                _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.AddPointerMetadata(babylonLight, extensionContext);
                assign(babylonMesh);
            });
        });
    };
    return KHR_lights;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_lights(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts":
/*!********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_anisotropy: () => (/* binding */ KHR_materials_anisotropy)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_anisotropy";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_anisotropy)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_anisotropy = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_anisotropy(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 195;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_anisotropy.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_anisotropy.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadIridescencePropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_anisotropy.prototype._loadIridescencePropertiesAsync = function (context, properties, babylonMaterial) {
        var _a, _b;
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.anisotropy.isEnabled = true;
        babylonMaterial.anisotropy.intensity = (_a = properties.anisotropyStrength) !== null && _a !== void 0 ? _a : 0;
        babylonMaterial.anisotropy.angle = (_b = properties.anisotropyRotation) !== null && _b !== void 0 ? _b : 0;
        if (properties.anisotropyTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/anisotropyTexture"), properties.anisotropyTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Anisotropy Intensity)");
                babylonMaterial.anisotropy.texture = texture;
            }));
        }
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_anisotropy;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_anisotropy(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts":
/*!*******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_clearcoat: () => (/* binding */ KHR_materials_clearcoat)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_clearcoat";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_clearcoat/README.md)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#7F7PN6#8)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_clearcoat = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_clearcoat(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 190;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_clearcoat.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_clearcoat.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadClearCoatPropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_clearcoat.prototype._loadClearCoatPropertiesAsync = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.clearCoat.isEnabled = true;
        babylonMaterial.clearCoat.useRoughnessFromMainTexture = false;
        babylonMaterial.clearCoat.remapF0OnInterfaceChange = false;
        if (properties.clearcoatFactor != undefined) {
            babylonMaterial.clearCoat.intensity = properties.clearcoatFactor;
        }
        else {
            babylonMaterial.clearCoat.intensity = 0;
        }
        if (properties.clearcoatTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/clearcoatTexture"), properties.clearcoatTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (ClearCoat Intensity)");
                babylonMaterial.clearCoat.texture = texture;
            }));
        }
        if (properties.clearcoatRoughnessFactor != undefined) {
            babylonMaterial.clearCoat.roughness = properties.clearcoatRoughnessFactor;
        }
        else {
            babylonMaterial.clearCoat.roughness = 0;
        }
        if (properties.clearcoatRoughnessTexture) {
            properties.clearcoatRoughnessTexture.nonColorData = true;
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/clearcoatRoughnessTexture"), properties.clearcoatRoughnessTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (ClearCoat Roughness)");
                babylonMaterial.clearCoat.textureRoughness = texture;
            }));
        }
        if (properties.clearcoatNormalTexture) {
            properties.clearcoatNormalTexture.nonColorData = true;
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/clearcoatNormalTexture"), properties.clearcoatNormalTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (ClearCoat Normal)");
                babylonMaterial.clearCoat.bumpTexture = texture;
            }));
            babylonMaterial.invertNormalMapX = !babylonMaterial.getScene().useRightHandedSystem;
            babylonMaterial.invertNormalMapY = babylonMaterial.getScene().useRightHandedSystem;
            if (properties.clearcoatNormalTexture.scale != undefined) {
                babylonMaterial.clearCoat.bumpTexture.level = properties.clearcoatNormalTexture.scale;
            }
        }
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_clearcoat;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_clearcoat(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts":
/*!***************************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_emissive_strength: () => (/* binding */ KHR_materials_emissive_strength)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_emissive_strength";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_emissive_strength = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_emissive_strength(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 170;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_emissive_strength.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_emissive_strength.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            return _this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial).then(function () {
                _this._loadEmissiveProperties(extensionContext, extension, babylonMaterial);
            });
        });
    };
    KHR_materials_emissive_strength.prototype._loadEmissiveProperties = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        if (properties.emissiveStrength !== undefined) {
            babylonMaterial.emissiveColor.scaleToRef(properties.emissiveStrength, babylonMaterial.emissiveColor);
        }
    };
    return KHR_materials_emissive_strength;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_emissive_strength(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_ior.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_ior.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_ior: () => (/* binding */ KHR_materials_ior)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_ior";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_ior = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_ior(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 180;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_ior.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_ior.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadIorPropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_ior.prototype._loadIorPropertiesAsync = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        if (properties.ior !== undefined) {
            babylonMaterial.indexOfRefraction = properties.ior;
        }
        else {
            babylonMaterial.indexOfRefraction = KHR_materials_ior._DEFAULT_IOR;
        }
        return Promise.resolve();
    };
    /**
     * Default ior Value from the spec.
     */
    KHR_materials_ior._DEFAULT_IOR = 1.5;
    return KHR_materials_ior;
}());
_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_ior(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts":
/*!*********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_iridescence: () => (/* binding */ KHR_materials_iridescence)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_iridescence";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_iridescence/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_iridescence = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_iridescence(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 195;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_iridescence.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_iridescence.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadIridescencePropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_iridescence.prototype._loadIridescencePropertiesAsync = function (context, properties, babylonMaterial) {
        var _a, _b, _c, _d, _e;
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.iridescence.isEnabled = true;
        babylonMaterial.iridescence.intensity = (_a = properties.iridescenceFactor) !== null && _a !== void 0 ? _a : 0;
        babylonMaterial.iridescence.indexOfRefraction = (_c = (_b = properties.iridescenceIor) !== null && _b !== void 0 ? _b : properties.iridescenceIOR) !== null && _c !== void 0 ? _c : 1.3;
        babylonMaterial.iridescence.minimumThickness = (_d = properties.iridescenceThicknessMinimum) !== null && _d !== void 0 ? _d : 100;
        babylonMaterial.iridescence.maximumThickness = (_e = properties.iridescenceThicknessMaximum) !== null && _e !== void 0 ? _e : 400;
        if (properties.iridescenceTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/iridescenceTexture"), properties.iridescenceTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Iridescence Intensity)");
                babylonMaterial.iridescence.texture = texture;
            }));
        }
        if (properties.iridescenceThicknessTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/iridescenceThicknessTexture"), properties.iridescenceThicknessTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Iridescence Thickness)");
                babylonMaterial.iridescence.thicknessTexture = texture;
            }));
        }
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_iridescence;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_iridescence(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.ts":
/*!*******************************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_pbrSpecularGlossiness: () => (/* binding */ KHR_materials_pbrSpecularGlossiness)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "KHR_materials_pbrSpecularGlossiness";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_pbrSpecularGlossiness = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_pbrSpecularGlossiness(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 200;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_pbrSpecularGlossiness.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_pbrSpecularGlossiness.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadSpecularGlossinessPropertiesAsync(extensionContext, material, extension, babylonMaterial));
            _this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_pbrSpecularGlossiness.prototype._loadSpecularGlossinessPropertiesAsync = function (context, material, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.metallic = null;
        babylonMaterial.roughness = null;
        if (properties.diffuseFactor) {
            babylonMaterial.albedoColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.diffuseFactor);
            babylonMaterial.alpha = properties.diffuseFactor[3];
        }
        else {
            babylonMaterial.albedoColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
        }
        babylonMaterial.reflectivityColor = properties.specularFactor ? babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.specularFactor) : babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
        babylonMaterial.microSurface = properties.glossinessFactor == undefined ? 1 : properties.glossinessFactor;
        if (properties.diffuseTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/diffuseTexture"), properties.diffuseTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Diffuse)");
                babylonMaterial.albedoTexture = texture;
            }));
        }
        if (properties.specularGlossinessTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/specularGlossinessTexture"), properties.specularGlossinessTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Specular Glossiness)");
                babylonMaterial.reflectivityTexture = texture;
                babylonMaterial.reflectivityTexture.hasAlpha = true;
            }));
            babylonMaterial.useMicroSurfaceFromReflectivityMapAlpha = true;
        }
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_pbrSpecularGlossiness;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_pbrSpecularGlossiness(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_sheen.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_sheen.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_sheen: () => (/* binding */ KHR_materials_sheen)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.color */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "KHR_materials_sheen";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_sheen/README.md)
 * [Playground Sample](https://www.babylonjs-playground.com/frame.html#BNIZX6#4)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_sheen = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_sheen(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 190;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_sheen.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_sheen.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadSheenPropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_sheen.prototype._loadSheenPropertiesAsync = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.sheen.isEnabled = true;
        babylonMaterial.sheen.intensity = 1;
        if (properties.sheenColorFactor != undefined) {
            babylonMaterial.sheen.color = babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.sheenColorFactor);
        }
        else {
            babylonMaterial.sheen.color = babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.Black();
        }
        if (properties.sheenColorTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/sheenColorTexture"), properties.sheenColorTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Sheen Color)");
                babylonMaterial.sheen.texture = texture;
            }));
        }
        if (properties.sheenRoughnessFactor !== undefined) {
            babylonMaterial.sheen.roughness = properties.sheenRoughnessFactor;
        }
        else {
            babylonMaterial.sheen.roughness = 0;
        }
        if (properties.sheenRoughnessTexture) {
            properties.sheenRoughnessTexture.nonColorData = true;
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/sheenRoughnessTexture"), properties.sheenRoughnessTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Sheen Roughness)");
                babylonMaterial.sheen.textureRoughness = texture;
            }));
        }
        babylonMaterial.sheen.albedoScaling = true;
        babylonMaterial.sheen.useRoughnessFromMainTexture = false;
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_sheen;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_sheen(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_specular.ts":
/*!******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_specular.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_specular: () => (/* binding */ KHR_materials_specular)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.color */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "KHR_materials_specular";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_specular = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_specular(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 190;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_specular.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_specular.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadSpecularPropertiesAsync(extensionContext, extension, babylonMaterial));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_specular.prototype._loadSpecularPropertiesAsync = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        if (properties.specularFactor !== undefined) {
            babylonMaterial.metallicF0Factor = properties.specularFactor;
        }
        if (properties.specularColorFactor !== undefined) {
            babylonMaterial.metallicReflectanceColor = babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.specularColorFactor);
        }
        if (properties.specularTexture) {
            properties.specularTexture.nonColorData = true;
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/specularTexture"), properties.specularTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Specular F0 Strength)");
                babylonMaterial.metallicReflectanceTexture = texture;
                babylonMaterial.useOnlyMetallicFromMetallicReflectanceTexture = true;
            }));
        }
        if (properties.specularColorTexture) {
            promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/specularColorTexture"), properties.specularColorTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Specular F0 Color)");
                babylonMaterial.reflectanceTexture = texture;
            }));
        }
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_specular;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_specular(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_translucency.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_translucency.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_translucency: () => (/* binding */ KHR_materials_translucency)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_translucency";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_translucency = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_translucency(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 174;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
        if (this.enabled) {
            loader.parent.transparencyAsCoverage = true;
        }
    }
    /** @internal */
    KHR_materials_translucency.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_translucency.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadTranslucentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_translucency.prototype._loadTranslucentPropertiesAsync = function (context, material, babylonMaterial, extension) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var pbrMaterial = babylonMaterial;
        // Enables "translucency" texture which represents diffusely-transmitted light.
        pbrMaterial.subSurface.isTranslucencyEnabled = true;
        // Since this extension models thin-surface transmission only, we must make the
        // internal IOR == 1.0 and set the thickness to 0.
        pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
        pbrMaterial.subSurface.minimumThickness = 0.0;
        pbrMaterial.subSurface.maximumThickness = 0.0;
        // Albedo colour will tint transmission.
        pbrMaterial.subSurface.useAlbedoToTintTranslucency = true;
        if (extension.translucencyFactor !== undefined) {
            pbrMaterial.subSurface.translucencyIntensity = extension.translucencyFactor;
        }
        else {
            pbrMaterial.subSurface.translucencyIntensity = 0.0;
            pbrMaterial.subSurface.isTranslucencyEnabled = false;
            return Promise.resolve();
        }
        if (extension.translucencyTexture) {
            extension.translucencyTexture.nonColorData = true;
            return this._loader.loadTextureInfoAsync("".concat(context, "/translucencyTexture"), extension.translucencyTexture).then(function (texture) {
                pbrMaterial.subSurface.translucencyIntensityTexture = texture;
            });
        }
        else {
            return Promise.resolve();
        }
    };
    return KHR_materials_translucency;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_translucency(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_transmission.ts":
/*!**********************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_transmission.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_transmission: () => (/* binding */ KHR_materials_transmission)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");







/**
 * A class to handle setting up the rendering of opaque objects to be shown through transmissive objects.
 */
var TransmissionHelper = /** @class */ (function () {
    /**
     * constructor
     * @param options Defines the options we want to customize the helper
     * @param scene The scene to add the material to
     */
    function TransmissionHelper(options, scene) {
        var _this = this;
        this._opaqueRenderTarget = null;
        this._opaqueMeshesCache = [];
        this._transparentMeshesCache = [];
        this._materialObservers = {};
        this._options = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, TransmissionHelper._GetDefaultOptions()), options);
        this._scene = scene;
        this._scene._transmissionHelper = this;
        this.onErrorObservable = new babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Observable();
        this._scene.onDisposeObservable.addOnce(function () {
            _this.dispose();
        });
        this._parseScene();
        this._setupRenderTargets();
    }
    /**
     * Creates the default options for the helper.
     */
    TransmissionHelper._GetDefaultOptions = function () {
        return {
            renderSize: 1024,
            samples: 4,
            lodGenerationScale: 1,
            lodGenerationOffset: -4,
            renderTargetTextureType: babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURETYPE_HALF_FLOAT,
            generateMipmaps: true,
        };
    };
    /**
     * Updates the background according to the new options
     * @param options
     */
    TransmissionHelper.prototype.updateOptions = function (options) {
        var _this = this;
        // First check if any options are actually being changed. If not, exit.
        var newValues = Object.keys(options).filter(function (key) { return _this._options[key] !== options[key]; });
        if (!newValues.length) {
            return;
        }
        var newOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this._options), options);
        var oldOptions = this._options;
        this._options = newOptions;
        // If size changes, recreate everything
        if (newOptions.renderSize !== oldOptions.renderSize ||
            newOptions.renderTargetTextureType !== oldOptions.renderTargetTextureType ||
            newOptions.generateMipmaps !== oldOptions.generateMipmaps ||
            !this._opaqueRenderTarget) {
            this._setupRenderTargets();
        }
        else {
            this._opaqueRenderTarget.samples = newOptions.samples;
            this._opaqueRenderTarget.lodGenerationScale = newOptions.lodGenerationScale;
            this._opaqueRenderTarget.lodGenerationOffset = newOptions.lodGenerationOffset;
        }
    };
    /**
     * Gets the opaque render target texture or null if not available.
     */
    TransmissionHelper.prototype.getOpaqueTarget = function () {
        return this._opaqueRenderTarget;
    };
    TransmissionHelper.prototype._shouldRenderAsTransmission = function (material) {
        if (!material) {
            return false;
        }
        if (material instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial && material.subSurface.isRefractionEnabled) {
            return true;
        }
        return false;
    };
    TransmissionHelper.prototype._addMesh = function (mesh) {
        var _this = this;
        this._materialObservers[mesh.uniqueId] = mesh.onMaterialChangedObservable.add(this._onMeshMaterialChanged.bind(this));
        // we need to defer the processing because _addMesh may be called as part as an instance mesh creation, in which case some
        // internal properties are not setup yet, like _sourceMesh (needed when doing mesh.material below)
        babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.Tools.SetImmediate(function () {
            if (_this._shouldRenderAsTransmission(mesh.material)) {
                mesh.material.refractionTexture = _this._opaqueRenderTarget;
                if (_this._transparentMeshesCache.indexOf(mesh) === -1) {
                    _this._transparentMeshesCache.push(mesh);
                }
            }
            else {
                if (_this._opaqueMeshesCache.indexOf(mesh) === -1) {
                    _this._opaqueMeshesCache.push(mesh);
                }
            }
        });
    };
    TransmissionHelper.prototype._removeMesh = function (mesh) {
        mesh.onMaterialChangedObservable.remove(this._materialObservers[mesh.uniqueId]);
        delete this._materialObservers[mesh.uniqueId];
        var idx = this._transparentMeshesCache.indexOf(mesh);
        if (idx !== -1) {
            this._transparentMeshesCache.splice(idx, 1);
        }
        idx = this._opaqueMeshesCache.indexOf(mesh);
        if (idx !== -1) {
            this._opaqueMeshesCache.splice(idx, 1);
        }
    };
    TransmissionHelper.prototype._parseScene = function () {
        this._scene.meshes.forEach(this._addMesh.bind(this));
        // Listen for when a mesh is added to the scene and add it to our cache lists.
        this._scene.onNewMeshAddedObservable.add(this._addMesh.bind(this));
        // Listen for when a mesh is removed from to the scene and remove it from our cache lists.
        this._scene.onMeshRemovedObservable.add(this._removeMesh.bind(this));
    };
    // When one of the meshes in the scene has its material changed, make sure that it's in the correct cache list.
    TransmissionHelper.prototype._onMeshMaterialChanged = function (mesh) {
        var transparentIdx = this._transparentMeshesCache.indexOf(mesh);
        var opaqueIdx = this._opaqueMeshesCache.indexOf(mesh);
        // If the material is transparent, make sure that it's added to the transparent list and removed from the opaque list
        var useTransmission = this._shouldRenderAsTransmission(mesh.material);
        if (useTransmission) {
            if (mesh.material instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial) {
                mesh.material.subSurface.refractionTexture = this._opaqueRenderTarget;
            }
            if (opaqueIdx !== -1) {
                this._opaqueMeshesCache.splice(opaqueIdx, 1);
                this._transparentMeshesCache.push(mesh);
            }
            else if (transparentIdx === -1) {
                this._transparentMeshesCache.push(mesh);
            }
            // If the material is opaque, make sure that it's added to the opaque list and removed from the transparent list
        }
        else {
            if (transparentIdx !== -1) {
                this._transparentMeshesCache.splice(transparentIdx, 1);
                this._opaqueMeshesCache.push(mesh);
            }
            else if (opaqueIdx === -1) {
                this._opaqueMeshesCache.push(mesh);
            }
        }
    };
    /**
     * @internal
     * Check if the opaque render target has not been disposed and can still be used.
     * @returns
     */
    TransmissionHelper.prototype._isRenderTargetValid = function () {
        var _a;
        return ((_a = this._opaqueRenderTarget) === null || _a === void 0 ? void 0 : _a.getInternalTexture()) !== null;
    };
    /**
     * @internal
     * Setup the render targets according to the specified options.
     */
    TransmissionHelper.prototype._setupRenderTargets = function () {
        var _this = this;
        var _a, _b;
        if (this._opaqueRenderTarget) {
            this._opaqueRenderTarget.dispose();
        }
        this._opaqueRenderTarget = new babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.RenderTargetTexture("opaqueSceneTexture", this._options.renderSize, this._scene, this._options.generateMipmaps, undefined, this._options.renderTargetTextureType);
        this._opaqueRenderTarget.ignoreCameraViewport = true;
        this._opaqueRenderTarget.renderList = this._opaqueMeshesCache;
        this._opaqueRenderTarget.clearColor = (_b = (_a = this._options.clearColor) === null || _a === void 0 ? void 0 : _a.clone()) !== null && _b !== void 0 ? _b : this._scene.clearColor.clone();
        this._opaqueRenderTarget.gammaSpace = false;
        this._opaqueRenderTarget.lodGenerationScale = this._options.lodGenerationScale;
        this._opaqueRenderTarget.lodGenerationOffset = this._options.lodGenerationOffset;
        this._opaqueRenderTarget.samples = this._options.samples;
        var sceneImageProcessingapplyByPostProcess;
        var saveSceneEnvIntensity;
        this._opaqueRenderTarget.onBeforeBindObservable.add(function (opaqueRenderTarget) {
            saveSceneEnvIntensity = _this._scene.environmentIntensity;
            _this._scene.environmentIntensity = 1.0;
            sceneImageProcessingapplyByPostProcess = _this._scene.imageProcessingConfiguration.applyByPostProcess;
            if (!_this._options.clearColor) {
                _this._scene.clearColor.toLinearSpaceToRef(opaqueRenderTarget.clearColor, _this._scene.getEngine().useExactSrgbConversions);
            }
            else {
                opaqueRenderTarget.clearColor.copyFrom(_this._options.clearColor);
            }
            // we do not use the applyByPostProcess setter to avoid flagging all the materials as "image processing dirty"!
            _this._scene.imageProcessingConfiguration._applyByPostProcess = true;
        });
        this._opaqueRenderTarget.onAfterUnbindObservable.add(function () {
            _this._scene.environmentIntensity = saveSceneEnvIntensity;
            _this._scene.imageProcessingConfiguration._applyByPostProcess = sceneImageProcessingapplyByPostProcess;
        });
        this._transparentMeshesCache.forEach(function (mesh) {
            if (_this._shouldRenderAsTransmission(mesh.material)) {
                mesh.material.refractionTexture = _this._opaqueRenderTarget;
            }
        });
    };
    /**
     * Dispose all the elements created by the Helper.
     */
    TransmissionHelper.prototype.dispose = function () {
        this._scene._transmissionHelper = undefined;
        if (this._opaqueRenderTarget) {
            this._opaqueRenderTarget.dispose();
            this._opaqueRenderTarget = null;
        }
        this._transparentMeshesCache = [];
        this._opaqueMeshesCache = [];
    };
    return TransmissionHelper;
}());
var NAME = "KHR_materials_transmission";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_transmission = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_transmission(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 175;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
        if (this.enabled) {
            loader.parent.transparencyAsCoverage = true;
        }
    }
    /** @internal */
    KHR_materials_transmission.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_transmission.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadTransparentPropertiesAsync(extensionContext, material, babylonMaterial, extension));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_transmission.prototype._loadTransparentPropertiesAsync = function (context, material, babylonMaterial, extension) {
        var _a, _b;
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var pbrMaterial = babylonMaterial;
        // Enables "refraction" texture which represents transmitted light.
        pbrMaterial.subSurface.isRefractionEnabled = true;
        // Since this extension models thin-surface transmission only, we must make IOR = 1.0
        pbrMaterial.subSurface.volumeIndexOfRefraction = 1.0;
        // Albedo colour will tint transmission.
        pbrMaterial.subSurface.useAlbedoToTintRefraction = true;
        if (extension.transmissionFactor !== undefined) {
            pbrMaterial.subSurface.refractionIntensity = extension.transmissionFactor;
            var scene = pbrMaterial.getScene();
            if (pbrMaterial.subSurface.refractionIntensity && !scene._transmissionHelper) {
                new TransmissionHelper({}, pbrMaterial.getScene());
            }
            else if (pbrMaterial.subSurface.refractionIntensity && !((_a = scene._transmissionHelper) === null || _a === void 0 ? void 0 : _a._isRenderTargetValid())) {
                // If the render target is not valid, recreate it.
                (_b = scene._transmissionHelper) === null || _b === void 0 ? void 0 : _b._setupRenderTargets();
            }
        }
        else {
            pbrMaterial.subSurface.refractionIntensity = 0.0;
            pbrMaterial.subSurface.isRefractionEnabled = false;
            return Promise.resolve();
        }
        pbrMaterial.subSurface.minimumThickness = 0.0;
        pbrMaterial.subSurface.maximumThickness = 0.0;
        if (extension.transmissionTexture) {
            extension.transmissionTexture.nonColorData = true;
            return this._loader.loadTextureInfoAsync("".concat(context, "/transmissionTexture"), extension.transmissionTexture, undefined).then(function (texture) {
                pbrMaterial.subSurface.refractionIntensityTexture = texture;
                pbrMaterial.subSurface.useGltfStyleTextures = true;
            });
        }
        else {
            return Promise.resolve();
        }
    };
    return KHR_materials_transmission;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_transmission(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_unlit.ts":
/*!***************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_unlit.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_unlit: () => (/* binding */ KHR_materials_unlit)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "KHR_materials_unlit";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_unlit/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_unlit = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_unlit(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 210;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_unlit.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_unlit.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function () {
            return _this._loadUnlitPropertiesAsync(context, material, babylonMaterial);
        });
    };
    KHR_materials_unlit.prototype._loadUnlitPropertiesAsync = function (context, material, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.unlit = true;
        var properties = material.pbrMetallicRoughness;
        if (properties) {
            if (properties.baseColorFactor) {
                babylonMaterial.albedoColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.baseColorFactor);
                babylonMaterial.alpha = properties.baseColorFactor[3];
            }
            else {
                babylonMaterial.albedoColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
            }
            if (properties.baseColorTexture) {
                promises.push(this._loader.loadTextureInfoAsync("".concat(context, "/baseColorTexture"), properties.baseColorTexture, function (texture) {
                    texture.name = "".concat(babylonMaterial.name, " (Base Color)");
                    babylonMaterial.albedoTexture = texture;
                }));
            }
        }
        if (material.doubleSided) {
            babylonMaterial.backFaceCulling = false;
            babylonMaterial.twoSidedLighting = true;
        }
        this._loader.loadMaterialAlphaProperties(context, material, babylonMaterial);
        return Promise.all(promises).then(function () { });
    };
    return KHR_materials_unlit;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_unlit(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_variants.ts":
/*!******************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_variants.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_variants: () => (/* binding */ KHR_materials_variants)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Meshes/mesh */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__);


var NAME = "KHR_materials_variants";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_variants = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_variants(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_materials_variants.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * Gets the list of available variant names for this asset.
     * @param rootMesh The glTF root mesh
     * @returns the list of all the variant names for this model
     */
    KHR_materials_variants.GetAvailableVariants = function (rootMesh) {
        var extensionMetadata = this._GetExtensionMetadata(rootMesh);
        if (!extensionMetadata) {
            return [];
        }
        return Object.keys(extensionMetadata.variants);
    };
    /**
     * Gets the list of available variant names for this asset.
     * @param rootMesh The glTF root mesh
     * @returns the list of all the variant names for this model
     */
    KHR_materials_variants.prototype.getAvailableVariants = function (rootMesh) {
        return KHR_materials_variants.GetAvailableVariants(rootMesh);
    };
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootMesh The glTF root mesh
     * @param variantName The variant name(s) to select.
     */
    KHR_materials_variants.SelectVariant = function (rootMesh, variantName) {
        var extensionMetadata = this._GetExtensionMetadata(rootMesh);
        if (!extensionMetadata) {
            throw new Error("Cannot select variant on a glTF mesh that does not have the ".concat(NAME, " extension"));
        }
        var select = function (variantName) {
            var entries = extensionMetadata.variants[variantName];
            if (entries) {
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entry = entries_1[_i];
                    entry.mesh.material = entry.material;
                }
            }
        };
        if (variantName instanceof Array) {
            for (var _i = 0, variantName_1 = variantName; _i < variantName_1.length; _i++) {
                var name_1 = variantName_1[_i];
                select(name_1);
            }
        }
        else {
            select(variantName);
        }
        extensionMetadata.lastSelected = variantName;
    };
    /**
     * Select a variant given a variant name or a list of variant names.
     * @param rootMesh The glTF root mesh
     * @param variantName The variant name(s) to select.
     */
    KHR_materials_variants.prototype.selectVariant = function (rootMesh, variantName) {
        return KHR_materials_variants.SelectVariant(rootMesh, variantName);
    };
    /**
     * Reset back to the original before selecting a variant.
     * @param rootMesh The glTF root mesh
     */
    KHR_materials_variants.Reset = function (rootMesh) {
        var extensionMetadata = this._GetExtensionMetadata(rootMesh);
        if (!extensionMetadata) {
            throw new Error("Cannot reset on a glTF mesh that does not have the ".concat(NAME, " extension"));
        }
        for (var _i = 0, _a = extensionMetadata.original; _i < _a.length; _i++) {
            var entry = _a[_i];
            entry.mesh.material = entry.material;
        }
        extensionMetadata.lastSelected = null;
    };
    /**
     * Reset back to the original before selecting a variant.
     * @param rootMesh The glTF root mesh
     */
    KHR_materials_variants.prototype.reset = function (rootMesh) {
        return KHR_materials_variants.Reset(rootMesh);
    };
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootMesh The glTF root mesh
     * @returns The selected variant name(s).
     */
    KHR_materials_variants.GetLastSelectedVariant = function (rootMesh) {
        var extensionMetadata = this._GetExtensionMetadata(rootMesh);
        if (!extensionMetadata) {
            throw new Error("Cannot get the last selected variant on a glTF mesh that does not have the ".concat(NAME, " extension"));
        }
        return extensionMetadata.lastSelected;
    };
    /**
     * Gets the last selected variant name(s) or null if original.
     * @param rootMesh The glTF root mesh
     * @returns The selected variant name(s).
     */
    KHR_materials_variants.prototype.getLastSelectedVariant = function (rootMesh) {
        return KHR_materials_variants.GetLastSelectedVariant(rootMesh);
    };
    KHR_materials_variants._GetExtensionMetadata = function (rootMesh) {
        var _a, _b;
        return ((_b = (_a = rootMesh === null || rootMesh === void 0 ? void 0 : rootMesh._internalMetadata) === null || _a === void 0 ? void 0 : _a.gltf) === null || _b === void 0 ? void 0 : _b[NAME]) || null;
    };
    /** @internal */
    KHR_materials_variants.prototype.onLoading = function () {
        var extensions = this._loader.gltf.extensions;
        if (extensions && extensions[this.name]) {
            var extension = extensions[this.name];
            this._variants = extension.variants;
        }
    };
    /**
     * @internal
     */
    KHR_materials_variants.prototype._loadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, primitive, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, function (babylonMesh) {
                assign(babylonMesh);
                if (babylonMesh instanceof babylonjs_Meshes_mesh__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
                    var babylonDrawMode = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader._GetDrawMode(context, primitive.mode);
                    var root_1 = _this._loader.rootBabylonMesh;
                    var metadata = root_1 ? (root_1._internalMetadata = root_1._internalMetadata || {}) : {};
                    var gltf = (metadata.gltf = metadata.gltf || {});
                    var extensionMetadata_1 = (gltf[NAME] = gltf[NAME] || { lastSelected: null, original: [], variants: {} });
                    // Store the original material.
                    extensionMetadata_1.original.push({ mesh: babylonMesh, material: babylonMesh.material });
                    var _loop_1 = function (mappingIndex) {
                        var mapping = extension.mappings[mappingIndex];
                        var material = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(extensionContext, "/mappings/").concat(mappingIndex, "/material"), _this._loader.gltf.materials, mapping.material);
                        promises.push(_this._loader._loadMaterialAsync("#/materials/".concat(mapping.material), material, babylonMesh, babylonDrawMode, function (babylonMaterial) {
                            var _loop_2 = function (mappingVariantIndex) {
                                var variantIndex = mapping.variants[mappingVariantIndex];
                                var variant = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("/extensions/".concat(NAME, "/variants/").concat(variantIndex), _this._variants, variantIndex);
                                extensionMetadata_1.variants[variant.name] = extensionMetadata_1.variants[variant.name] || [];
                                extensionMetadata_1.variants[variant.name].push({
                                    mesh: babylonMesh,
                                    material: babylonMaterial,
                                });
                                // Replace the target when original mesh is cloned
                                babylonMesh.onClonedObservable.add(function (newOne) {
                                    var newMesh = newOne;
                                    var metadata = null;
                                    var newRoot = newMesh;
                                    // Find root to get medata
                                    do {
                                        newRoot = newRoot.parent;
                                        if (!newRoot) {
                                            return;
                                        }
                                        metadata = KHR_materials_variants._GetExtensionMetadata(newRoot);
                                    } while (metadata === null);
                                    // Need to clone the metadata on the root (first time only)
                                    if (root_1 && metadata === KHR_materials_variants._GetExtensionMetadata(root_1)) {
                                        // Copy main metadata
                                        newRoot._internalMetadata = {};
                                        for (var key in root_1._internalMetadata) {
                                            newRoot._internalMetadata[key] = root_1._internalMetadata[key];
                                        }
                                        // Copy the gltf metadata
                                        newRoot._internalMetadata.gltf = [];
                                        for (var key in root_1._internalMetadata.gltf) {
                                            newRoot._internalMetadata.gltf[key] = root_1._internalMetadata.gltf[key];
                                        }
                                        // Duplicate the extension specific metadata
                                        newRoot._internalMetadata.gltf[NAME] = { lastSelected: null, original: [], variants: {} };
                                        for (var _i = 0, _a = metadata.original; _i < _a.length; _i++) {
                                            var original = _a[_i];
                                            newRoot._internalMetadata.gltf[NAME].original.push({
                                                mesh: original.mesh,
                                                material: original.material,
                                            });
                                        }
                                        for (var key in metadata.variants) {
                                            if (Object.prototype.hasOwnProperty.call(metadata.variants, key)) {
                                                newRoot._internalMetadata.gltf[NAME].variants[key] = [];
                                                for (var _b = 0, _c = metadata.variants[key]; _b < _c.length; _b++) {
                                                    var variantEntry = _c[_b];
                                                    newRoot._internalMetadata.gltf[NAME].variants[key].push({
                                                        mesh: variantEntry.mesh,
                                                        material: variantEntry.material,
                                                    });
                                                }
                                            }
                                        }
                                        metadata = newRoot._internalMetadata.gltf[NAME];
                                    }
                                    // Relocate
                                    for (var _d = 0, _e = metadata.original; _d < _e.length; _d++) {
                                        var target = _e[_d];
                                        if (target.mesh === babylonMesh) {
                                            target.mesh = newMesh;
                                        }
                                    }
                                    for (var _f = 0, _g = metadata.variants[variant.name]; _f < _g.length; _f++) {
                                        var target = _g[_f];
                                        if (target.mesh === babylonMesh) {
                                            target.mesh = newMesh;
                                        }
                                    }
                                });
                            };
                            for (var mappingVariantIndex = 0; mappingVariantIndex < mapping.variants.length; ++mappingVariantIndex) {
                                _loop_2(mappingVariantIndex);
                            }
                        }));
                    };
                    // For each mapping, look at the variants and make a new entry for them.
                    for (var mappingIndex = 0; mappingIndex < extension.mappings.length; ++mappingIndex) {
                        _loop_1(mappingIndex);
                    }
                }
            }));
            return Promise.all(promises).then(function (_a) {
                var babylonMesh = _a[0];
                return babylonMesh;
            });
        });
    };
    return KHR_materials_variants;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_variants(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_volume.ts":
/*!****************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_volume.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_materials_volume: () => (/* binding */ KHR_materials_volume)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_materials_volume";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
 * @since 5.0.0
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_materials_volume = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_materials_volume(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 173;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
        if (this.enabled) {
            // We need to disable instance usage because the attenuation factor depends on the node scale of each individual mesh
            this._loader._disableInstancedMesh++;
        }
    }
    /** @internal */
    KHR_materials_volume.prototype.dispose = function () {
        if (this.enabled) {
            this._loader._disableInstancedMesh--;
        }
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_materials_volume.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial));
            promises.push(_this._loadVolumePropertiesAsync(extensionContext, material, babylonMaterial, extension));
            return Promise.all(promises).then(function () { });
        });
    };
    KHR_materials_volume.prototype._loadVolumePropertiesAsync = function (context, material, babylonMaterial, extension) {
        if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        // If transparency isn't enabled already, this extension shouldn't do anything.
        // i.e. it requires either the KHR_materials_transmission or KHR_materials_translucency extensions.
        if ((!babylonMaterial.subSurface.isRefractionEnabled && !babylonMaterial.subSurface.isTranslucencyEnabled) || !extension.thicknessFactor) {
            return Promise.resolve();
        }
        // IOR in this extension only affects interior.
        babylonMaterial.subSurface.volumeIndexOfRefraction = babylonMaterial.indexOfRefraction;
        var attenuationDistance = extension.attenuationDistance !== undefined ? extension.attenuationDistance : Number.MAX_VALUE;
        babylonMaterial.subSurface.tintColorAtDistance = attenuationDistance;
        if (extension.attenuationColor !== undefined && extension.attenuationColor.length == 3) {
            babylonMaterial.subSurface.tintColor.copyFromFloats(extension.attenuationColor[0], extension.attenuationColor[1], extension.attenuationColor[2]);
        }
        babylonMaterial.subSurface.minimumThickness = 0.0;
        babylonMaterial.subSurface.maximumThickness = extension.thicknessFactor;
        babylonMaterial.subSurface.useThicknessAsDepth = true;
        if (extension.thicknessTexture) {
            extension.thicknessTexture.nonColorData = true;
            return this._loader.loadTextureInfoAsync("".concat(context, "/thicknessTexture"), extension.thicknessTexture).then(function (texture) {
                babylonMaterial.subSurface.thicknessTexture = texture;
                babylonMaterial.subSurface.useGltfStyleTextures = true;
            });
        }
        else {
            return Promise.resolve();
        }
    };
    return KHR_materials_volume;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_materials_volume(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_mesh_quantization.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_mesh_quantization.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_mesh_quantization: () => (/* binding */ KHR_mesh_quantization)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");

var NAME = "KHR_mesh_quantization";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_mesh_quantization/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_mesh_quantization = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_mesh_quantization(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this.enabled = loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_mesh_quantization.prototype.dispose = function () { };
    return KHR_mesh_quantization;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_mesh_quantization(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_basisu.ts":
/*!**************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_basisu.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_texture_basisu: () => (/* binding */ KHR_texture_basisu)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");

var NAME = "KHR_texture_basisu";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_basisu/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_texture_basisu = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_texture_basisu(loader) {
        /** The name of this extension. */
        this.name = NAME;
        this._loader = loader;
        this.enabled = loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_texture_basisu.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_texture_basisu.prototype._loadTextureAsync = function (context, texture, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.LoadExtensionAsync(context, texture, this.name, function (extensionContext, extension) {
            var sampler = texture.sampler == undefined ? _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.DefaultSampler : _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(context, "/sampler"), _this._loader.gltf.samplers, texture.sampler);
            var image = _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem.Get("".concat(extensionContext, "/source"), _this._loader.gltf.images, extension.source);
            return _this._loader._createTextureAsync(context, sampler, image, function (babylonTexture) {
                assign(babylonTexture);
            }, texture._textureInfo.nonColorData ? { useRGBAIfASTCBC7NotAvailableWhenUASTC: true } : undefined, !texture._textureInfo.nonColorData);
        });
    };
    return KHR_texture_basisu;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_texture_basisu(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_transform.ts":
/*!*****************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_transform.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_texture_transform: () => (/* binding */ KHR_texture_transform)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/Textures/texture */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "KHR_texture_transform";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_texture_transform/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_texture_transform = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_texture_transform(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_texture_transform.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * @internal
     */
    KHR_texture_transform.prototype.loadTextureInfoAsync = function (context, textureInfo, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, textureInfo, this.name, function (extensionContext, extension) {
            return _this._loader.loadTextureInfoAsync(context, textureInfo, function (babylonTexture) {
                if (!(babylonTexture instanceof babylonjs_Materials_Textures_texture__WEBPACK_IMPORTED_MODULE_0__.Texture)) {
                    throw new Error("".concat(extensionContext, ": Texture type not supported"));
                }
                if (extension.offset) {
                    babylonTexture.uOffset = extension.offset[0];
                    babylonTexture.vOffset = extension.offset[1];
                }
                // Always rotate around the origin.
                babylonTexture.uRotationCenter = 0;
                babylonTexture.vRotationCenter = 0;
                if (extension.rotation) {
                    babylonTexture.wAng = -extension.rotation;
                }
                if (extension.scale) {
                    babylonTexture.uScale = extension.scale[0];
                    babylonTexture.vScale = extension.scale[1];
                }
                if (extension.texCoord != undefined) {
                    babylonTexture.coordinatesIndex = extension.texCoord;
                }
                assign(babylonTexture);
            });
        });
    };
    return KHR_texture_transform;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_texture_transform(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_xmp_json_ld.ts":
/*!***********************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/KHR_xmp_json_ld.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KHR_xmp_json_ld: () => (/* binding */ KHR_xmp_json_ld)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");

var NAME = "KHR_xmp_json_ld";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_xmp_json_ld/README.md)
 * @since 5.0.0
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var KHR_xmp_json_ld = /** @class */ (function () {
    /**
     * @internal
     */
    function KHR_xmp_json_ld(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 100;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    KHR_xmp_json_ld.prototype.dispose = function () {
        this._loader = null;
    };
    /**
     * Called after the loader state changes to LOADING.
     */
    KHR_xmp_json_ld.prototype.onLoading = function () {
        var _a, _b, _c;
        if (this._loader.rootBabylonMesh === null) {
            return;
        }
        var xmp_gltf = (_a = this._loader.gltf.extensions) === null || _a === void 0 ? void 0 : _a.KHR_xmp_json_ld;
        var xmp_node = (_c = (_b = this._loader.gltf.asset) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.KHR_xmp_json_ld;
        if (xmp_gltf && xmp_node) {
            var packet = +xmp_node.packet;
            if (xmp_gltf.packets && packet < xmp_gltf.packets.length) {
                this._loader.rootBabylonMesh.metadata = this._loader.rootBabylonMesh.metadata || {};
                this._loader.rootBabylonMesh.metadata.xmp = xmp_gltf.packets[packet];
            }
        }
    };
    return KHR_xmp_json_ld;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new KHR_xmp_json_ld(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_audio_emitter.ts":
/*!**************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_audio_emitter.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSFT_audio_emitter: () => (/* binding */ MSFT_audio_emitter)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Audio/weightedsound */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");






var NAME = "MSFT_audio_emitter";
/**
 * [Specification](https://github.com/najadojo/glTF/blob/MSFT_audio_emitter/extensions/2.0/Vendor/MSFT_audio_emitter/README.md)
 * !!! Experimental Extension Subject to Changes !!!
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var MSFT_audio_emitter = /** @class */ (function () {
    /**
     * @internal
     */
    function MSFT_audio_emitter(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    MSFT_audio_emitter.prototype.dispose = function () {
        this._loader = null;
        this._clips = null;
        this._emitters = null;
    };
    /** @internal */
    MSFT_audio_emitter.prototype.onLoading = function () {
        var extensions = this._loader.gltf.extensions;
        if (extensions && extensions[this.name]) {
            var extension = extensions[this.name];
            this._clips = extension.clips;
            this._emitters = extension.emitters;
            _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(this._clips);
            _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(this._emitters);
        }
    };
    /**
     * @internal
     */
    MSFT_audio_emitter.prototype.loadSceneAsync = function (context, scene) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, scene, this.name, function (extensionContext, extension) {
            var promises = new Array();
            promises.push(_this._loader.loadSceneAsync(context, scene));
            for (var _i = 0, _a = extension.emitters; _i < _a.length; _i++) {
                var emitterIndex = _a[_i];
                var emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(extensionContext, "/emitters"), _this._emitters, emitterIndex);
                if (emitter.refDistance != undefined ||
                    emitter.maxDistance != undefined ||
                    emitter.rolloffFactor != undefined ||
                    emitter.distanceModel != undefined ||
                    emitter.innerAngle != undefined ||
                    emitter.outerAngle != undefined) {
                    throw new Error("".concat(extensionContext, ": Direction or Distance properties are not allowed on emitters attached to a scene"));
                }
                promises.push(_this._loadEmitterAsync("".concat(extensionContext, "/emitters/").concat(emitter.index), emitter));
            }
            return Promise.all(promises).then(function () { });
        });
    };
    /**
     * @internal
     */
    MSFT_audio_emitter.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
            var promises = new Array();
            return _this._loader
                .loadNodeAsync(extensionContext, node, function (babylonMesh) {
                var _loop_1 = function (emitterIndex) {
                    var emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(extensionContext, "/emitters"), _this._emitters, emitterIndex);
                    promises.push(_this._loadEmitterAsync("".concat(extensionContext, "/emitters/").concat(emitter.index), emitter).then(function () {
                        for (var _i = 0, _a = emitter._babylonSounds; _i < _a.length; _i++) {
                            var sound = _a[_i];
                            sound.attachToMesh(babylonMesh);
                            if (emitter.innerAngle != undefined || emitter.outerAngle != undefined) {
                                sound.setLocalDirectionToMesh(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector3.Forward());
                                sound.setDirectionalCone(2 * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.innerAngle == undefined ? Math.PI : emitter.innerAngle), 2 * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.outerAngle == undefined ? Math.PI : emitter.outerAngle), 0);
                            }
                        }
                    }));
                };
                for (var _i = 0, _a = extension.emitters; _i < _a.length; _i++) {
                    var emitterIndex = _a[_i];
                    _loop_1(emitterIndex);
                }
                assign(babylonMesh);
            })
                .then(function (babylonMesh) {
                return Promise.all(promises).then(function () {
                    return babylonMesh;
                });
            });
        });
    };
    /**
     * @internal
     */
    MSFT_audio_emitter.prototype.loadAnimationAsync = function (context, animation) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, animation, this.name, function (extensionContext, extension) {
            return _this._loader.loadAnimationAsync(context, animation).then(function (babylonAnimationGroup) {
                var promises = new Array();
                _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Assign(extension.events);
                for (var _i = 0, _a = extension.events; _i < _a.length; _i++) {
                    var event_1 = _a[_i];
                    promises.push(_this._loadAnimationEventAsync("".concat(extensionContext, "/events/").concat(event_1.index), context, animation, event_1, babylonAnimationGroup));
                }
                return Promise.all(promises).then(function () {
                    return babylonAnimationGroup;
                });
            });
        });
    };
    MSFT_audio_emitter.prototype._loadClipAsync = function (context, clip) {
        if (clip._objectURL) {
            return clip._objectURL;
        }
        var promise;
        if (clip.uri) {
            promise = this._loader.loadUriAsync(context, clip, clip.uri);
        }
        else {
            var bufferView = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(context, "/bufferView"), this._loader.gltf.bufferViews, clip.bufferView);
            promise = this._loader.loadBufferViewAsync("/bufferViews/".concat(bufferView.index), bufferView);
        }
        clip._objectURL = promise.then(function (data) {
            return URL.createObjectURL(new Blob([data], { type: clip.mimeType }));
        });
        return clip._objectURL;
    };
    MSFT_audio_emitter.prototype._loadEmitterAsync = function (context, emitter) {
        var _this = this;
        emitter._babylonSounds = emitter._babylonSounds || [];
        if (!emitter._babylonData) {
            var clipPromises = new Array();
            var name_1 = emitter.name || "emitter".concat(emitter.index);
            var options_1 = {
                loop: false,
                autoplay: false,
                volume: emitter.volume == undefined ? 1 : emitter.volume,
            };
            var _loop_2 = function (i) {
                var clipContext = "/extensions/".concat(this_1.name, "/clips");
                var clip = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get(clipContext, this_1._clips, emitter.clips[i].clip);
                clipPromises.push(this_1._loadClipAsync("".concat(clipContext, "/").concat(emitter.clips[i].clip), clip).then(function (objectURL) {
                    var sound = (emitter._babylonSounds[i] = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Sound(name_1, objectURL, _this._loader.babylonScene, null, options_1));
                    sound.refDistance = emitter.refDistance || 1;
                    sound.maxDistance = emitter.maxDistance || 256;
                    sound.rolloffFactor = emitter.rolloffFactor || 1;
                    sound.distanceModel = emitter.distanceModel || "exponential";
                }));
            };
            var this_1 = this;
            for (var i = 0; i < emitter.clips.length; i++) {
                _loop_2(i);
            }
            var promise = Promise.all(clipPromises).then(function () {
                var weights = emitter.clips.map(function (clip) {
                    return clip.weight || 1;
                });
                var weightedSound = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.WeightedSound(emitter.loop || false, emitter._babylonSounds, weights);
                if (emitter.innerAngle) {
                    weightedSound.directionalConeInnerAngle = 2 * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.innerAngle);
                }
                if (emitter.outerAngle) {
                    weightedSound.directionalConeOuterAngle = 2 * babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.ToDegrees(emitter.outerAngle);
                }
                if (emitter.volume) {
                    weightedSound.volume = emitter.volume;
                }
                emitter._babylonData.sound = weightedSound;
            });
            emitter._babylonData = {
                loaded: promise,
            };
        }
        return emitter._babylonData.loaded;
    };
    MSFT_audio_emitter.prototype._getEventAction = function (context, sound, action, time, startOffset) {
        switch (action) {
            case "play" /* IMSFTAudioEmitter_AnimationEventAction.play */: {
                return function (currentFrame) {
                    var frameOffset = (startOffset || 0) + (currentFrame - time);
                    sound.play(frameOffset);
                };
            }
            case "stop" /* IMSFTAudioEmitter_AnimationEventAction.stop */: {
                return function () {
                    sound.stop();
                };
            }
            case "pause" /* IMSFTAudioEmitter_AnimationEventAction.pause */: {
                return function () {
                    sound.pause();
                };
            }
            default: {
                throw new Error("".concat(context, ": Unsupported action ").concat(action));
            }
        }
    };
    MSFT_audio_emitter.prototype._loadAnimationEventAsync = function (context, animationContext, animation, event, babylonAnimationGroup) {
        var _this = this;
        if (babylonAnimationGroup.targetedAnimations.length == 0) {
            return Promise.resolve();
        }
        var babylonAnimation = babylonAnimationGroup.targetedAnimations[0];
        var emitterIndex = event.emitter;
        var emitter = _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("/extensions/".concat(this.name, "/emitters"), this._emitters, emitterIndex);
        return this._loadEmitterAsync(context, emitter).then(function () {
            var sound = emitter._babylonData.sound;
            if (sound) {
                var babylonAnimationEvent = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AnimationEvent(event.time, _this._getEventAction(context, sound, event.action, event.time, event.startOffset));
                babylonAnimation.animation.addEvent(babylonAnimationEvent);
                // Make sure all started audio stops when this animation is terminated.
                babylonAnimationGroup.onAnimationGroupEndObservable.add(function () {
                    sound.stop();
                });
                babylonAnimationGroup.onAnimationGroupPauseObservable.add(function () {
                    sound.pause();
                });
            }
        });
    };
    return MSFT_audio_emitter;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new MSFT_audio_emitter(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_lod.ts":
/*!****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_lod.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSFT_lod: () => (/* binding */ MSFT_lod)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/deferred */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");



var NAME = "MSFT_lod";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/MSFT_lod/README.md)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
var MSFT_lod = /** @class */ (function () {
    /**
     * @internal
     */
    function MSFT_lod(loader) {
        /**
         * The name of this extension.
         */
        this.name = NAME;
        /**
         * Defines a number that determines the order the extensions are applied.
         */
        this.order = 100;
        /**
         * Maximum number of LODs to load, starting from the lowest LOD.
         */
        this.maxLODsToLoad = 10;
        /**
         * Observable raised when all node LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        this.onNodeLODsLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when all material LODs of one level are loaded.
         * The event data is the index of the loaded LOD starting from zero.
         * Dispose the loader to cancel the loading of the next level of LODs.
         */
        this.onMaterialLODsLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        this._bufferLODs = new Array();
        this._nodeIndexLOD = null;
        this._nodeSignalLODs = new Array();
        this._nodePromiseLODs = new Array();
        this._nodeBufferLODs = new Array();
        this._materialIndexLOD = null;
        this._materialSignalLODs = new Array();
        this._materialPromiseLODs = new Array();
        this._materialBufferLODs = new Array();
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    MSFT_lod.prototype.dispose = function () {
        this._loader = null;
        this._nodeIndexLOD = null;
        this._nodeSignalLODs.length = 0;
        this._nodePromiseLODs.length = 0;
        this._nodeBufferLODs.length = 0;
        this._materialIndexLOD = null;
        this._materialSignalLODs.length = 0;
        this._materialPromiseLODs.length = 0;
        this._materialBufferLODs.length = 0;
        this.onMaterialLODsLoadedObservable.clear();
        this.onNodeLODsLoadedObservable.clear();
    };
    /** @internal */
    MSFT_lod.prototype.onReady = function () {
        var _this = this;
        var _loop_1 = function (indexLOD) {
            var promise = Promise.all(this_1._nodePromiseLODs[indexLOD]).then(function () {
                if (indexLOD !== 0) {
                    _this._loader.endPerformanceCounter("Node LOD ".concat(indexLOD));
                    _this._loader.log("Loaded node LOD ".concat(indexLOD));
                }
                _this.onNodeLODsLoadedObservable.notifyObservers(indexLOD);
                if (indexLOD !== _this._nodePromiseLODs.length - 1) {
                    _this._loader.startPerformanceCounter("Node LOD ".concat(indexLOD + 1));
                    _this._loadBufferLOD(_this._nodeBufferLODs, indexLOD + 1);
                    if (_this._nodeSignalLODs[indexLOD]) {
                        _this._nodeSignalLODs[indexLOD].resolve();
                    }
                }
            });
            this_1._loader._completePromises.push(promise);
        };
        var this_1 = this;
        for (var indexLOD = 0; indexLOD < this._nodePromiseLODs.length; indexLOD++) {
            _loop_1(indexLOD);
        }
        var _loop_2 = function (indexLOD) {
            var promise = Promise.all(this_2._materialPromiseLODs[indexLOD]).then(function () {
                if (indexLOD !== 0) {
                    _this._loader.endPerformanceCounter("Material LOD ".concat(indexLOD));
                    _this._loader.log("Loaded material LOD ".concat(indexLOD));
                }
                _this.onMaterialLODsLoadedObservable.notifyObservers(indexLOD);
                if (indexLOD !== _this._materialPromiseLODs.length - 1) {
                    _this._loader.startPerformanceCounter("Material LOD ".concat(indexLOD + 1));
                    _this._loadBufferLOD(_this._materialBufferLODs, indexLOD + 1);
                    if (_this._materialSignalLODs[indexLOD]) {
                        _this._materialSignalLODs[indexLOD].resolve();
                    }
                }
            });
            this_2._loader._completePromises.push(promise);
        };
        var this_2 = this;
        for (var indexLOD = 0; indexLOD < this._materialPromiseLODs.length; indexLOD++) {
            _loop_2(indexLOD);
        }
    };
    /**
     * @internal
     */
    MSFT_lod.prototype.loadSceneAsync = function (context, scene) {
        var promise = this._loader.loadSceneAsync(context, scene);
        this._loadBufferLOD(this._bufferLODs, 0);
        return promise;
    };
    /**
     * @internal
     */
    MSFT_lod.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, node, this.name, function (extensionContext, extension) {
            var firstPromise;
            var nodeLODs = _this._getLODs(extensionContext, node, _this._loader.gltf.nodes, extension.ids);
            _this._loader.logOpen("".concat(extensionContext));
            var _loop_3 = function (indexLOD) {
                var nodeLOD = nodeLODs[indexLOD];
                if (indexLOD !== 0) {
                    _this._nodeIndexLOD = indexLOD;
                    _this._nodeSignalLODs[indexLOD] = _this._nodeSignalLODs[indexLOD] || new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
                }
                var assignWrap = function (babylonTransformNode) {
                    assign(babylonTransformNode);
                    babylonTransformNode.setEnabled(false);
                };
                var promise = _this._loader.loadNodeAsync("/nodes/".concat(nodeLOD.index), nodeLOD, assignWrap).then(function (babylonMesh) {
                    if (indexLOD !== 0) {
                        // TODO: should not rely on _babylonTransformNode
                        var previousNodeLOD = nodeLODs[indexLOD - 1];
                        if (previousNodeLOD._babylonTransformNode) {
                            _this._disposeTransformNode(previousNodeLOD._babylonTransformNode);
                            delete previousNodeLOD._babylonTransformNode;
                        }
                    }
                    babylonMesh.setEnabled(true);
                    return babylonMesh;
                });
                _this._nodePromiseLODs[indexLOD] = _this._nodePromiseLODs[indexLOD] || [];
                if (indexLOD === 0) {
                    firstPromise = promise;
                }
                else {
                    _this._nodeIndexLOD = null;
                    _this._nodePromiseLODs[indexLOD].push(promise);
                }
            };
            for (var indexLOD = 0; indexLOD < nodeLODs.length; indexLOD++) {
                _loop_3(indexLOD);
            }
            _this._loader.logClose();
            return firstPromise;
        });
    };
    /**
     * @internal
     */
    MSFT_lod.prototype._loadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
        var _this = this;
        // Don't load material LODs if already loading a node LOD.
        if (this._nodeIndexLOD) {
            return null;
        }
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtensionAsync(context, material, this.name, function (extensionContext, extension) {
            var firstPromise;
            var materialLODs = _this._getLODs(extensionContext, material, _this._loader.gltf.materials, extension.ids);
            _this._loader.logOpen("".concat(extensionContext));
            var _loop_4 = function (indexLOD) {
                var materialLOD = materialLODs[indexLOD];
                if (indexLOD !== 0) {
                    _this._materialIndexLOD = indexLOD;
                }
                var promise = _this._loader
                    ._loadMaterialAsync("/materials/".concat(materialLOD.index), materialLOD, babylonMesh, babylonDrawMode, function (babylonMaterial) {
                    if (indexLOD === 0) {
                        assign(babylonMaterial);
                    }
                })
                    .then(function (babylonMaterial) {
                    if (indexLOD !== 0) {
                        assign(babylonMaterial);
                        // TODO: should not rely on _data
                        var previousDataLOD = materialLODs[indexLOD - 1]._data;
                        if (previousDataLOD[babylonDrawMode]) {
                            _this._disposeMaterials([previousDataLOD[babylonDrawMode].babylonMaterial]);
                            delete previousDataLOD[babylonDrawMode];
                        }
                    }
                    return babylonMaterial;
                });
                _this._materialPromiseLODs[indexLOD] = _this._materialPromiseLODs[indexLOD] || [];
                if (indexLOD === 0) {
                    firstPromise = promise;
                }
                else {
                    _this._materialIndexLOD = null;
                    _this._materialPromiseLODs[indexLOD].push(promise);
                }
            };
            for (var indexLOD = 0; indexLOD < materialLODs.length; indexLOD++) {
                _loop_4(indexLOD);
            }
            _this._loader.logClose();
            return firstPromise;
        });
    };
    /**
     * @internal
     */
    MSFT_lod.prototype._loadUriAsync = function (context, property, uri) {
        var _this = this;
        // Defer the loading of uris if loading a node or material LOD.
        if (this._nodeIndexLOD !== null) {
            this._loader.log("deferred");
            var previousIndexLOD = this._nodeIndexLOD - 1;
            this._nodeSignalLODs[previousIndexLOD] = this._nodeSignalLODs[previousIndexLOD] || new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
            return this._nodeSignalLODs[this._nodeIndexLOD - 1].promise.then(function () {
                return _this._loader.loadUriAsync(context, property, uri);
            });
        }
        else if (this._materialIndexLOD !== null) {
            this._loader.log("deferred");
            var previousIndexLOD = this._materialIndexLOD - 1;
            this._materialSignalLODs[previousIndexLOD] = this._materialSignalLODs[previousIndexLOD] || new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred();
            return this._materialSignalLODs[previousIndexLOD].promise.then(function () {
                return _this._loader.loadUriAsync(context, property, uri);
            });
        }
        return null;
    };
    /**
     * @internal
     */
    MSFT_lod.prototype.loadBufferAsync = function (context, buffer, byteOffset, byteLength) {
        if (this._loader.parent.useRangeRequests && !buffer.uri) {
            if (!this._loader.bin) {
                throw new Error("".concat(context, ": Uri is missing or the binary glTF is missing its binary chunk"));
            }
            var loadAsync = function (bufferLODs, indexLOD) {
                var start = byteOffset;
                var end = start + byteLength - 1;
                var bufferLOD = bufferLODs[indexLOD];
                if (bufferLOD) {
                    bufferLOD.start = Math.min(bufferLOD.start, start);
                    bufferLOD.end = Math.max(bufferLOD.end, end);
                }
                else {
                    bufferLOD = { start: start, end: end, loaded: new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Deferred() };
                    bufferLODs[indexLOD] = bufferLOD;
                }
                return bufferLOD.loaded.promise.then(function (data) {
                    return new Uint8Array(data.buffer, data.byteOffset + byteOffset - bufferLOD.start, byteLength);
                });
            };
            this._loader.log("deferred");
            if (this._nodeIndexLOD !== null) {
                return loadAsync(this._nodeBufferLODs, this._nodeIndexLOD);
            }
            else if (this._materialIndexLOD !== null) {
                return loadAsync(this._materialBufferLODs, this._materialIndexLOD);
            }
            else {
                return loadAsync(this._bufferLODs, 0);
            }
        }
        return null;
    };
    MSFT_lod.prototype._loadBufferLOD = function (bufferLODs, indexLOD) {
        var bufferLOD = bufferLODs[indexLOD];
        if (bufferLOD) {
            this._loader.log("Loading buffer range [".concat(bufferLOD.start, "-").concat(bufferLOD.end, "]"));
            this._loader.bin.readAsync(bufferLOD.start, bufferLOD.end - bufferLOD.start + 1).then(function (data) {
                bufferLOD.loaded.resolve(data);
            }, function (error) {
                bufferLOD.loaded.reject(error);
            });
        }
    };
    /**
     * Gets an array of LOD properties from lowest to highest.
     * @param context
     * @param property
     * @param array
     * @param ids
     */
    MSFT_lod.prototype._getLODs = function (context, property, array, ids) {
        if (this.maxLODsToLoad <= 0) {
            throw new Error("maxLODsToLoad must be greater than zero");
        }
        var properties = new Array();
        for (var i = ids.length - 1; i >= 0; i--) {
            properties.push(_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.ArrayItem.Get("".concat(context, "/ids/").concat(ids[i]), array, ids[i]));
            if (properties.length === this.maxLODsToLoad) {
                return properties;
            }
        }
        properties.push(property);
        return properties;
    };
    MSFT_lod.prototype._disposeTransformNode = function (babylonTransformNode) {
        var _this = this;
        var babylonMaterials = new Array();
        var babylonMaterial = babylonTransformNode.material;
        if (babylonMaterial) {
            babylonMaterials.push(babylonMaterial);
        }
        for (var _i = 0, _a = babylonTransformNode.getChildMeshes(); _i < _a.length; _i++) {
            var babylonMesh = _a[_i];
            if (babylonMesh.material) {
                babylonMaterials.push(babylonMesh.material);
            }
        }
        babylonTransformNode.dispose();
        var babylonMaterialsToDispose = babylonMaterials.filter(function (babylonMaterial) { return _this._loader.babylonScene.meshes.every(function (mesh) { return mesh.material != babylonMaterial; }); });
        this._disposeMaterials(babylonMaterialsToDispose);
    };
    MSFT_lod.prototype._disposeMaterials = function (babylonMaterials) {
        var babylonTextures = {};
        for (var _i = 0, babylonMaterials_1 = babylonMaterials; _i < babylonMaterials_1.length; _i++) {
            var babylonMaterial = babylonMaterials_1[_i];
            for (var _a = 0, _b = babylonMaterial.getActiveTextures(); _a < _b.length; _a++) {
                var babylonTexture = _b[_a];
                babylonTextures[babylonTexture.uniqueId] = babylonTexture;
            }
            babylonMaterial.dispose();
        }
        for (var uniqueId in babylonTextures) {
            for (var _c = 0, _d = this._loader.babylonScene.materials; _c < _d.length; _c++) {
                var babylonMaterial = _d[_c];
                if (babylonMaterial.hasTexture(babylonTextures[uniqueId])) {
                    delete babylonTextures[uniqueId];
                }
            }
        }
        for (var uniqueId in babylonTextures) {
            babylonTextures[uniqueId].dispose();
        }
    };
    return MSFT_lod;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new MSFT_lod(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_minecraftMesh.ts":
/*!**************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_minecraftMesh.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSFT_minecraftMesh: () => (/* binding */ MSFT_minecraftMesh)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "MSFT_minecraftMesh";
/** @internal */
// eslint-disable-next-line @typescript-eslint/naming-convention
var MSFT_minecraftMesh = /** @class */ (function () {
    /** @internal */
    function MSFT_minecraftMesh(loader) {
        /** @internal */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    MSFT_minecraftMesh.prototype.dispose = function () {
        this._loader = null;
    };
    /** @internal */
    MSFT_minecraftMesh.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtraAsync(context, material, this.name, function (extraContext, extra) {
            if (extra) {
                if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                    throw new Error("".concat(extraContext, ": Material type not supported"));
                }
                var promise = _this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);
                if (babylonMaterial.needAlphaBlending()) {
                    babylonMaterial.forceDepthWrite = true;
                    babylonMaterial.separateCullingPass = true;
                }
                babylonMaterial.backFaceCulling = babylonMaterial.forceDepthWrite;
                babylonMaterial.twoSidedLighting = true;
                return promise;
            }
            return null;
        });
    };
    return MSFT_minecraftMesh;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new MSFT_minecraftMesh(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_sRGBFactors.ts":
/*!************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_sRGBFactors.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MSFT_sRGBFactors: () => (/* binding */ MSFT_sRGBFactors)
/* harmony export */ });
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/PBR/pbrMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");


var NAME = "MSFT_sRGBFactors";
/** @internal */
// eslint-disable-next-line @typescript-eslint/naming-convention
var MSFT_sRGBFactors = /** @class */ (function () {
    /** @internal */
    function MSFT_sRGBFactors(loader) {
        /** @internal */
        this.name = NAME;
        this._loader = loader;
        this.enabled = this._loader.isExtensionUsed(NAME);
    }
    /** @internal */
    MSFT_sRGBFactors.prototype.dispose = function () {
        this._loader = null;
    };
    /** @internal */
    MSFT_sRGBFactors.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var _this = this;
        return _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.LoadExtraAsync(context, material, this.name, function (extraContext, extra) {
            if (extra) {
                if (!(babylonMaterial instanceof babylonjs_Materials_PBR_pbrMaterial__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
                    throw new Error("".concat(extraContext, ": Material type not supported"));
                }
                var promise = _this._loader.loadMaterialPropertiesAsync(context, material, babylonMaterial);
                var useExactSrgbConversions = babylonMaterial.getScene().getEngine().useExactSrgbConversions;
                if (!babylonMaterial.albedoTexture) {
                    babylonMaterial.albedoColor.toLinearSpaceToRef(babylonMaterial.albedoColor, useExactSrgbConversions);
                }
                if (!babylonMaterial.reflectivityTexture) {
                    babylonMaterial.reflectivityColor.toLinearSpaceToRef(babylonMaterial.reflectivityColor, useExactSrgbConversions);
                }
                return promise;
            }
            return null;
        });
    };
    return MSFT_sRGBFactors;
}());

_glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader.RegisterExtension(NAME, function (loader) { return new MSFT_sRGBFactors(loader); });


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/Extensions/index.ts":
/*!*************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/Extensions/index.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXT_lights_image_based: () => (/* reexport safe */ _EXT_lights_image_based__WEBPACK_IMPORTED_MODULE_0__.EXT_lights_image_based),
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_1__.EXT_mesh_gpu_instancing),
/* harmony export */   EXT_meshopt_compression: () => (/* reexport safe */ _EXT_meshopt_compression__WEBPACK_IMPORTED_MODULE_2__.EXT_meshopt_compression),
/* harmony export */   EXT_texture_webp: () => (/* reexport safe */ _EXT_texture_webp__WEBPACK_IMPORTED_MODULE_3__.EXT_texture_webp),
/* harmony export */   ExtrasAsMetadata: () => (/* reexport safe */ _ExtrasAsMetadata__WEBPACK_IMPORTED_MODULE_28__.ExtrasAsMetadata),
/* harmony export */   KHR_animation_pointer: () => (/* reexport safe */ _KHR_animation_pointer__WEBPACK_IMPORTED_MODULE_23__.KHR_animation_pointer),
/* harmony export */   KHR_draco_mesh_compression: () => (/* reexport safe */ _KHR_draco_mesh_compression__WEBPACK_IMPORTED_MODULE_4__.KHR_draco_mesh_compression),
/* harmony export */   KHR_lights: () => (/* reexport safe */ _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_5__.KHR_lights),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_10__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_8__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_11__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_14__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_9__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_pbrSpecularGlossiness: () => (/* reexport safe */ _KHR_materials_pbrSpecularGlossiness__WEBPACK_IMPORTED_MODULE_6__.KHR_materials_pbrSpecularGlossiness),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_12__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_13__.KHR_materials_specular),
/* harmony export */   KHR_materials_translucency: () => (/* reexport safe */ _KHR_materials_translucency__WEBPACK_IMPORTED_MODULE_17__.KHR_materials_translucency),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_16__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_7__.KHR_materials_unlit),
/* harmony export */   KHR_materials_variants: () => (/* reexport safe */ _KHR_materials_variants__WEBPACK_IMPORTED_MODULE_15__.KHR_materials_variants),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_18__.KHR_materials_volume),
/* harmony export */   KHR_mesh_quantization: () => (/* reexport safe */ _KHR_mesh_quantization__WEBPACK_IMPORTED_MODULE_19__.KHR_mesh_quantization),
/* harmony export */   KHR_texture_basisu: () => (/* reexport safe */ _KHR_texture_basisu__WEBPACK_IMPORTED_MODULE_20__.KHR_texture_basisu),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_21__.KHR_texture_transform),
/* harmony export */   KHR_xmp_json_ld: () => (/* reexport safe */ _KHR_xmp_json_ld__WEBPACK_IMPORTED_MODULE_22__.KHR_xmp_json_ld),
/* harmony export */   MSFT_audio_emitter: () => (/* reexport safe */ _MSFT_audio_emitter__WEBPACK_IMPORTED_MODULE_24__.MSFT_audio_emitter),
/* harmony export */   MSFT_lod: () => (/* reexport safe */ _MSFT_lod__WEBPACK_IMPORTED_MODULE_25__.MSFT_lod),
/* harmony export */   MSFT_minecraftMesh: () => (/* reexport safe */ _MSFT_minecraftMesh__WEBPACK_IMPORTED_MODULE_26__.MSFT_minecraftMesh),
/* harmony export */   MSFT_sRGBFactors: () => (/* reexport safe */ _MSFT_sRGBFactors__WEBPACK_IMPORTED_MODULE_27__.MSFT_sRGBFactors)
/* harmony export */ });
/* harmony import */ var _EXT_lights_image_based__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EXT_lights_image_based */ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_lights_image_based.ts");
/* harmony import */ var _EXT_mesh_gpu_instancing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EXT_mesh_gpu_instancing */ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_mesh_gpu_instancing.ts");
/* harmony import */ var _EXT_meshopt_compression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EXT_meshopt_compression */ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_meshopt_compression.ts");
/* harmony import */ var _EXT_texture_webp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EXT_texture_webp */ "../../../dev/loaders/src/glTF/2.0/Extensions/EXT_texture_webp.ts");
/* harmony import */ var _KHR_draco_mesh_compression__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KHR_draco_mesh_compression */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_draco_mesh_compression.ts");
/* harmony import */ var _KHR_lights_punctual__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KHR_lights_punctual */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_lights_punctual.ts");
/* harmony import */ var _KHR_materials_pbrSpecularGlossiness__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./KHR_materials_pbrSpecularGlossiness */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_pbrSpecularGlossiness.ts");
/* harmony import */ var _KHR_materials_unlit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./KHR_materials_unlit */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_unlit.ts");
/* harmony import */ var _KHR_materials_clearcoat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./KHR_materials_clearcoat */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_clearcoat.ts");
/* harmony import */ var _KHR_materials_iridescence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KHR_materials_iridescence */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_iridescence.ts");
/* harmony import */ var _KHR_materials_anisotropy__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./KHR_materials_anisotropy */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_anisotropy.ts");
/* harmony import */ var _KHR_materials_emissive_strength__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./KHR_materials_emissive_strength */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_emissive_strength.ts");
/* harmony import */ var _KHR_materials_sheen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./KHR_materials_sheen */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_sheen.ts");
/* harmony import */ var _KHR_materials_specular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./KHR_materials_specular */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_specular.ts");
/* harmony import */ var _KHR_materials_ior__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./KHR_materials_ior */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_ior.ts");
/* harmony import */ var _KHR_materials_variants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./KHR_materials_variants */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_variants.ts");
/* harmony import */ var _KHR_materials_transmission__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./KHR_materials_transmission */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_transmission.ts");
/* harmony import */ var _KHR_materials_translucency__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./KHR_materials_translucency */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_translucency.ts");
/* harmony import */ var _KHR_materials_volume__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./KHR_materials_volume */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_materials_volume.ts");
/* harmony import */ var _KHR_mesh_quantization__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./KHR_mesh_quantization */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_mesh_quantization.ts");
/* harmony import */ var _KHR_texture_basisu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./KHR_texture_basisu */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_basisu.ts");
/* harmony import */ var _KHR_texture_transform__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./KHR_texture_transform */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_texture_transform.ts");
/* harmony import */ var _KHR_xmp_json_ld__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./KHR_xmp_json_ld */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_xmp_json_ld.ts");
/* harmony import */ var _KHR_animation_pointer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./KHR_animation_pointer */ "../../../dev/loaders/src/glTF/2.0/Extensions/KHR_animation_pointer.ts");
/* harmony import */ var _MSFT_audio_emitter__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./MSFT_audio_emitter */ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_audio_emitter.ts");
/* harmony import */ var _MSFT_lod__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./MSFT_lod */ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_lod.ts");
/* harmony import */ var _MSFT_minecraftMesh__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./MSFT_minecraftMesh */ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_minecraftMesh.ts");
/* harmony import */ var _MSFT_sRGBFactors__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./MSFT_sRGBFactors */ "../../../dev/loaders/src/glTF/2.0/Extensions/MSFT_sRGBFactors.ts");
/* harmony import */ var _ExtrasAsMetadata__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./ExtrasAsMetadata */ "../../../dev/loaders/src/glTF/2.0/Extensions/ExtrasAsMetadata.ts");































/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/glTFLoader.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayItem: () => (/* binding */ ArrayItem),
/* harmony export */   GLTFLoader: () => (/* binding */ GLTFLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Culling/boundingInfo */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glTFFileLoader */ "../../../dev/loaders/src/glTF/glTFFileLoader.ts");
/* harmony import */ var _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderAnimation */ "../../../dev/loaders/src/glTF/2.0/glTFLoaderAnimation.ts");
























// https://stackoverflow.com/a/48218209
function mergeDeep() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var isObject = function (obj) { return obj && typeof obj === "object"; };
    return objects.reduce(function (prev, obj) {
        Object.keys(obj).forEach(function (key) {
            var pVal = prev[key];
            var oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat.apply(pVal, oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
}
/**
 * Helper class for working with arrays when loading the glTF asset
 */
var ArrayItem = /** @class */ (function () {
    function ArrayItem() {
    }
    /**
     * Gets an item from the given array.
     * @param context The context when loading the asset
     * @param array The array to get the item from
     * @param index The index to the array
     * @returns The array item
     */
    ArrayItem.Get = function (context, array, index) {
        if (!array || index == undefined || !array[index]) {
            throw new Error("".concat(context, ": Failed to find index (").concat(index, ")"));
        }
        return array[index];
    };
    /**
     * Gets an item from the given array or returns null if not available.
     * @param array The array to get the item from
     * @param index The index to the array
     * @returns The array item or null
     */
    ArrayItem.TryGet = function (array, index) {
        if (!array || index == undefined || !array[index]) {
            return null;
        }
        return array[index];
    };
    /**
     * Assign an `index` field to each item of the given array.
     * @param array The array of items
     */
    ArrayItem.Assign = function (array) {
        if (array) {
            for (var index = 0; index < array.length; index++) {
                array[index].index = index;
            }
        }
    };
    return ArrayItem;
}());

/**
 * The glTF 2.0 loader
 */
var GLTFLoader = /** @class */ (function () {
    /**
     * @internal
     */
    function GLTFLoader(parent) {
        /** @internal */
        this._completePromises = new Array();
        /** @internal */
        this._assetContainer = null;
        /** Storage */
        this._babylonLights = [];
        /** @internal */
        this._disableInstancedMesh = 0;
        this._extensions = new Array();
        this._disposed = false;
        this._rootUrl = null;
        this._fileName = null;
        this._uniqueRootUrl = null;
        this._bin = null;
        this._rootBabylonMesh = null;
        this._defaultBabylonMaterialData = {};
        this._postSceneLoadActions = new Array();
        this._parent = parent;
    }
    /**
     * Registers a loader extension.
     * @param name The name of the loader extension.
     * @param factory The factory function that creates the loader extension.
     */
    GLTFLoader.RegisterExtension = function (name, factory) {
        if (GLTFLoader.UnregisterExtension(name)) {
            babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Extension with the name '".concat(name, "' already exists"));
        }
        GLTFLoader._RegisteredExtensions[name] = {
            factory: factory,
        };
    };
    /**
     * Unregisters a loader extension.
     * @param name The name of the loader extension.
     * @returns A boolean indicating whether the extension has been unregistered
     */
    GLTFLoader.UnregisterExtension = function (name) {
        if (!GLTFLoader._RegisteredExtensions[name]) {
            return false;
        }
        delete GLTFLoader._RegisteredExtensions[name];
        return true;
    };
    Object.defineProperty(GLTFLoader.prototype, "gltf", {
        /**
         * The object that represents the glTF JSON.
         */
        get: function () {
            if (!this._gltf) {
                throw new Error("glTF JSON is not available");
            }
            return this._gltf;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFLoader.prototype, "bin", {
        /**
         * The BIN chunk of a binary glTF.
         */
        get: function () {
            return this._bin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFLoader.prototype, "parent", {
        /**
         * The parent file loader.
         */
        get: function () {
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFLoader.prototype, "babylonScene", {
        /**
         * The Babylon scene when loading the asset.
         */
        get: function () {
            if (!this._babylonScene) {
                throw new Error("Scene is not available");
            }
            return this._babylonScene;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFLoader.prototype, "rootBabylonMesh", {
        /**
         * The root Babylon mesh when loading the asset.
         */
        get: function () {
            return this._rootBabylonMesh;
        },
        enumerable: false,
        configurable: true
    });
    /** @internal */
    GLTFLoader.prototype.dispose = function () {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._completePromises.length = 0;
        this._extensions.forEach(function (extension) { return extension.dispose && extension.dispose(); });
        this._extensions.length = 0;
        this._gltf = null; // TODO
        this._bin = null;
        this._babylonScene = null; // TODO
        this._rootBabylonMesh = null;
        this._defaultBabylonMaterialData = {};
        this._postSceneLoadActions.length = 0;
        this._parent.dispose();
    };
    /**
     * @internal
     */
    GLTFLoader.prototype.importMeshAsync = function (meshesNames, scene, container, data, rootUrl, onProgress, fileName) {
        var _this = this;
        if (fileName === void 0) { fileName = ""; }
        return Promise.resolve().then(function () {
            _this._babylonScene = scene;
            _this._assetContainer = container;
            _this._loadData(data);
            var nodes = null;
            if (meshesNames) {
                var nodeMap_1 = {};
                if (_this._gltf.nodes) {
                    for (var _i = 0, _a = _this._gltf.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (node.name) {
                            nodeMap_1[node.name] = node.index;
                        }
                    }
                }
                var names = meshesNames instanceof Array ? meshesNames : [meshesNames];
                nodes = names.map(function (name) {
                    var node = nodeMap_1[name];
                    if (node === undefined) {
                        throw new Error("Failed to find node '".concat(name, "'"));
                    }
                    return node;
                });
            }
            return _this._loadAsync(rootUrl, fileName, nodes, function () {
                return {
                    meshes: _this._getMeshes(),
                    particleSystems: [],
                    skeletons: _this._getSkeletons(),
                    animationGroups: _this._getAnimationGroups(),
                    lights: _this._babylonLights,
                    transformNodes: _this._getTransformNodes(),
                    geometries: _this._getGeometries(),
                };
            });
        });
    };
    /**
     * @internal
     */
    GLTFLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        if (fileName === void 0) { fileName = ""; }
        return Promise.resolve().then(function () {
            _this._babylonScene = scene;
            _this._loadData(data);
            return _this._loadAsync(rootUrl, fileName, null, function () { return undefined; });
        });
    };
    GLTFLoader.prototype._loadAsync = function (rootUrl, fileName, nodes, resultFunc) {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            _this._rootUrl = rootUrl;
            _this._uniqueRootUrl = !rootUrl.startsWith("file:") && fileName ? rootUrl : "".concat(rootUrl).concat(Date.now(), "/");
            _this._fileName = fileName;
            _this._loadExtensions();
            _this._checkExtensions();
            var loadingToReadyCounterName = "".concat(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING], " => ").concat(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.READY]);
            var loadingToCompleteCounterName = "".concat(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING], " => ").concat(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState[_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.COMPLETE]);
            _this._parent._startPerformanceCounter(loadingToReadyCounterName);
            _this._parent._startPerformanceCounter(loadingToCompleteCounterName);
            _this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.LOADING);
            _this._extensionsOnLoading();
            var promises = new Array();
            // Block the marking of materials dirty until the scene is loaded.
            var oldBlockMaterialDirtyMechanism = _this._babylonScene.blockMaterialDirtyMechanism;
            _this._babylonScene.blockMaterialDirtyMechanism = true;
            if (!_this.parent.loadOnlyMaterials) {
                if (nodes) {
                    promises.push(_this.loadSceneAsync("/nodes", { nodes: nodes, index: -1 }));
                }
                else if (_this._gltf.scene != undefined || (_this._gltf.scenes && _this._gltf.scenes[0])) {
                    var scene = ArrayItem.Get("/scene", _this._gltf.scenes, _this._gltf.scene || 0);
                    promises.push(_this.loadSceneAsync("/scenes/".concat(scene.index), scene));
                }
            }
            if (!_this.parent.skipMaterials && _this.parent.loadAllMaterials && _this._gltf.materials) {
                for (var m = 0; m < _this._gltf.materials.length; ++m) {
                    var material = _this._gltf.materials[m];
                    var context_1 = "/materials/" + m;
                    var babylonDrawMode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
                    promises.push(_this._loadMaterialAsync(context_1, material, null, babylonDrawMode, function () { }));
                }
            }
            // Restore the blocking of material dirty.
            _this._babylonScene.blockMaterialDirtyMechanism = oldBlockMaterialDirtyMechanism;
            if (_this._parent.compileMaterials) {
                promises.push(_this._compileMaterialsAsync());
            }
            if (_this._parent.compileShadowGenerators) {
                promises.push(_this._compileShadowGeneratorsAsync());
            }
            var resultPromise = Promise.all(promises).then(function () {
                if (_this._rootBabylonMesh) {
                    _this._rootBabylonMesh.setEnabled(true);
                }
                _this._extensionsOnReady();
                _this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.READY);
                _this._startAnimations();
                return resultFunc();
            });
            return resultPromise.then(function (result) {
                _this._parent._endPerformanceCounter(loadingToReadyCounterName);
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Tools.SetImmediate(function () {
                    if (!_this._disposed) {
                        Promise.all(_this._completePromises).then(function () {
                            _this._parent._endPerformanceCounter(loadingToCompleteCounterName);
                            _this._parent._setState(_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderState.COMPLETE);
                            _this._parent.onCompleteObservable.notifyObservers(undefined);
                            _this._parent.onCompleteObservable.clear();
                            _this.dispose();
                        }, function (error) {
                            _this._parent.onErrorObservable.notifyObservers(error);
                            _this._parent.onErrorObservable.clear();
                            _this.dispose();
                        });
                    }
                });
                return result;
            });
        })
            .catch(function (error) {
            if (!_this._disposed) {
                _this._parent.onErrorObservable.notifyObservers(error);
                _this._parent.onErrorObservable.clear();
                _this.dispose();
            }
            throw error;
        });
    };
    GLTFLoader.prototype._loadData = function (data) {
        this._gltf = data.json;
        this._setupData();
        if (data.bin) {
            var buffers = this._gltf.buffers;
            if (buffers && buffers[0] && !buffers[0].uri) {
                var binaryBuffer = buffers[0];
                if (binaryBuffer.byteLength < data.bin.byteLength - 3 || binaryBuffer.byteLength > data.bin.byteLength) {
                    babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Binary buffer length (".concat(binaryBuffer.byteLength, ") from JSON does not match chunk length (").concat(data.bin.byteLength, ")"));
                }
                this._bin = data.bin;
            }
            else {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Unexpected BIN chunk");
            }
        }
    };
    GLTFLoader.prototype._setupData = function () {
        ArrayItem.Assign(this._gltf.accessors);
        ArrayItem.Assign(this._gltf.animations);
        ArrayItem.Assign(this._gltf.buffers);
        ArrayItem.Assign(this._gltf.bufferViews);
        ArrayItem.Assign(this._gltf.cameras);
        ArrayItem.Assign(this._gltf.images);
        ArrayItem.Assign(this._gltf.materials);
        ArrayItem.Assign(this._gltf.meshes);
        ArrayItem.Assign(this._gltf.nodes);
        ArrayItem.Assign(this._gltf.samplers);
        ArrayItem.Assign(this._gltf.scenes);
        ArrayItem.Assign(this._gltf.skins);
        ArrayItem.Assign(this._gltf.textures);
        if (this._gltf.nodes) {
            var nodeParents = {};
            for (var _i = 0, _a = this._gltf.nodes; _i < _a.length; _i++) {
                var node = _a[_i];
                if (node.children) {
                    for (var _b = 0, _c = node.children; _b < _c.length; _b++) {
                        var index = _c[_b];
                        nodeParents[index] = node.index;
                    }
                }
            }
            var rootNode = this._createRootNode();
            for (var _d = 0, _e = this._gltf.nodes; _d < _e.length; _d++) {
                var node = _e[_d];
                var parentIndex = nodeParents[node.index];
                node.parent = parentIndex === undefined ? rootNode : this._gltf.nodes[parentIndex];
            }
        }
    };
    GLTFLoader.prototype._loadExtensions = function () {
        for (var name_1 in GLTFLoader._RegisteredExtensions) {
            var extension = GLTFLoader._RegisteredExtensions[name_1].factory(this);
            if (extension.name !== name_1) {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("The name of the glTF loader extension instance does not match the registered name: ".concat(extension.name, " !== ").concat(name_1));
            }
            this._extensions.push(extension);
            this._parent.onExtensionLoadedObservable.notifyObservers(extension);
        }
        this._extensions.sort(function (a, b) { return (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE); });
        this._parent.onExtensionLoadedObservable.clear();
    };
    GLTFLoader.prototype._checkExtensions = function () {
        if (this._gltf.extensionsRequired) {
            var _loop_1 = function (name_2) {
                var available = this_1._extensions.some(function (extension) { return extension.name === name_2 && extension.enabled; });
                if (!available) {
                    throw new Error("Require extension ".concat(name_2, " is not available"));
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this._gltf.extensionsRequired; _i < _a.length; _i++) {
                var name_2 = _a[_i];
                _loop_1(name_2);
            }
        }
    };
    GLTFLoader.prototype._createRootNode = function () {
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        this._rootBabylonMesh = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Mesh("__root__", this._babylonScene);
        this._rootBabylonMesh._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        this._rootBabylonMesh.setEnabled(false);
        var rootNode = {
            _babylonTransformNode: this._rootBabylonMesh,
            index: -1,
        };
        switch (this._parent.coordinateSystemMode) {
            case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderCoordinateSystemMode.AUTO: {
                if (!this._babylonScene.useRightHandedSystem) {
                    rootNode.rotation = [0, 1, 0, 0];
                    rootNode.scale = [1, 1, -1];
                    GLTFLoader._LoadTransform(rootNode, this._rootBabylonMesh);
                }
                break;
            }
            case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderCoordinateSystemMode.FORCE_RIGHT_HANDED: {
                this._babylonScene.useRightHandedSystem = true;
                break;
            }
            default: {
                throw new Error("Invalid coordinate system mode (".concat(this._parent.coordinateSystemMode, ")"));
            }
        }
        this._parent.onMeshLoadedObservable.notifyObservers(this._rootBabylonMesh);
        return rootNode;
    };
    /**
     * Loads a glTF scene.
     * @param context The context when loading the asset
     * @param scene The glTF scene property
     * @returns A promise that resolves when the load is complete
     */
    GLTFLoader.prototype.loadSceneAsync = function (context, scene) {
        var _this = this;
        var extensionPromise = this._extensionsLoadSceneAsync(context, scene);
        if (extensionPromise) {
            return extensionPromise;
        }
        var promises = new Array();
        this.logOpen("".concat(context, " ").concat(scene.name || ""));
        if (scene.nodes) {
            for (var _i = 0, _a = scene.nodes; _i < _a.length; _i++) {
                var index = _a[_i];
                var node = ArrayItem.Get("".concat(context, "/nodes/").concat(index), this._gltf.nodes, index);
                promises.push(this.loadNodeAsync("/nodes/".concat(node.index), node, function (babylonMesh) {
                    babylonMesh.parent = _this._rootBabylonMesh;
                }));
            }
        }
        for (var _b = 0, _c = this._postSceneLoadActions; _b < _c.length; _b++) {
            var action = _c[_b];
            action();
        }
        promises.push(this._loadAnimationsAsync());
        this.logClose();
        return Promise.all(promises).then(function () { });
    };
    GLTFLoader.prototype._forEachPrimitive = function (node, callback) {
        if (node._primitiveBabylonMeshes) {
            for (var _i = 0, _a = node._primitiveBabylonMeshes; _i < _a.length; _i++) {
                var babylonMesh = _a[_i];
                callback(babylonMesh);
            }
        }
    };
    GLTFLoader.prototype._getGeometries = function () {
        var geometries = new Array();
        var nodes = this._gltf.nodes;
        if (nodes) {
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                this._forEachPrimitive(node, function (babylonMesh) {
                    var geometry = babylonMesh.geometry;
                    if (geometry && geometries.indexOf(geometry) === -1) {
                        geometries.push(geometry);
                    }
                });
            }
        }
        return geometries;
    };
    GLTFLoader.prototype._getMeshes = function () {
        var meshes = new Array();
        // Root mesh is always first, if available.
        if (this._rootBabylonMesh) {
            meshes.push(this._rootBabylonMesh);
        }
        var nodes = this._gltf.nodes;
        if (nodes) {
            for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
                var node = nodes_2[_i];
                this._forEachPrimitive(node, function (babylonMesh) {
                    meshes.push(babylonMesh);
                });
            }
        }
        return meshes;
    };
    GLTFLoader.prototype._getTransformNodes = function () {
        var transformNodes = new Array();
        var nodes = this._gltf.nodes;
        if (nodes) {
            for (var _i = 0, nodes_3 = nodes; _i < nodes_3.length; _i++) {
                var node = nodes_3[_i];
                if (node._babylonTransformNode && node._babylonTransformNode.getClassName() === "TransformNode") {
                    transformNodes.push(node._babylonTransformNode);
                }
                if (node._babylonTransformNodeForSkin) {
                    transformNodes.push(node._babylonTransformNodeForSkin);
                }
            }
        }
        return transformNodes;
    };
    GLTFLoader.prototype._getSkeletons = function () {
        var skeletons = new Array();
        var skins = this._gltf.skins;
        if (skins) {
            for (var _i = 0, skins_1 = skins; _i < skins_1.length; _i++) {
                var skin = skins_1[_i];
                if (skin._data) {
                    skeletons.push(skin._data.babylonSkeleton);
                }
            }
        }
        return skeletons;
    };
    GLTFLoader.prototype._getAnimationGroups = function () {
        var animationGroups = new Array();
        var animations = this._gltf.animations;
        if (animations) {
            for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
                var animation = animations_1[_i];
                if (animation._babylonAnimationGroup) {
                    animationGroups.push(animation._babylonAnimationGroup);
                }
            }
        }
        return animationGroups;
    };
    GLTFLoader.prototype._startAnimations = function () {
        switch (this._parent.animationStartMode) {
            case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.NONE: {
                // do nothing
                break;
            }
            case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.FIRST: {
                var babylonAnimationGroups = this._getAnimationGroups();
                if (babylonAnimationGroups.length !== 0) {
                    babylonAnimationGroups[0].start(true);
                }
                break;
            }
            case _glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderAnimationStartMode.ALL: {
                var babylonAnimationGroups = this._getAnimationGroups();
                for (var _i = 0, babylonAnimationGroups_1 = babylonAnimationGroups; _i < babylonAnimationGroups_1.length; _i++) {
                    var babylonAnimationGroup = babylonAnimationGroups_1[_i];
                    babylonAnimationGroup.start(true);
                }
                break;
            }
            default: {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Error("Invalid animation start mode (".concat(this._parent.animationStartMode, ")"));
                return;
            }
        }
    };
    /**
     * Loads a glTF node.
     * @param context The context when loading the asset
     * @param node The glTF node property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon mesh when the load is complete
     */
    GLTFLoader.prototype.loadNodeAsync = function (context, node, assign) {
        var _this = this;
        if (assign === void 0) { assign = function () { }; }
        var extensionPromise = this._extensionsLoadNodeAsync(context, node, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        if (node._babylonTransformNode) {
            throw new Error("".concat(context, ": Invalid recursive node hierarchy"));
        }
        var promises = new Array();
        this.logOpen("".concat(context, " ").concat(node.name || ""));
        var loadNode = function (babylonTransformNode) {
            GLTFLoader.AddPointerMetadata(babylonTransformNode, context);
            GLTFLoader._LoadTransform(node, babylonTransformNode);
            if (node.camera != undefined) {
                var camera = ArrayItem.Get("".concat(context, "/camera"), _this._gltf.cameras, node.camera);
                promises.push(_this.loadCameraAsync("/cameras/".concat(camera.index), camera, function (babylonCamera) {
                    babylonCamera.parent = babylonTransformNode;
                }));
            }
            if (node.children) {
                for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                    var index = _a[_i];
                    var childNode = ArrayItem.Get("".concat(context, "/children/").concat(index), _this._gltf.nodes, index);
                    promises.push(_this.loadNodeAsync("/nodes/".concat(childNode.index), childNode, function (childBabylonMesh) {
                        childBabylonMesh.parent = babylonTransformNode;
                    }));
                }
            }
            assign(babylonTransformNode);
        };
        if (node.mesh == undefined || node.skin != undefined) {
            var nodeName = node.name || "node".concat(node.index);
            this._babylonScene._blockEntityCollection = !!this._assetContainer;
            var transformNode = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TransformNode(nodeName, this._babylonScene);
            transformNode._parentContainer = this._assetContainer;
            this._babylonScene._blockEntityCollection = false;
            if (node.mesh == undefined) {
                node._babylonTransformNode = transformNode;
            }
            else {
                node._babylonTransformNodeForSkin = transformNode;
            }
            loadNode(transformNode);
        }
        if (node.mesh != undefined) {
            if (node.skin == undefined) {
                var mesh = ArrayItem.Get("".concat(context, "/mesh"), this._gltf.meshes, node.mesh);
                promises.push(this._loadMeshAsync("/meshes/".concat(mesh.index), node, mesh, loadNode));
            }
            else {
                // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
                // This code path will place the skinned mesh as a sibling of the skeleton root node without loading the
                // transform, which effectively ignores the transform of the skinned mesh, as per spec.
                var mesh = ArrayItem.Get("".concat(context, "/mesh"), this._gltf.meshes, node.mesh);
                promises.push(this._loadMeshAsync("/meshes/".concat(mesh.index), node, mesh, function (babylonTransformNode) {
                    var babylonTransformNodeForSkin = node._babylonTransformNodeForSkin;
                    // Merge the metadata from the skin node to the skinned mesh in case a loader extension added metadata.
                    babylonTransformNode.metadata = mergeDeep(babylonTransformNodeForSkin.metadata, babylonTransformNode.metadata || {});
                    var skin = ArrayItem.Get("".concat(context, "/skin"), _this._gltf.skins, node.skin);
                    promises.push(_this._loadSkinAsync("/skins/".concat(skin.index), node, skin, function (babylonSkeleton) {
                        _this._forEachPrimitive(node, function (babylonMesh) {
                            babylonMesh.skeleton = babylonSkeleton;
                        });
                        // Wait until all the nodes are parented before parenting the skinned mesh.
                        _this._postSceneLoadActions.push(function () {
                            if (skin.skeleton != undefined) {
                                // Place the skinned mesh node as a sibling of the skeleton root node.
                                // Handle special case when the parent of the skeleton root is the skinned mesh.
                                var parentNode = ArrayItem.Get("/skins/".concat(skin.index, "/skeleton"), _this._gltf.nodes, skin.skeleton).parent;
                                if (node.index === parentNode.index) {
                                    babylonTransformNode.parent = babylonTransformNodeForSkin.parent;
                                }
                                else {
                                    babylonTransformNode.parent = parentNode._babylonTransformNode;
                                }
                            }
                            else {
                                babylonTransformNode.parent = _this._rootBabylonMesh;
                            }
                            _this._parent.onSkinLoadedObservable.notifyObservers({ node: babylonTransformNodeForSkin, skinnedNode: babylonTransformNode });
                        });
                    }));
                }));
            }
        }
        this.logClose();
        return Promise.all(promises).then(function () {
            _this._forEachPrimitive(node, function (babylonMesh) {
                if (babylonMesh.geometry && babylonMesh.geometry.useBoundingInfoFromGeometry) {
                    // simply apply the world matrices to the bounding info - the extends are already ok
                    babylonMesh._updateBoundingInfo();
                }
                else {
                    babylonMesh.refreshBoundingInfo(true);
                }
            });
            return node._babylonTransformNode;
        });
    };
    GLTFLoader.prototype._loadMeshAsync = function (context, node, mesh, assign) {
        var primitives = mesh.primitives;
        if (!primitives || !primitives.length) {
            throw new Error("".concat(context, ": Primitives are missing"));
        }
        if (primitives[0].index == undefined) {
            ArrayItem.Assign(primitives);
        }
        var promises = new Array();
        this.logOpen("".concat(context, " ").concat(mesh.name || ""));
        var name = node.name || "node".concat(node.index);
        if (primitives.length === 1) {
            var primitive = mesh.primitives[0];
            promises.push(this._loadMeshPrimitiveAsync("".concat(context, "/primitives/").concat(primitive.index), name, node, mesh, primitive, function (babylonMesh) {
                node._babylonTransformNode = babylonMesh;
                node._primitiveBabylonMeshes = [babylonMesh];
            }));
        }
        else {
            this._babylonScene._blockEntityCollection = !!this._assetContainer;
            node._babylonTransformNode = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TransformNode(name, this._babylonScene);
            node._babylonTransformNode._parentContainer = this._assetContainer;
            this._babylonScene._blockEntityCollection = false;
            node._primitiveBabylonMeshes = [];
            for (var _i = 0, primitives_1 = primitives; _i < primitives_1.length; _i++) {
                var primitive = primitives_1[_i];
                promises.push(this._loadMeshPrimitiveAsync("".concat(context, "/primitives/").concat(primitive.index), "".concat(name, "_primitive").concat(primitive.index), node, mesh, primitive, function (babylonMesh) {
                    babylonMesh.parent = node._babylonTransformNode;
                    node._primitiveBabylonMeshes.push(babylonMesh);
                }));
            }
        }
        assign(node._babylonTransformNode);
        this.logClose();
        return Promise.all(promises).then(function () {
            return node._babylonTransformNode;
        });
    };
    /**
     * @internal Define this method to modify the default behavior when loading data for mesh primitives.
     * @param context The context when loading the asset
     * @param name The mesh name when loading the asset
     * @param node The glTF node when loading the asset
     * @param mesh The glTF mesh when loading the asset
     * @param primitive The glTF mesh primitive property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded mesh when the load is complete or null if not handled
     */
    GLTFLoader.prototype._loadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
        var _this = this;
        var extensionPromise = this._extensionsLoadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        this.logOpen("".concat(context));
        var shouldInstance = this._disableInstancedMesh === 0 && this._parent.createInstances && node.skin == undefined && !mesh.primitives[0].targets;
        var babylonAbstractMesh;
        var promise;
        if (shouldInstance && primitive._instanceData) {
            this._babylonScene._blockEntityCollection = !!this._assetContainer;
            babylonAbstractMesh = primitive._instanceData.babylonSourceMesh.createInstance(name);
            babylonAbstractMesh._parentContainer = this._assetContainer;
            this._babylonScene._blockEntityCollection = false;
            promise = primitive._instanceData.promise;
        }
        else {
            var promises = new Array();
            this._babylonScene._blockEntityCollection = !!this._assetContainer;
            var babylonMesh_1 = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Mesh(name, this._babylonScene);
            babylonMesh_1._parentContainer = this._assetContainer;
            this._babylonScene._blockEntityCollection = false;
            babylonMesh_1.overrideMaterialSideOrientation = this._babylonScene.useRightHandedSystem ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.CounterClockWiseSideOrientation : babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation;
            this._createMorphTargets(context, node, mesh, primitive, babylonMesh_1);
            promises.push(this._loadVertexDataAsync(context, primitive, babylonMesh_1).then(function (babylonGeometry) {
                return _this._loadMorphTargetsAsync(context, primitive, babylonMesh_1, babylonGeometry).then(function () {
                    if (_this._disposed) {
                        return;
                    }
                    _this._babylonScene._blockEntityCollection = !!_this._assetContainer;
                    babylonGeometry.applyToMesh(babylonMesh_1);
                    babylonGeometry._parentContainer = _this._assetContainer;
                    _this._babylonScene._blockEntityCollection = false;
                });
            }));
            var babylonDrawMode = GLTFLoader._GetDrawMode(context, primitive.mode);
            if (primitive.material == undefined) {
                var babylonMaterial = this._defaultBabylonMaterialData[babylonDrawMode];
                if (!babylonMaterial) {
                    babylonMaterial = this._createDefaultMaterial("__GLTFLoader._default", babylonDrawMode);
                    this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);
                    this._defaultBabylonMaterialData[babylonDrawMode] = babylonMaterial;
                }
                babylonMesh_1.material = babylonMaterial;
            }
            else if (!this.parent.skipMaterials) {
                var material = ArrayItem.Get("".concat(context, "/material"), this._gltf.materials, primitive.material);
                promises.push(this._loadMaterialAsync("/materials/".concat(material.index), material, babylonMesh_1, babylonDrawMode, function (babylonMaterial) {
                    babylonMesh_1.material = babylonMaterial;
                }));
            }
            promise = Promise.all(promises);
            if (shouldInstance) {
                primitive._instanceData = {
                    babylonSourceMesh: babylonMesh_1,
                    promise: promise,
                };
            }
            babylonAbstractMesh = babylonMesh_1;
        }
        GLTFLoader.AddPointerMetadata(babylonAbstractMesh, context);
        this._parent.onMeshLoadedObservable.notifyObservers(babylonAbstractMesh);
        assign(babylonAbstractMesh);
        this.logClose();
        return promise.then(function () {
            return babylonAbstractMesh;
        });
    };
    GLTFLoader.prototype._loadVertexDataAsync = function (context, primitive, babylonMesh) {
        var _this = this;
        var extensionPromise = this._extensionsLoadVertexDataAsync(context, primitive, babylonMesh);
        if (extensionPromise) {
            return extensionPromise;
        }
        var attributes = primitive.attributes;
        if (!attributes) {
            throw new Error("".concat(context, ": Attributes are missing"));
        }
        var promises = new Array();
        var babylonGeometry = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Geometry(babylonMesh.name, this._babylonScene);
        if (primitive.indices == undefined) {
            babylonMesh.isUnIndexed = true;
        }
        else {
            var accessor = ArrayItem.Get("".concat(context, "/indices"), this._gltf.accessors, primitive.indices);
            promises.push(this._loadIndicesAccessorAsync("/accessors/".concat(accessor.index), accessor).then(function (data) {
                babylonGeometry.setIndices(data);
            }));
        }
        var loadAttribute = function (name, kind, callback) {
            if (attributes[name] == undefined) {
                return;
            }
            babylonMesh._delayInfo = babylonMesh._delayInfo || [];
            if (babylonMesh._delayInfo.indexOf(kind) === -1) {
                babylonMesh._delayInfo.push(kind);
            }
            var accessor = ArrayItem.Get("".concat(context, "/attributes/").concat(name), _this._gltf.accessors, attributes[name]);
            promises.push(_this._loadVertexAccessorAsync("/accessors/".concat(accessor.index), accessor, kind).then(function (babylonVertexBuffer) {
                var _a, _b;
                if (babylonVertexBuffer.getKind() === babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind && !_this.parent.alwaysComputeBoundingBox && !babylonMesh.skeleton) {
                    if (accessor.min && accessor.max) {
                        var min = (_a = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[0]).copyFromFloats.apply(_a, accessor.min);
                        var max = (_b = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.TmpVectors.Vector3[1]).copyFromFloats.apply(_b, accessor.max);
                        if (accessor.normalized && accessor.componentType !== 5126 /* AccessorComponentType.FLOAT */) {
                            var divider = 1;
                            switch (accessor.componentType) {
                                case 5120 /* AccessorComponentType.BYTE */:
                                    divider = 127.0;
                                    break;
                                case 5121 /* AccessorComponentType.UNSIGNED_BYTE */:
                                    divider = 255.0;
                                    break;
                                case 5122 /* AccessorComponentType.SHORT */:
                                    divider = 32767.0;
                                    break;
                                case 5123 /* AccessorComponentType.UNSIGNED_SHORT */:
                                    divider = 65535.0;
                                    break;
                            }
                            var oneOverDivider = 1 / divider;
                            min.scaleInPlace(oneOverDivider);
                            max.scaleInPlace(oneOverDivider);
                        }
                        babylonGeometry._boundingInfo = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.BoundingInfo(min, max);
                        babylonGeometry.useBoundingInfoFromGeometry = true;
                    }
                }
                babylonGeometry.setVerticesBuffer(babylonVertexBuffer, accessor.count);
            }));
            if (kind == babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind) {
                babylonMesh.numBoneInfluencers = 8;
            }
            if (callback) {
                callback(accessor);
            }
        };
        loadAttribute("POSITION", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
        loadAttribute("NORMAL", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
        loadAttribute("TANGENT", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind);
        loadAttribute("TEXCOORD_0", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
        loadAttribute("TEXCOORD_1", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
        loadAttribute("TEXCOORD_2", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV3Kind);
        loadAttribute("TEXCOORD_3", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV4Kind);
        loadAttribute("TEXCOORD_4", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV5Kind);
        loadAttribute("TEXCOORD_5", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV6Kind);
        loadAttribute("JOINTS_0", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesKind);
        loadAttribute("WEIGHTS_0", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsKind);
        loadAttribute("JOINTS_1", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesIndicesExtraKind);
        loadAttribute("WEIGHTS_1", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.MatricesWeightsExtraKind);
        loadAttribute("COLOR_0", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind, function (accessor) {
            if (accessor.type === "VEC4" /* AccessorType.VEC4 */) {
                babylonMesh.hasVertexAlpha = true;
            }
        });
        return Promise.all(promises).then(function () {
            return babylonGeometry;
        });
    };
    GLTFLoader.prototype._createMorphTargets = function (context, node, mesh, primitive, babylonMesh) {
        if (!primitive.targets) {
            return;
        }
        if (node._numMorphTargets == undefined) {
            node._numMorphTargets = primitive.targets.length;
        }
        else if (primitive.targets.length !== node._numMorphTargets) {
            throw new Error("".concat(context, ": Primitives do not have the same number of targets"));
        }
        var targetNames = mesh.extras ? mesh.extras.targetNames : null;
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        babylonMesh.morphTargetManager = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.MorphTargetManager(this._babylonScene);
        babylonMesh.morphTargetManager._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        babylonMesh.morphTargetManager.areUpdatesFrozen = true;
        for (var index = 0; index < primitive.targets.length; index++) {
            var weight = node.weights ? node.weights[index] : mesh.weights ? mesh.weights[index] : 0;
            var name_3 = targetNames ? targetNames[index] : "morphTarget".concat(index);
            babylonMesh.morphTargetManager.addTarget(new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.MorphTarget(name_3, weight, babylonMesh.getScene()));
            // TODO: tell the target whether it has positions, normals, tangents
        }
    };
    GLTFLoader.prototype._loadMorphTargetsAsync = function (context, primitive, babylonMesh, babylonGeometry) {
        if (!primitive.targets) {
            return Promise.resolve();
        }
        var promises = new Array();
        var morphTargetManager = babylonMesh.morphTargetManager;
        for (var index = 0; index < morphTargetManager.numTargets; index++) {
            var babylonMorphTarget = morphTargetManager.getTarget(index);
            promises.push(this._loadMorphTargetVertexDataAsync("".concat(context, "/targets/").concat(index), babylonGeometry, primitive.targets[index], babylonMorphTarget));
        }
        return Promise.all(promises).then(function () {
            morphTargetManager.areUpdatesFrozen = false;
        });
    };
    GLTFLoader.prototype._loadMorphTargetVertexDataAsync = function (context, babylonGeometry, attributes, babylonMorphTarget) {
        var _this = this;
        var promises = new Array();
        var loadAttribute = function (attribute, kind, setData) {
            if (attributes[attribute] == undefined) {
                return;
            }
            var babylonVertexBuffer = babylonGeometry.getVertexBuffer(kind);
            if (!babylonVertexBuffer) {
                return;
            }
            var accessor = ArrayItem.Get("".concat(context, "/").concat(attribute), _this._gltf.accessors, attributes[attribute]);
            promises.push(_this._loadFloatAccessorAsync("/accessors/".concat(accessor.index), accessor).then(function (data) {
                setData(babylonVertexBuffer, data);
            }));
        };
        loadAttribute("POSITION", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, function (babylonVertexBuffer, data) {
            var positions = new Float32Array(data.length);
            babylonVertexBuffer.forEach(data.length, function (value, index) {
                positions[index] = data[index] + value;
            });
            babylonMorphTarget.setPositions(positions);
        });
        loadAttribute("NORMAL", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, function (babylonVertexBuffer, data) {
            var normals = new Float32Array(data.length);
            babylonVertexBuffer.forEach(normals.length, function (value, index) {
                normals[index] = data[index] + value;
            });
            babylonMorphTarget.setNormals(normals);
        });
        loadAttribute("TANGENT", babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.TangentKind, function (babylonVertexBuffer, data) {
            var tangents = new Float32Array((data.length / 3) * 4);
            var dataIndex = 0;
            babylonVertexBuffer.forEach((data.length / 3) * 4, function (value, index) {
                // Tangent data for morph targets is stored as xyz delta.
                // The vertexData.tangent is stored as xyzw.
                // So we need to skip every fourth vertexData.tangent.
                if ((index + 1) % 4 !== 0) {
                    tangents[dataIndex] = data[dataIndex] + value;
                    dataIndex++;
                }
            });
            babylonMorphTarget.setTangents(tangents);
        });
        return Promise.all(promises).then(function () { });
    };
    GLTFLoader._LoadTransform = function (node, babylonNode) {
        // Ignore the TRS of skinned nodes.
        // See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins (second implementation note)
        if (node.skin != undefined) {
            return;
        }
        var position = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
        var rotation = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity();
        var scaling = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.One();
        if (node.matrix) {
            var matrix = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArray(node.matrix);
            matrix.decompose(scaling, rotation, position);
        }
        else {
            if (node.translation) {
                position = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.translation);
            }
            if (node.rotation) {
                rotation = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(node.rotation);
            }
            if (node.scale) {
                scaling = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.scale);
            }
        }
        babylonNode.position = position;
        babylonNode.rotationQuaternion = rotation;
        babylonNode.scaling = scaling;
    };
    GLTFLoader.prototype._loadSkinAsync = function (context, node, skin, assign) {
        var _this = this;
        var extensionPromise = this._extensionsLoadSkinAsync(context, node, skin);
        if (extensionPromise) {
            return extensionPromise;
        }
        if (skin._data) {
            assign(skin._data.babylonSkeleton);
            return skin._data.promise;
        }
        var skeletonId = "skeleton".concat(skin.index);
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        var babylonSkeleton = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Skeleton(skin.name || skeletonId, skeletonId, this._babylonScene);
        babylonSkeleton._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        this._loadBones(context, skin, babylonSkeleton);
        var promise = this._loadSkinInverseBindMatricesDataAsync(context, skin).then(function (inverseBindMatricesData) {
            _this._updateBoneMatrices(babylonSkeleton, inverseBindMatricesData);
        });
        skin._data = {
            babylonSkeleton: babylonSkeleton,
            promise: promise,
        };
        assign(babylonSkeleton);
        return promise;
    };
    GLTFLoader.prototype._loadBones = function (context, skin, babylonSkeleton) {
        if (skin.skeleton == undefined || this._parent.alwaysComputeSkeletonRootNode) {
            var rootNode = this._findSkeletonRootNode("".concat(context, "/joints"), skin.joints);
            if (rootNode) {
                if (skin.skeleton === undefined) {
                    skin.skeleton = rootNode.index;
                }
                else {
                    var isParent = function (a, b) {
                        for (; b.parent; b = b.parent) {
                            if (b.parent === a) {
                                return true;
                            }
                        }
                        return false;
                    };
                    var skeletonNode = ArrayItem.Get("".concat(context, "/skeleton"), this._gltf.nodes, skin.skeleton);
                    if (skeletonNode !== rootNode && !isParent(skeletonNode, rootNode)) {
                        babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, "/skeleton: Overriding with nearest common ancestor as skeleton node is not a common root"));
                        skin.skeleton = rootNode.index;
                    }
                }
            }
            else {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Failed to find common root"));
            }
        }
        var babylonBones = {};
        for (var _i = 0, _a = skin.joints; _i < _a.length; _i++) {
            var index = _a[_i];
            var node = ArrayItem.Get("".concat(context, "/joints/").concat(index), this._gltf.nodes, index);
            this._loadBone(node, skin, babylonSkeleton, babylonBones);
        }
    };
    GLTFLoader.prototype._findSkeletonRootNode = function (context, joints) {
        if (joints.length === 0) {
            return null;
        }
        var paths = {};
        for (var _i = 0, joints_1 = joints; _i < joints_1.length; _i++) {
            var index = joints_1[_i];
            var path = new Array();
            var node = ArrayItem.Get("".concat(context, "/").concat(index), this._gltf.nodes, index);
            while (node.index !== -1) {
                path.unshift(node);
                node = node.parent;
            }
            paths[index] = path;
        }
        var rootNode = null;
        for (var i = 0;; ++i) {
            var path = paths[joints[0]];
            if (i >= path.length) {
                return rootNode;
            }
            var node = path[i];
            for (var j = 1; j < joints.length; ++j) {
                path = paths[joints[j]];
                if (i >= path.length || node !== path[i]) {
                    return rootNode;
                }
            }
            rootNode = node;
        }
    };
    GLTFLoader.prototype._loadBone = function (node, skin, babylonSkeleton, babylonBones) {
        var babylonBone = babylonBones[node.index];
        if (babylonBone) {
            return babylonBone;
        }
        var parentBabylonBone = null;
        if (node.index !== skin.skeleton) {
            if (node.parent && node.parent.index !== -1) {
                parentBabylonBone = this._loadBone(node.parent, skin, babylonSkeleton, babylonBones);
            }
            else if (skin.skeleton !== undefined) {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("/skins/".concat(skin.index, "/skeleton: Skeleton node is not a common root"));
            }
        }
        var boneIndex = skin.joints.indexOf(node.index);
        babylonBone = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Bone(node.name || "joint".concat(node.index), babylonSkeleton, parentBabylonBone, this._getNodeMatrix(node), null, null, boneIndex);
        babylonBones[node.index] = babylonBone;
        // Wait until the scene is loaded to ensure the transform nodes are loaded.
        this._postSceneLoadActions.push(function () {
            // Link the Babylon bone with the corresponding Babylon transform node.
            // A glTF joint is a pointer to a glTF node in the glTF node hierarchy similar to Unity3D.
            babylonBone.linkTransformNode(node._babylonTransformNode);
        });
        return babylonBone;
    };
    GLTFLoader.prototype._loadSkinInverseBindMatricesDataAsync = function (context, skin) {
        if (skin.inverseBindMatrices == undefined) {
            return Promise.resolve(null);
        }
        var accessor = ArrayItem.Get("".concat(context, "/inverseBindMatrices"), this._gltf.accessors, skin.inverseBindMatrices);
        return this._loadFloatAccessorAsync("/accessors/".concat(accessor.index), accessor);
    };
    GLTFLoader.prototype._updateBoneMatrices = function (babylonSkeleton, inverseBindMatricesData) {
        for (var _i = 0, _a = babylonSkeleton.bones; _i < _a.length; _i++) {
            var babylonBone = _a[_i];
            var baseMatrix = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.Identity();
            var boneIndex = babylonBone._index;
            if (inverseBindMatricesData && boneIndex !== -1) {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArrayToRef(inverseBindMatricesData, boneIndex * 16, baseMatrix);
                baseMatrix.invertToRef(baseMatrix);
            }
            var babylonParentBone = babylonBone.getParent();
            if (babylonParentBone) {
                baseMatrix.multiplyToRef(babylonParentBone.getAbsoluteInverseBindMatrix(), baseMatrix);
            }
            babylonBone.updateMatrix(baseMatrix, false, false);
            babylonBone._updateAbsoluteBindMatrices(undefined, false);
        }
    };
    GLTFLoader.prototype._getNodeMatrix = function (node) {
        return node.matrix
            ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.FromArray(node.matrix)
            : babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Matrix.Compose(node.scale ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.scale) : babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.One(), node.rotation ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(node.rotation) : babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Quaternion.Identity(), node.translation ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(node.translation) : babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero());
    };
    /**
     * Loads a glTF camera.
     * @param context The context when loading the asset
     * @param camera The glTF camera property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon camera when the load is complete
     */
    GLTFLoader.prototype.loadCameraAsync = function (context, camera, assign) {
        if (assign === void 0) { assign = function () { }; }
        var extensionPromise = this._extensionsLoadCameraAsync(context, camera, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        var promises = new Array();
        this.logOpen("".concat(context, " ").concat(camera.name || ""));
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        var babylonCamera = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.FreeCamera(camera.name || "camera".concat(camera.index), babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero(), this._babylonScene, false);
        babylonCamera._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        babylonCamera.ignoreParentScaling = true;
        camera._babylonCamera = babylonCamera;
        babylonCamera.rotation = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, Math.PI, 0);
        switch (camera.type) {
            case "perspective" /* CameraType.PERSPECTIVE */: {
                var perspective = camera.perspective;
                if (!perspective) {
                    throw new Error("".concat(context, ": Camera perspective properties are missing"));
                }
                babylonCamera.fov = perspective.yfov;
                babylonCamera.minZ = perspective.znear;
                babylonCamera.maxZ = perspective.zfar || 0;
                break;
            }
            case "orthographic" /* CameraType.ORTHOGRAPHIC */: {
                if (!camera.orthographic) {
                    throw new Error("".concat(context, ": Camera orthographic properties are missing"));
                }
                babylonCamera.mode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Camera.ORTHOGRAPHIC_CAMERA;
                babylonCamera.orthoLeft = -camera.orthographic.xmag;
                babylonCamera.orthoRight = camera.orthographic.xmag;
                babylonCamera.orthoBottom = -camera.orthographic.ymag;
                babylonCamera.orthoTop = camera.orthographic.ymag;
                babylonCamera.minZ = camera.orthographic.znear;
                babylonCamera.maxZ = camera.orthographic.zfar;
                break;
            }
            default: {
                throw new Error("".concat(context, ": Invalid camera type (").concat(camera.type, ")"));
            }
        }
        GLTFLoader.AddPointerMetadata(babylonCamera, context);
        this._parent.onCameraLoadedObservable.notifyObservers(babylonCamera);
        assign(babylonCamera);
        this.logClose();
        return Promise.all(promises).then(function () {
            return babylonCamera;
        });
    };
    GLTFLoader.prototype._loadAnimationsAsync = function () {
        var animations = this._gltf.animations;
        if (!animations) {
            return Promise.resolve();
        }
        var promises = new Array();
        for (var index = 0; index < animations.length; index++) {
            var animation = animations[index];
            promises.push(this.loadAnimationAsync("/animations/".concat(animation.index), animation).then(function (animationGroup) {
                // Delete the animation group if it ended up not having any animations in it.
                if (animationGroup.targetedAnimations.length === 0) {
                    animationGroup.dispose();
                }
            }));
        }
        return Promise.all(promises).then(function () { });
    };
    /**
     * Loads a glTF animation.
     * @param context The context when loading the asset
     * @param animation The glTF animation property
     * @returns A promise that resolves with the loaded Babylon animation group when the load is complete
     */
    GLTFLoader.prototype.loadAnimationAsync = function (context, animation) {
        var promise = this._extensionsLoadAnimationAsync(context, animation);
        if (promise) {
            return promise;
        }
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        var babylonAnimationGroup = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.AnimationGroup(animation.name || "animation".concat(animation.index), this._babylonScene);
        babylonAnimationGroup._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        animation._babylonAnimationGroup = babylonAnimationGroup;
        var promises = new Array();
        ArrayItem.Assign(animation.channels);
        ArrayItem.Assign(animation.samplers);
        for (var _i = 0, _a = animation.channels; _i < _a.length; _i++) {
            var channel = _a[_i];
            promises.push(this._loadAnimationChannelAsync("".concat(context, "/channels/").concat(channel.index), context, animation, channel, function (babylonTarget, babylonAnimation) {
                babylonTarget.animations = babylonTarget.animations || [];
                babylonTarget.animations.push(babylonAnimation);
                babylonAnimationGroup.addTargetedAnimation(babylonAnimation, babylonTarget);
            }));
        }
        return Promise.all(promises).then(function () {
            babylonAnimationGroup.normalize(0);
            return babylonAnimationGroup;
        });
    };
    /**
     * @hidden
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete
     */
    GLTFLoader.prototype._loadAnimationChannelAsync = function (context, animationContext, animation, channel, onLoad) {
        var promise = this._extensionsLoadAnimationChannelAsync(context, animationContext, animation, channel, onLoad);
        if (promise) {
            return promise;
        }
        if (channel.target.node == undefined) {
            return Promise.resolve();
        }
        var targetNode = ArrayItem.Get("".concat(context, "/target/node"), this._gltf.nodes, channel.target.node);
        // Ignore animations that have no animation targets.
        if ((channel.target.path === "weights" /* AnimationChannelTargetPath.WEIGHTS */ && !targetNode._numMorphTargets) ||
            (channel.target.path !== "weights" /* AnimationChannelTargetPath.WEIGHTS */ && !targetNode._babylonTransformNode)) {
            return Promise.resolve();
        }
        var properties;
        switch (channel.target.path) {
            case "translation" /* AnimationChannelTargetPath.TRANSLATION */: {
                properties = _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_2__.nodeAnimationData.translation;
                break;
            }
            case "rotation" /* AnimationChannelTargetPath.ROTATION */: {
                properties = _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_2__.nodeAnimationData.rotation;
                break;
            }
            case "scale" /* AnimationChannelTargetPath.SCALE */: {
                properties = _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_2__.nodeAnimationData.scale;
                break;
            }
            case "weights" /* AnimationChannelTargetPath.WEIGHTS */: {
                properties = _glTFLoaderAnimation__WEBPACK_IMPORTED_MODULE_2__.nodeAnimationData.weights;
                break;
            }
            default: {
                throw new Error("".concat(context, "/target/path: Invalid value (").concat(channel.target.path, ")"));
            }
        }
        var targetInfo = {
            target: targetNode,
            properties: properties,
        };
        return this._loadAnimationChannelFromTargetInfoAsync(context, animationContext, animation, channel, targetInfo, onLoad);
    };
    /**
     * @hidden
     * Loads a glTF animation channel.
     * @param context The context when loading the asset
     * @param animationContext The context of the animation when loading the asset
     * @param animation The glTF animation property
     * @param channel The glTF animation channel property
     * @param targetInfo The glTF target and properties
     * @param onLoad Called for each animation loaded
     * @returns A void promise that resolves when the load is complete
     */
    GLTFLoader.prototype._loadAnimationChannelFromTargetInfoAsync = function (context, animationContext, animation, channel, targetInfo, onLoad) {
        var fps = this.parent.targetFps;
        var invfps = 1 / fps;
        var sampler = ArrayItem.Get("".concat(context, "/sampler"), animation.samplers, channel.sampler);
        return this._loadAnimationSamplerAsync("".concat(animationContext, "/samplers/").concat(channel.sampler), sampler).then(function (data) {
            var numAnimations = 0;
            // Extract the corresponding values from the read value.
            // GLTF values may be dispatched to several Babylon properties.
            // For example, baseColorFactor [`r`, `g`, `b`, `a`] is dispatched to
            // - albedoColor as Color3(`r`, `g`, `b`)
            // - alpha as `a`
            for (var _i = 0, _a = targetInfo.properties; _i < _a.length; _i++) {
                var property = _a[_i];
                var stride = property.getStride(targetInfo.target);
                var input = data.input;
                var output = data.output;
                var keys = new Array(input.length);
                var outputOffset = 0;
                switch (data.interpolation) {
                    case "STEP" /* AnimationSamplerInterpolation.STEP */: {
                        for (var index = 0; index < input.length; index++) {
                            var value = property.getValue(targetInfo.target, output, outputOffset, 1);
                            outputOffset += stride;
                            keys[index] = {
                                frame: input[index] * fps,
                                value: value,
                                interpolation: babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.AnimationKeyInterpolation.STEP,
                            };
                        }
                        break;
                    }
                    case "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */: {
                        for (var index = 0; index < input.length; index++) {
                            var inTangent = property.getValue(targetInfo.target, output, outputOffset, invfps);
                            outputOffset += stride;
                            var value = property.getValue(targetInfo.target, output, outputOffset, 1);
                            outputOffset += stride;
                            var outTangent = property.getValue(targetInfo.target, output, outputOffset, invfps);
                            outputOffset += stride;
                            keys[index] = {
                                frame: input[index] * fps,
                                inTangent: inTangent,
                                value: value,
                                outTangent: outTangent,
                            };
                        }
                        break;
                    }
                    case "LINEAR" /* AnimationSamplerInterpolation.LINEAR */: {
                        for (var index = 0; index < input.length; index++) {
                            var value = property.getValue(targetInfo.target, output, outputOffset, 1);
                            outputOffset += stride;
                            keys[index] = {
                                frame: input[index] * fps,
                                value: value,
                            };
                        }
                        break;
                    }
                }
                if (outputOffset > 0) {
                    var name_4 = "".concat(animation.name || "animation".concat(animation.index), "_channel").concat(channel.index, "_").concat(numAnimations);
                    property.buildAnimations(targetInfo.target, name_4, fps, keys, function (babylonAnimatable, babylonAnimation) {
                        ++numAnimations;
                        onLoad(babylonAnimatable, babylonAnimation);
                    });
                }
            }
        });
    };
    GLTFLoader.prototype._loadAnimationSamplerAsync = function (context, sampler) {
        if (sampler._data) {
            return sampler._data;
        }
        var interpolation = sampler.interpolation || "LINEAR" /* AnimationSamplerInterpolation.LINEAR */;
        switch (interpolation) {
            case "STEP" /* AnimationSamplerInterpolation.STEP */:
            case "LINEAR" /* AnimationSamplerInterpolation.LINEAR */:
            case "CUBICSPLINE" /* AnimationSamplerInterpolation.CUBICSPLINE */: {
                break;
            }
            default: {
                throw new Error("".concat(context, "/interpolation: Invalid value (").concat(sampler.interpolation, ")"));
            }
        }
        var inputAccessor = ArrayItem.Get("".concat(context, "/input"), this._gltf.accessors, sampler.input);
        var outputAccessor = ArrayItem.Get("".concat(context, "/output"), this._gltf.accessors, sampler.output);
        sampler._data = Promise.all([
            this._loadFloatAccessorAsync("/accessors/".concat(inputAccessor.index), inputAccessor),
            this._loadFloatAccessorAsync("/accessors/".concat(outputAccessor.index), outputAccessor),
        ]).then(function (_a) {
            var inputData = _a[0], outputData = _a[1];
            return {
                input: inputData,
                interpolation: interpolation,
                output: outputData,
            };
        });
        return sampler._data;
    };
    /**
     * Loads a glTF buffer.
     * @param context The context when loading the asset
     * @param buffer The glTF buffer property
     * @param byteOffset The byte offset to use
     * @param byteLength The byte length to use
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    GLTFLoader.prototype.loadBufferAsync = function (context, buffer, byteOffset, byteLength) {
        var extensionPromise = this._extensionsLoadBufferAsync(context, buffer, byteOffset, byteLength);
        if (extensionPromise) {
            return extensionPromise;
        }
        if (!buffer._data) {
            if (buffer.uri) {
                buffer._data = this.loadUriAsync("".concat(context, "/uri"), buffer, buffer.uri);
            }
            else {
                if (!this._bin) {
                    throw new Error("".concat(context, ": Uri is missing or the binary glTF is missing its binary chunk"));
                }
                buffer._data = this._bin.readAsync(0, buffer.byteLength);
            }
        }
        return buffer._data.then(function (data) {
            try {
                return new Uint8Array(data.buffer, data.byteOffset + byteOffset, byteLength);
            }
            catch (e) {
                throw new Error("".concat(context, ": ").concat(e.message));
            }
        });
    };
    /**
     * Loads a glTF buffer view.
     * @param context The context when loading the asset
     * @param bufferView The glTF buffer view property
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    GLTFLoader.prototype.loadBufferViewAsync = function (context, bufferView) {
        var extensionPromise = this._extensionsLoadBufferViewAsync(context, bufferView);
        if (extensionPromise) {
            return extensionPromise;
        }
        if (bufferView._data) {
            return bufferView._data;
        }
        var buffer = ArrayItem.Get("".concat(context, "/buffer"), this._gltf.buffers, bufferView.buffer);
        bufferView._data = this.loadBufferAsync("/buffers/".concat(buffer.index), buffer, bufferView.byteOffset || 0, bufferView.byteLength);
        return bufferView._data;
    };
    GLTFLoader.prototype._loadAccessorAsync = function (context, accessor, constructor) {
        var _this = this;
        if (accessor._data) {
            return accessor._data;
        }
        var numComponents = GLTFLoader._GetNumComponents(context, accessor.type);
        var byteStride = numComponents * babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(accessor.componentType);
        var length = numComponents * accessor.count;
        if (accessor.bufferView == undefined) {
            accessor._data = Promise.resolve(new constructor(length));
        }
        else {
            var bufferView_1 = ArrayItem.Get("".concat(context, "/bufferView"), this._gltf.bufferViews, accessor.bufferView);
            accessor._data = this.loadBufferViewAsync("/bufferViews/".concat(bufferView_1.index), bufferView_1).then(function (data) {
                if (accessor.componentType === 5126 /* AccessorComponentType.FLOAT */ && !accessor.normalized && (!bufferView_1.byteStride || bufferView_1.byteStride === byteStride)) {
                    return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, length);
                }
                else {
                    var typedArray_1 = new constructor(length);
                    babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ForEach(data, accessor.byteOffset || 0, bufferView_1.byteStride || byteStride, numComponents, accessor.componentType, typedArray_1.length, accessor.normalized || false, function (value, index) {
                        typedArray_1[index] = value;
                    });
                    return typedArray_1;
                }
            });
        }
        if (accessor.sparse) {
            var sparse_1 = accessor.sparse;
            accessor._data = accessor._data.then(function (data) {
                var typedArray = data;
                var indicesBufferView = ArrayItem.Get("".concat(context, "/sparse/indices/bufferView"), _this._gltf.bufferViews, sparse_1.indices.bufferView);
                var valuesBufferView = ArrayItem.Get("".concat(context, "/sparse/values/bufferView"), _this._gltf.bufferViews, sparse_1.values.bufferView);
                return Promise.all([
                    _this.loadBufferViewAsync("/bufferViews/".concat(indicesBufferView.index), indicesBufferView),
                    _this.loadBufferViewAsync("/bufferViews/".concat(valuesBufferView.index), valuesBufferView),
                ]).then(function (_a) {
                    var indicesData = _a[0], valuesData = _a[1];
                    var indices = GLTFLoader._GetTypedArray("".concat(context, "/sparse/indices"), sparse_1.indices.componentType, indicesData, sparse_1.indices.byteOffset, sparse_1.count);
                    var sparseLength = numComponents * sparse_1.count;
                    var values;
                    if (accessor.componentType === 5126 /* AccessorComponentType.FLOAT */ && !accessor.normalized) {
                        values = GLTFLoader._GetTypedArray("".concat(context, "/sparse/values"), accessor.componentType, valuesData, sparse_1.values.byteOffset, sparseLength);
                    }
                    else {
                        var sparseData = GLTFLoader._GetTypedArray("".concat(context, "/sparse/values"), accessor.componentType, valuesData, sparse_1.values.byteOffset, sparseLength);
                        values = new constructor(sparseLength);
                        babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ForEach(sparseData, 0, byteStride, numComponents, accessor.componentType, values.length, accessor.normalized || false, function (value, index) {
                            values[index] = value;
                        });
                    }
                    var valuesIndex = 0;
                    for (var indicesIndex = 0; indicesIndex < indices.length; indicesIndex++) {
                        var dataIndex = indices[indicesIndex] * numComponents;
                        for (var componentIndex = 0; componentIndex < numComponents; componentIndex++) {
                            typedArray[dataIndex++] = values[valuesIndex++];
                        }
                    }
                    return typedArray;
                });
            });
        }
        return accessor._data;
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadFloatAccessorAsync = function (context, accessor) {
        return this._loadAccessorAsync(context, accessor, Float32Array);
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadIndicesAccessorAsync = function (context, accessor) {
        if (accessor.type !== "SCALAR" /* AccessorType.SCALAR */) {
            throw new Error("".concat(context, "/type: Invalid value ").concat(accessor.type));
        }
        if (accessor.componentType !== 5121 /* AccessorComponentType.UNSIGNED_BYTE */ &&
            accessor.componentType !== 5123 /* AccessorComponentType.UNSIGNED_SHORT */ &&
            accessor.componentType !== 5125 /* AccessorComponentType.UNSIGNED_INT */) {
            throw new Error("".concat(context, "/componentType: Invalid value ").concat(accessor.componentType));
        }
        if (accessor._data) {
            return accessor._data;
        }
        if (accessor.sparse) {
            var constructor = GLTFLoader._GetTypedArrayConstructor("".concat(context, "/componentType"), accessor.componentType);
            accessor._data = this._loadAccessorAsync(context, accessor, constructor);
        }
        else {
            var bufferView = ArrayItem.Get("".concat(context, "/bufferView"), this._gltf.bufferViews, accessor.bufferView);
            accessor._data = this.loadBufferViewAsync("/bufferViews/".concat(bufferView.index), bufferView).then(function (data) {
                return GLTFLoader._GetTypedArray(context, accessor.componentType, data, accessor.byteOffset, accessor.count);
            });
        }
        return accessor._data;
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadVertexBufferViewAsync = function (bufferView) {
        if (bufferView._babylonBuffer) {
            return bufferView._babylonBuffer;
        }
        var engine = this._babylonScene.getEngine();
        bufferView._babylonBuffer = this.loadBufferViewAsync("/bufferViews/".concat(bufferView.index), bufferView).then(function (data) {
            return new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Buffer(engine, data, false);
        });
        return bufferView._babylonBuffer;
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadVertexAccessorAsync = function (context, accessor, kind) {
        var _a;
        if ((_a = accessor._babylonVertexBuffer) === null || _a === void 0 ? void 0 : _a[kind]) {
            return accessor._babylonVertexBuffer[kind];
        }
        if (!accessor._babylonVertexBuffer) {
            accessor._babylonVertexBuffer = {};
        }
        var engine = this._babylonScene.getEngine();
        if (accessor.sparse || accessor.bufferView == undefined) {
            accessor._babylonVertexBuffer[kind] = this._loadFloatAccessorAsync(context, accessor).then(function (data) {
                return new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer(engine, data, kind, false);
            });
        }
        else {
            var bufferView_2 = ArrayItem.Get("".concat(context, "/bufferView"), this._gltf.bufferViews, accessor.bufferView);
            accessor._babylonVertexBuffer[kind] = this._loadVertexBufferViewAsync(bufferView_2).then(function (babylonBuffer) {
                var numComponents = GLTFLoader._GetNumComponents(context, accessor.type);
                return new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer(engine, babylonBuffer, kind, false, undefined, bufferView_2.byteStride, undefined, accessor.byteOffset, numComponents, accessor.componentType, accessor.normalized, true, undefined, true);
            });
        }
        return accessor._babylonVertexBuffer[kind];
    };
    GLTFLoader.prototype._loadMaterialMetallicRoughnessPropertiesAsync = function (context, properties, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        if (properties) {
            if (properties.baseColorFactor) {
                babylonMaterial.albedoColor = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(properties.baseColorFactor);
                babylonMaterial.alpha = properties.baseColorFactor[3];
            }
            else {
                babylonMaterial.albedoColor = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
            }
            babylonMaterial.metallic = properties.metallicFactor == undefined ? 1 : properties.metallicFactor;
            babylonMaterial.roughness = properties.roughnessFactor == undefined ? 1 : properties.roughnessFactor;
            if (properties.baseColorTexture) {
                promises.push(this.loadTextureInfoAsync("".concat(context, "/baseColorTexture"), properties.baseColorTexture, function (texture) {
                    texture.name = "".concat(babylonMaterial.name, " (Base Color)");
                    babylonMaterial.albedoTexture = texture;
                }));
            }
            if (properties.metallicRoughnessTexture) {
                properties.metallicRoughnessTexture.nonColorData = true;
                promises.push(this.loadTextureInfoAsync("".concat(context, "/metallicRoughnessTexture"), properties.metallicRoughnessTexture, function (texture) {
                    texture.name = "".concat(babylonMaterial.name, " (Metallic Roughness)");
                    babylonMaterial.metallicTexture = texture;
                }));
                babylonMaterial.useMetallnessFromMetallicTextureBlue = true;
                babylonMaterial.useRoughnessFromMetallicTextureGreen = true;
                babylonMaterial.useRoughnessFromMetallicTextureAlpha = false;
            }
        }
        return Promise.all(promises).then(function () { });
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
        if (assign === void 0) { assign = function () { }; }
        var extensionPromise = this._extensionsLoadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        material._data = material._data || {};
        var babylonData = material._data[babylonDrawMode];
        if (!babylonData) {
            this.logOpen("".concat(context, " ").concat(material.name || ""));
            var babylonMaterial = this.createMaterial(context, material, babylonDrawMode);
            babylonData = {
                babylonMaterial: babylonMaterial,
                babylonMeshes: [],
                promise: this.loadMaterialPropertiesAsync(context, material, babylonMaterial),
            };
            material._data[babylonDrawMode] = babylonData;
            GLTFLoader.AddPointerMetadata(babylonMaterial, context);
            this._parent.onMaterialLoadedObservable.notifyObservers(babylonMaterial);
            this.logClose();
        }
        if (babylonMesh) {
            babylonData.babylonMeshes.push(babylonMesh);
            babylonMesh.onDisposeObservable.addOnce(function () {
                var index = babylonData.babylonMeshes.indexOf(babylonMesh);
                if (index !== -1) {
                    babylonData.babylonMeshes.splice(index, 1);
                }
            });
        }
        assign(babylonData.babylonMaterial);
        return babylonData.promise.then(function () {
            return babylonData.babylonMaterial;
        });
    };
    GLTFLoader.prototype._createDefaultMaterial = function (name, babylonDrawMode) {
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        var babylonMaterial = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial(name, this._babylonScene);
        babylonMaterial._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        // Moved to mesh so user can change materials on gltf meshes: babylonMaterial.sideOrientation = this._babylonScene.useRightHandedSystem ? Material.CounterClockWiseSideOrientation : Material.ClockWiseSideOrientation;
        babylonMaterial.fillMode = babylonDrawMode;
        babylonMaterial.enableSpecularAntiAliasing = true;
        babylonMaterial.useRadianceOverAlpha = !this._parent.transparencyAsCoverage;
        babylonMaterial.useSpecularOverAlpha = !this._parent.transparencyAsCoverage;
        babylonMaterial.transparencyMode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_OPAQUE;
        babylonMaterial.metallic = 1;
        babylonMaterial.roughness = 1;
        return babylonMaterial;
    };
    /**
     * Creates a Babylon material from a glTF material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonDrawMode The draw mode for the Babylon material
     * @returns The Babylon material
     */
    GLTFLoader.prototype.createMaterial = function (context, material, babylonDrawMode) {
        var extensionPromise = this._extensionsCreateMaterial(context, material, babylonDrawMode);
        if (extensionPromise) {
            return extensionPromise;
        }
        var name = material.name || "material".concat(material.index);
        var babylonMaterial = this._createDefaultMaterial(name, babylonDrawMode);
        return babylonMaterial;
    };
    /**
     * Loads properties from a glTF material into a Babylon material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete
     */
    GLTFLoader.prototype.loadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        var extensionPromise = this._extensionsLoadMaterialPropertiesAsync(context, material, babylonMaterial);
        if (extensionPromise) {
            return extensionPromise;
        }
        var promises = new Array();
        promises.push(this.loadMaterialBasePropertiesAsync(context, material, babylonMaterial));
        if (material.pbrMetallicRoughness) {
            promises.push(this._loadMaterialMetallicRoughnessPropertiesAsync("".concat(context, "/pbrMetallicRoughness"), material.pbrMetallicRoughness, babylonMaterial));
        }
        this.loadMaterialAlphaProperties(context, material, babylonMaterial);
        return Promise.all(promises).then(function () { });
    };
    /**
     * Loads the normal, occlusion, and emissive properties from a glTF material into a Babylon material.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     * @returns A promise that resolves when the load is complete
     */
    GLTFLoader.prototype.loadMaterialBasePropertiesAsync = function (context, material, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var promises = new Array();
        babylonMaterial.emissiveColor = material.emissiveFactor ? babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(material.emissiveFactor) : new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Color3(0, 0, 0);
        if (material.doubleSided) {
            babylonMaterial.backFaceCulling = false;
            babylonMaterial.twoSidedLighting = true;
        }
        if (material.normalTexture) {
            material.normalTexture.nonColorData = true;
            promises.push(this.loadTextureInfoAsync("".concat(context, "/normalTexture"), material.normalTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Normal)");
                babylonMaterial.bumpTexture = texture;
            }));
            babylonMaterial.invertNormalMapX = !this._babylonScene.useRightHandedSystem;
            babylonMaterial.invertNormalMapY = this._babylonScene.useRightHandedSystem;
            if (material.normalTexture.scale != undefined && babylonMaterial.bumpTexture) {
                babylonMaterial.bumpTexture.level = material.normalTexture.scale;
            }
            babylonMaterial.forceIrradianceInFragment = true;
        }
        if (material.occlusionTexture) {
            material.occlusionTexture.nonColorData = true;
            promises.push(this.loadTextureInfoAsync("".concat(context, "/occlusionTexture"), material.occlusionTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Occlusion)");
                babylonMaterial.ambientTexture = texture;
            }));
            babylonMaterial.useAmbientInGrayScale = true;
            if (material.occlusionTexture.strength != undefined) {
                babylonMaterial.ambientTextureStrength = material.occlusionTexture.strength;
            }
        }
        if (material.emissiveTexture) {
            promises.push(this.loadTextureInfoAsync("".concat(context, "/emissiveTexture"), material.emissiveTexture, function (texture) {
                texture.name = "".concat(babylonMaterial.name, " (Emissive)");
                babylonMaterial.emissiveTexture = texture;
            }));
        }
        return Promise.all(promises).then(function () { });
    };
    /**
     * Loads the alpha properties from a glTF material into a Babylon material.
     * Must be called after the setting the albedo texture of the Babylon material when the material has an albedo texture.
     * @param context The context when loading the asset
     * @param material The glTF material property
     * @param babylonMaterial The Babylon material
     */
    GLTFLoader.prototype.loadMaterialAlphaProperties = function (context, material, babylonMaterial) {
        if (!(babylonMaterial instanceof babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial)) {
            throw new Error("".concat(context, ": Material type not supported"));
        }
        var alphaMode = material.alphaMode || "OPAQUE" /* MaterialAlphaMode.OPAQUE */;
        switch (alphaMode) {
            case "OPAQUE" /* MaterialAlphaMode.OPAQUE */: {
                babylonMaterial.transparencyMode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_OPAQUE;
                break;
            }
            case "MASK" /* MaterialAlphaMode.MASK */: {
                babylonMaterial.transparencyMode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_ALPHATEST;
                babylonMaterial.alphaCutOff = material.alphaCutoff == undefined ? 0.5 : material.alphaCutoff;
                if (babylonMaterial.albedoTexture) {
                    babylonMaterial.albedoTexture.hasAlpha = true;
                }
                break;
            }
            case "BLEND" /* MaterialAlphaMode.BLEND */: {
                babylonMaterial.transparencyMode = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial.PBRMATERIAL_ALPHABLEND;
                if (babylonMaterial.albedoTexture) {
                    babylonMaterial.albedoTexture.hasAlpha = true;
                    babylonMaterial.useAlphaFromAlbedoTexture = true;
                }
                break;
            }
            default: {
                throw new Error("".concat(context, "/alphaMode: Invalid value (").concat(material.alphaMode, ")"));
            }
        }
    };
    /**
     * Loads a glTF texture info.
     * @param context The context when loading the asset
     * @param textureInfo The glTF texture info property
     * @param assign A function called synchronously after parsing the glTF properties
     * @returns A promise that resolves with the loaded Babylon texture when the load is complete
     */
    GLTFLoader.prototype.loadTextureInfoAsync = function (context, textureInfo, assign) {
        var _this = this;
        if (assign === void 0) { assign = function () { }; }
        var extensionPromise = this._extensionsLoadTextureInfoAsync(context, textureInfo, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        this.logOpen("".concat(context));
        if (textureInfo.texCoord >= 6) {
            throw new Error("".concat(context, "/texCoord: Invalid value (").concat(textureInfo.texCoord, ")"));
        }
        var texture = ArrayItem.Get("".concat(context, "/index"), this._gltf.textures, textureInfo.index);
        texture._textureInfo = textureInfo;
        var promise = this._loadTextureAsync("/textures/".concat(textureInfo.index), texture, function (babylonTexture) {
            babylonTexture.coordinatesIndex = textureInfo.texCoord || 0;
            GLTFLoader.AddPointerMetadata(babylonTexture, context);
            _this._parent.onTextureLoadedObservable.notifyObservers(babylonTexture);
            assign(babylonTexture);
        });
        this.logClose();
        return promise;
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._loadTextureAsync = function (context, texture, assign) {
        if (assign === void 0) { assign = function () { }; }
        var extensionPromise = this._extensionsLoadTextureAsync(context, texture, assign);
        if (extensionPromise) {
            return extensionPromise;
        }
        this.logOpen("".concat(context, " ").concat(texture.name || ""));
        var sampler = texture.sampler == undefined ? GLTFLoader.DefaultSampler : ArrayItem.Get("".concat(context, "/sampler"), this._gltf.samplers, texture.sampler);
        var image = ArrayItem.Get("".concat(context, "/source"), this._gltf.images, texture.source);
        var promise = this._createTextureAsync(context, sampler, image, assign, undefined, !texture._textureInfo.nonColorData);
        this.logClose();
        return promise;
    };
    /**
     * @internal
     */
    GLTFLoader.prototype._createTextureAsync = function (context, sampler, image, assign, textureLoaderOptions, useSRGBBuffer) {
        var _this = this;
        if (assign === void 0) { assign = function () { }; }
        var samplerData = this._loadSampler("/samplers/".concat(sampler.index), sampler);
        var promises = new Array();
        var deferred = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Deferred();
        this._babylonScene._blockEntityCollection = !!this._assetContainer;
        var textureCreationOptions = {
            noMipmap: samplerData.noMipMaps,
            invertY: false,
            samplingMode: samplerData.samplingMode,
            onLoad: function () {
                if (!_this._disposed) {
                    deferred.resolve();
                }
            },
            onError: function (message, exception) {
                if (!_this._disposed) {
                    deferred.reject(new Error("".concat(context, ": ").concat(exception && exception.message ? exception.message : message || "Failed to load texture")));
                }
            },
            mimeType: image.mimeType,
            loaderOptions: textureLoaderOptions,
            useSRGBBuffer: !!useSRGBBuffer && this._parent.useSRGBBuffers,
        };
        var babylonTexture = new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture(null, this._babylonScene, textureCreationOptions);
        babylonTexture._parentContainer = this._assetContainer;
        this._babylonScene._blockEntityCollection = false;
        promises.push(deferred.promise);
        promises.push(this.loadImageAsync("/images/".concat(image.index), image).then(function (data) {
            var name = image.uri || "".concat(_this._fileName, "#image").concat(image.index);
            var dataUrl = "data:".concat(_this._uniqueRootUrl).concat(name);
            babylonTexture.updateURL(dataUrl, data);
        }));
        babylonTexture.wrapU = samplerData.wrapU;
        babylonTexture.wrapV = samplerData.wrapV;
        assign(babylonTexture);
        return Promise.all(promises).then(function () {
            return babylonTexture;
        });
    };
    GLTFLoader.prototype._loadSampler = function (context, sampler) {
        if (!sampler._data) {
            sampler._data = {
                noMipMaps: sampler.minFilter === 9728 /* TextureMinFilter.NEAREST */ || sampler.minFilter === 9729 /* TextureMinFilter.LINEAR */,
                samplingMode: GLTFLoader._GetTextureSamplingMode(context, sampler),
                wrapU: GLTFLoader._GetTextureWrapMode("".concat(context, "/wrapS"), sampler.wrapS),
                wrapV: GLTFLoader._GetTextureWrapMode("".concat(context, "/wrapT"), sampler.wrapT),
            };
        }
        return sampler._data;
    };
    /**
     * Loads a glTF image.
     * @param context The context when loading the asset
     * @param image The glTF image property
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    GLTFLoader.prototype.loadImageAsync = function (context, image) {
        if (!image._data) {
            this.logOpen("".concat(context, " ").concat(image.name || ""));
            if (image.uri) {
                image._data = this.loadUriAsync("".concat(context, "/uri"), image, image.uri);
            }
            else {
                var bufferView = ArrayItem.Get("".concat(context, "/bufferView"), this._gltf.bufferViews, image.bufferView);
                image._data = this.loadBufferViewAsync("/bufferViews/".concat(bufferView.index), bufferView);
            }
            this.logClose();
        }
        return image._data;
    };
    /**
     * Loads a glTF uri.
     * @param context The context when loading the asset
     * @param property The glTF property associated with the uri
     * @param uri The base64 or relative uri
     * @returns A promise that resolves with the loaded data when the load is complete
     */
    GLTFLoader.prototype.loadUriAsync = function (context, property, uri) {
        var _this = this;
        var extensionPromise = this._extensionsLoadUriAsync(context, property, uri);
        if (extensionPromise) {
            return extensionPromise;
        }
        if (!GLTFLoader._ValidateUri(uri)) {
            throw new Error("".concat(context, ": '").concat(uri, "' is invalid"));
        }
        if ((0,babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.IsBase64DataUrl)(uri)) {
            var data = new Uint8Array((0,babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.DecodeBase64UrlToBinary)(uri));
            this.log("".concat(context, ": Decoded ").concat(uri.substr(0, 64), "... (").concat(data.length, " bytes)"));
            return Promise.resolve(data);
        }
        this.log("".concat(context, ": Loading ").concat(uri));
        return this._parent.preprocessUrlAsync(this._rootUrl + uri).then(function (url) {
            return new Promise(function (resolve, reject) {
                _this._parent._loadFile(_this._babylonScene, url, function (data) {
                    if (!_this._disposed) {
                        _this.log("".concat(context, ": Loaded ").concat(uri, " (").concat(data.byteLength, " bytes)"));
                        resolve(new Uint8Array(data));
                    }
                }, true, function (request) {
                    reject(new babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.LoadFileError("".concat(context, ": Failed to load '").concat(uri, "'").concat(request ? ": " + request.status + " " + request.statusText : ""), request));
                });
            });
        });
    };
    /**
     * Adds a JSON pointer to the _internalMetadata of the Babylon object at `<object>._internalMetadata.gltf.pointers`.
     * @param babylonObject the Babylon object with _internalMetadata
     * @param pointer the JSON pointer
     */
    GLTFLoader.AddPointerMetadata = function (babylonObject, pointer) {
        babylonObject.metadata = babylonObject.metadata || {};
        var metadata = (babylonObject._internalMetadata = babylonObject._internalMetadata || {});
        var gltf = (metadata.gltf = metadata.gltf || {});
        var pointers = (gltf.pointers = gltf.pointers || []);
        pointers.push(pointer);
    };
    GLTFLoader._GetTextureWrapMode = function (context, mode) {
        // Set defaults if undefined
        mode = mode == undefined ? 10497 /* TextureWrapMode.REPEAT */ : mode;
        switch (mode) {
            case 33071 /* TextureWrapMode.CLAMP_TO_EDGE */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.CLAMP_ADDRESSMODE;
            case 33648 /* TextureWrapMode.MIRRORED_REPEAT */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.MIRROR_ADDRESSMODE;
            case 10497 /* TextureWrapMode.REPEAT */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
            default:
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Invalid value (").concat(mode, ")"));
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.WRAP_ADDRESSMODE;
        }
    };
    GLTFLoader._GetTextureSamplingMode = function (context, sampler) {
        // Set defaults if undefined
        var magFilter = sampler.magFilter == undefined ? 9729 /* TextureMagFilter.LINEAR */ : sampler.magFilter;
        var minFilter = sampler.minFilter == undefined ? 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */ : sampler.minFilter;
        if (magFilter === 9729 /* TextureMagFilter.LINEAR */) {
            switch (minFilter) {
                case 9728 /* TextureMinFilter.NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST;
                case 9729 /* TextureMinFilter.LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR;
                case 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPNEAREST;
                case 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPNEAREST;
                case 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_NEAREST_MIPLINEAR;
                case 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR;
                default:
                    babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, "/minFilter: Invalid value (").concat(minFilter, ")"));
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.LINEAR_LINEAR_MIPLINEAR;
            }
        }
        else {
            if (magFilter !== 9728 /* TextureMagFilter.NEAREST */) {
                babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, "/magFilter: Invalid value (").concat(magFilter, ")"));
            }
            switch (minFilter) {
                case 9728 /* TextureMinFilter.NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST;
                case 9729 /* TextureMinFilter.LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR;
                case 9984 /* TextureMinFilter.NEAREST_MIPMAP_NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST;
                case 9985 /* TextureMinFilter.LINEAR_MIPMAP_NEAREST */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPNEAREST;
                case 9986 /* TextureMinFilter.NEAREST_MIPMAP_LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPLINEAR;
                case 9987 /* TextureMinFilter.LINEAR_MIPMAP_LINEAR */:
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_LINEAR_MIPLINEAR;
                default:
                    babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, "/minFilter: Invalid value (").concat(minFilter, ")"));
                    return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Texture.NEAREST_NEAREST_MIPNEAREST;
            }
        }
    };
    GLTFLoader._GetTypedArrayConstructor = function (context, componentType) {
        switch (componentType) {
            case 5120 /* AccessorComponentType.BYTE */:
                return Int8Array;
            case 5121 /* AccessorComponentType.UNSIGNED_BYTE */:
                return Uint8Array;
            case 5122 /* AccessorComponentType.SHORT */:
                return Int16Array;
            case 5123 /* AccessorComponentType.UNSIGNED_SHORT */:
                return Uint16Array;
            case 5125 /* AccessorComponentType.UNSIGNED_INT */:
                return Uint32Array;
            case 5126 /* AccessorComponentType.FLOAT */:
                return Float32Array;
            default:
                throw new Error("".concat(context, ": Invalid component type ").concat(componentType));
        }
    };
    GLTFLoader._GetTypedArray = function (context, componentType, bufferView, byteOffset, length) {
        var buffer = bufferView.buffer;
        byteOffset = bufferView.byteOffset + (byteOffset || 0);
        var constructor = GLTFLoader._GetTypedArrayConstructor("".concat(context, "/componentType"), componentType);
        var componentTypeLength = babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.GetTypeByteLength(componentType);
        if (byteOffset % componentTypeLength !== 0) {
            // HACK: Copy the buffer if byte offset is not a multiple of component type byte length.
            babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("".concat(context, ": Copying buffer as byte offset (").concat(byteOffset, ") is not a multiple of component type byte length (").concat(componentTypeLength, ")"));
            return new constructor(buffer.slice(byteOffset, byteOffset + length * componentTypeLength), 0);
        }
        return new constructor(buffer, byteOffset, length);
    };
    GLTFLoader._GetNumComponents = function (context, type) {
        switch (type) {
            case "SCALAR":
                return 1;
            case "VEC2":
                return 2;
            case "VEC3":
                return 3;
            case "VEC4":
                return 4;
            case "MAT2":
                return 4;
            case "MAT3":
                return 9;
            case "MAT4":
                return 16;
        }
        throw new Error("".concat(context, ": Invalid type (").concat(type, ")"));
    };
    GLTFLoader._ValidateUri = function (uri) {
        return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Tools.IsBase64(uri) || uri.indexOf("..") === -1;
    };
    /**
     * @internal
     */
    GLTFLoader._GetDrawMode = function (context, mode) {
        if (mode == undefined) {
            mode = 4 /* MeshPrimitiveMode.TRIANGLES */;
        }
        switch (mode) {
            case 0 /* MeshPrimitiveMode.POINTS */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.PointListDrawMode;
            case 1 /* MeshPrimitiveMode.LINES */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineListDrawMode;
            case 2 /* MeshPrimitiveMode.LINE_LOOP */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineLoopDrawMode;
            case 3 /* MeshPrimitiveMode.LINE_STRIP */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.LineStripDrawMode;
            case 4 /* MeshPrimitiveMode.TRIANGLES */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFillMode;
            case 5 /* MeshPrimitiveMode.TRIANGLE_STRIP */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleStripDrawMode;
            case 6 /* MeshPrimitiveMode.TRIANGLE_FAN */:
                return babylonjs_Misc_deferred__WEBPACK_IMPORTED_MODULE_0__.Material.TriangleFanDrawMode;
        }
        throw new Error("".concat(context, ": Invalid mesh primitive mode (").concat(mode, ")"));
    };
    GLTFLoader.prototype._compileMaterialsAsync = function () {
        var _this = this;
        this._parent._startPerformanceCounter("Compile materials");
        var promises = new Array();
        if (this._gltf.materials) {
            for (var _i = 0, _a = this._gltf.materials; _i < _a.length; _i++) {
                var material = _a[_i];
                if (material._data) {
                    for (var babylonDrawMode in material._data) {
                        var babylonData = material._data[babylonDrawMode];
                        for (var _b = 0, _c = babylonData.babylonMeshes; _b < _c.length; _b++) {
                            var babylonMesh = _c[_b];
                            // Ensure nonUniformScaling is set if necessary.
                            babylonMesh.computeWorldMatrix(true);
                            var babylonMaterial = babylonData.babylonMaterial;
                            promises.push(babylonMaterial.forceCompilationAsync(babylonMesh));
                            promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { useInstances: true }));
                            if (this._parent.useClipPlane) {
                                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { clipPlane: true }));
                                promises.push(babylonMaterial.forceCompilationAsync(babylonMesh, { clipPlane: true, useInstances: true }));
                            }
                        }
                    }
                }
            }
        }
        return Promise.all(promises).then(function () {
            _this._parent._endPerformanceCounter("Compile materials");
        });
    };
    GLTFLoader.prototype._compileShadowGeneratorsAsync = function () {
        var _this = this;
        this._parent._startPerformanceCounter("Compile shadow generators");
        var promises = new Array();
        var lights = this._babylonScene.lights;
        for (var _i = 0, lights_1 = lights; _i < lights_1.length; _i++) {
            var light = lights_1[_i];
            var generator = light.getShadowGenerator();
            if (generator) {
                promises.push(generator.forceCompilationAsync());
            }
        }
        return Promise.all(promises).then(function () {
            _this._parent._endPerformanceCounter("Compile shadow generators");
        });
    };
    GLTFLoader.prototype._forEachExtensions = function (action) {
        for (var _i = 0, _a = this._extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            if (extension.enabled) {
                action(extension);
            }
        }
    };
    GLTFLoader.prototype._applyExtensions = function (property, functionName, actionAsync) {
        for (var _i = 0, _a = this._extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            if (extension.enabled) {
                var id = "".concat(extension.name, ".").concat(functionName);
                var loaderProperty = property;
                loaderProperty._activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions || {};
                var activeLoaderExtensionFunctions = loaderProperty._activeLoaderExtensionFunctions;
                if (!activeLoaderExtensionFunctions[id]) {
                    activeLoaderExtensionFunctions[id] = true;
                    try {
                        var result = actionAsync(extension);
                        if (result) {
                            return result;
                        }
                    }
                    finally {
                        delete activeLoaderExtensionFunctions[id];
                    }
                }
            }
        }
        return null;
    };
    GLTFLoader.prototype._extensionsOnLoading = function () {
        this._forEachExtensions(function (extension) { return extension.onLoading && extension.onLoading(); });
    };
    GLTFLoader.prototype._extensionsOnReady = function () {
        this._forEachExtensions(function (extension) { return extension.onReady && extension.onReady(); });
    };
    GLTFLoader.prototype._extensionsLoadSceneAsync = function (context, scene) {
        return this._applyExtensions(scene, "loadScene", function (extension) { return extension.loadSceneAsync && extension.loadSceneAsync(context, scene); });
    };
    GLTFLoader.prototype._extensionsLoadNodeAsync = function (context, node, assign) {
        return this._applyExtensions(node, "loadNode", function (extension) { return extension.loadNodeAsync && extension.loadNodeAsync(context, node, assign); });
    };
    GLTFLoader.prototype._extensionsLoadCameraAsync = function (context, camera, assign) {
        return this._applyExtensions(camera, "loadCamera", function (extension) { return extension.loadCameraAsync && extension.loadCameraAsync(context, camera, assign); });
    };
    GLTFLoader.prototype._extensionsLoadVertexDataAsync = function (context, primitive, babylonMesh) {
        return this._applyExtensions(primitive, "loadVertexData", function (extension) { return extension._loadVertexDataAsync && extension._loadVertexDataAsync(context, primitive, babylonMesh); });
    };
    GLTFLoader.prototype._extensionsLoadMeshPrimitiveAsync = function (context, name, node, mesh, primitive, assign) {
        return this._applyExtensions(primitive, "loadMeshPrimitive", function (extension) { return extension._loadMeshPrimitiveAsync && extension._loadMeshPrimitiveAsync(context, name, node, mesh, primitive, assign); });
    };
    GLTFLoader.prototype._extensionsLoadMaterialAsync = function (context, material, babylonMesh, babylonDrawMode, assign) {
        return this._applyExtensions(material, "loadMaterial", function (extension) { return extension._loadMaterialAsync && extension._loadMaterialAsync(context, material, babylonMesh, babylonDrawMode, assign); });
    };
    GLTFLoader.prototype._extensionsCreateMaterial = function (context, material, babylonDrawMode) {
        return this._applyExtensions(material, "createMaterial", function (extension) { return extension.createMaterial && extension.createMaterial(context, material, babylonDrawMode); });
    };
    GLTFLoader.prototype._extensionsLoadMaterialPropertiesAsync = function (context, material, babylonMaterial) {
        return this._applyExtensions(material, "loadMaterialProperties", function (extension) { return extension.loadMaterialPropertiesAsync && extension.loadMaterialPropertiesAsync(context, material, babylonMaterial); });
    };
    GLTFLoader.prototype._extensionsLoadTextureInfoAsync = function (context, textureInfo, assign) {
        return this._applyExtensions(textureInfo, "loadTextureInfo", function (extension) { return extension.loadTextureInfoAsync && extension.loadTextureInfoAsync(context, textureInfo, assign); });
    };
    GLTFLoader.prototype._extensionsLoadTextureAsync = function (context, texture, assign) {
        return this._applyExtensions(texture, "loadTexture", function (extension) { return extension._loadTextureAsync && extension._loadTextureAsync(context, texture, assign); });
    };
    GLTFLoader.prototype._extensionsLoadAnimationAsync = function (context, animation) {
        return this._applyExtensions(animation, "loadAnimation", function (extension) { return extension.loadAnimationAsync && extension.loadAnimationAsync(context, animation); });
    };
    GLTFLoader.prototype._extensionsLoadAnimationChannelAsync = function (context, animationContext, animation, channel, onLoad) {
        return this._applyExtensions(animation, "loadAnimationChannel", function (extension) { return extension._loadAnimationChannelAsync && extension._loadAnimationChannelAsync(context, animationContext, animation, channel, onLoad); });
    };
    GLTFLoader.prototype._extensionsLoadSkinAsync = function (context, node, skin) {
        return this._applyExtensions(skin, "loadSkin", function (extension) { return extension._loadSkinAsync && extension._loadSkinAsync(context, node, skin); });
    };
    GLTFLoader.prototype._extensionsLoadUriAsync = function (context, property, uri) {
        return this._applyExtensions(property, "loadUri", function (extension) { return extension._loadUriAsync && extension._loadUriAsync(context, property, uri); });
    };
    GLTFLoader.prototype._extensionsLoadBufferViewAsync = function (context, bufferView) {
        return this._applyExtensions(bufferView, "loadBufferView", function (extension) { return extension.loadBufferViewAsync && extension.loadBufferViewAsync(context, bufferView); });
    };
    GLTFLoader.prototype._extensionsLoadBufferAsync = function (context, buffer, byteOffset, byteLength) {
        return this._applyExtensions(buffer, "loadBuffer", function (extension) { return extension.loadBufferAsync && extension.loadBufferAsync(context, buffer, byteOffset, byteLength); });
    };
    /**
     * Helper method called by a loader extension to load an glTF extension.
     * @param context The context when loading the asset
     * @param property The glTF property to load the extension from
     * @param extensionName The name of the extension to load
     * @param actionAsync The action to run
     * @returns The promise returned by actionAsync or null if the extension does not exist
     */
    GLTFLoader.LoadExtensionAsync = function (context, property, extensionName, actionAsync) {
        if (!property.extensions) {
            return null;
        }
        var extensions = property.extensions;
        var extension = extensions[extensionName];
        if (!extension) {
            return null;
        }
        return actionAsync("".concat(context, "/extensions/").concat(extensionName), extension);
    };
    /**
     * Helper method called by a loader extension to load a glTF extra.
     * @param context The context when loading the asset
     * @param property The glTF property to load the extra from
     * @param extensionName The name of the extension to load
     * @param actionAsync The action to run
     * @returns The promise returned by actionAsync or null if the extra does not exist
     */
    GLTFLoader.LoadExtraAsync = function (context, property, extensionName, actionAsync) {
        if (!property.extras) {
            return null;
        }
        var extras = property.extras;
        var extra = extras[extensionName];
        if (!extra) {
            return null;
        }
        return actionAsync("".concat(context, "/extras/").concat(extensionName), extra);
    };
    /**
     * Checks for presence of an extension.
     * @param name The name of the extension to check
     * @returns A boolean indicating the presence of the given extension name in `extensionsUsed`
     */
    GLTFLoader.prototype.isExtensionUsed = function (name) {
        return !!this._gltf.extensionsUsed && this._gltf.extensionsUsed.indexOf(name) !== -1;
    };
    /**
     * Increments the indentation level and logs a message.
     * @param message The message to log
     */
    GLTFLoader.prototype.logOpen = function (message) {
        this._parent._logOpen(message);
    };
    /**
     * Decrements the indentation level.
     */
    GLTFLoader.prototype.logClose = function () {
        this._parent._logClose();
    };
    /**
     * Logs a message
     * @param message The message to log
     */
    GLTFLoader.prototype.log = function (message) {
        this._parent._log(message);
    };
    /**
     * Starts a performance counter.
     * @param counterName The name of the performance counter
     */
    GLTFLoader.prototype.startPerformanceCounter = function (counterName) {
        this._parent._startPerformanceCounter(counterName);
    };
    /**
     * Ends a performance counter.
     * @param counterName The name of the performance counter
     */
    GLTFLoader.prototype.endPerformanceCounter = function (counterName) {
        this._parent._endPerformanceCounter(counterName);
    };
    GLTFLoader._RegisteredExtensions = {};
    /**
     * The default glTF sampler.
     */
    GLTFLoader.DefaultSampler = { index: -1 };
    return GLTFLoader;
}());
_glTFFileLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFFileLoader._CreateGLTF2Loader = function (parent) { return new GLTFLoader(parent); };


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/glTFLoaderAnimation.ts":
/*!****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/glTFLoaderAnimation.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationPropertyInfo: () => (/* binding */ AnimationPropertyInfo),
/* harmony export */   TransformNodeAnimationPropertyInfo: () => (/* binding */ TransformNodeAnimationPropertyInfo),
/* harmony export */   WeightAnimationPropertyInfo: () => (/* binding */ WeightAnimationPropertyInfo),
/* harmony export */   getQuaternion: () => (/* binding */ getQuaternion),
/* harmony export */   getVector3: () => (/* binding */ getVector3),
/* harmony export */   getWeights: () => (/* binding */ getWeights),
/* harmony export */   nodeAnimationData: () => (/* binding */ nodeAnimationData)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Maths/math.vector */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__);



/** @internal */
function getVector3(_target, source, offset, scale) {
    return babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Vector3.FromArray(source, offset).scaleInPlace(scale);
}
/** @internal */
function getQuaternion(_target, source, offset, scale) {
    return babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Quaternion.FromArray(source, offset).scaleInPlace(scale);
}
/** @internal */
function getWeights(target, source, offset, scale) {
    var value = new Array(target._numMorphTargets);
    for (var i = 0; i < value.length; i++) {
        value[i] = source[offset++] * scale;
    }
    return value;
}
/** @internal */
var AnimationPropertyInfo = /** @class */ (function () {
    /** @internal */
    function AnimationPropertyInfo(type, name, getValue, getStride) {
        this.type = type;
        this.name = name;
        this.getValue = getValue;
        this.getStride = getStride;
    }
    AnimationPropertyInfo.prototype._buildAnimation = function (name, fps, keys) {
        var babylonAnimation = new babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation(name, this.name, fps, this.type);
        babylonAnimation.setKeys(keys);
        return babylonAnimation;
    };
    return AnimationPropertyInfo;
}());

/** @internal */
var TransformNodeAnimationPropertyInfo = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(TransformNodeAnimationPropertyInfo, _super);
    function TransformNodeAnimationPropertyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @internal */
    TransformNodeAnimationPropertyInfo.prototype.buildAnimations = function (target, name, fps, keys, callback) {
        callback(target._babylonTransformNode, this._buildAnimation(name, fps, keys));
    };
    return TransformNodeAnimationPropertyInfo;
}(AnimationPropertyInfo));

/** @internal */
var WeightAnimationPropertyInfo = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(WeightAnimationPropertyInfo, _super);
    function WeightAnimationPropertyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeightAnimationPropertyInfo.prototype.buildAnimations = function (target, name, fps, keys, callback) {
        if (target._numMorphTargets) {
            var _loop_1 = function (targetIndex) {
                var babylonAnimation = new babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation("".concat(name, "_").concat(targetIndex), this_1.name, fps, this_1.type);
                babylonAnimation.setKeys(keys.map(function (key) { return ({
                    frame: key.frame,
                    inTangent: key.inTangent ? key.inTangent[targetIndex] : undefined,
                    value: key.value[targetIndex],
                    outTangent: key.outTangent ? key.outTangent[targetIndex] : undefined,
                    interpolation: key.interpolation,
                }); }));
                if (target._primitiveBabylonMeshes) {
                    for (var _i = 0, _a = target._primitiveBabylonMeshes; _i < _a.length; _i++) {
                        var babylonMesh = _a[_i];
                        if (babylonMesh.morphTargetManager) {
                            var morphTarget = babylonMesh.morphTargetManager.getTarget(targetIndex);
                            var babylonAnimationClone = babylonAnimation.clone();
                            morphTarget.animations.push(babylonAnimationClone);
                            callback(morphTarget, babylonAnimationClone);
                        }
                    }
                }
            };
            var this_1 = this;
            for (var targetIndex = 0; targetIndex < target._numMorphTargets; targetIndex++) {
                _loop_1(targetIndex);
            }
        }
    };
    return WeightAnimationPropertyInfo;
}(AnimationPropertyInfo));

/** @internal */
var nodeAnimationData = {
    translation: [new TransformNodeAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3, "position", getVector3, function () { return 3; })],
    rotation: [new TransformNodeAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_QUATERNION, "rotationQuaternion", getQuaternion, function () { return 4; })],
    scale: [new TransformNodeAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_VECTOR3, "scaling", getVector3, function () { return 3; })],
    weights: [new WeightAnimationPropertyInfo(babylonjs_Animations_animation__WEBPACK_IMPORTED_MODULE_0__.Animation.ANIMATIONTYPE_FLOAT, "influence", getWeights, function (target) { return target._numMorphTargets; })],
};


/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/glTFLoaderExtension.ts":
/*!****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/glTFLoaderExtension.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/glTFLoaderInterfaces.ts":
/*!*****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/glTFLoaderInterfaces.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/glTF/2.0/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/loaders/src/glTF/2.0/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayItem: () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.ArrayItem),
/* harmony export */   EXT_lights_image_based: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_lights_image_based),
/* harmony export */   EXT_mesh_gpu_instancing: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_mesh_gpu_instancing),
/* harmony export */   EXT_meshopt_compression: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_meshopt_compression),
/* harmony export */   EXT_texture_webp: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.EXT_texture_webp),
/* harmony export */   ExtrasAsMetadata: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.ExtrasAsMetadata),
/* harmony export */   GLTFLoader: () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader),
/* harmony export */   KHR_animation_pointer: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_animation_pointer),
/* harmony export */   KHR_draco_mesh_compression: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_draco_mesh_compression),
/* harmony export */   KHR_lights: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_lights),
/* harmony export */   KHR_materials_anisotropy: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_anisotropy),
/* harmony export */   KHR_materials_clearcoat: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_clearcoat),
/* harmony export */   KHR_materials_emissive_strength: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_emissive_strength),
/* harmony export */   KHR_materials_ior: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_ior),
/* harmony export */   KHR_materials_iridescence: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_iridescence),
/* harmony export */   KHR_materials_pbrSpecularGlossiness: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_pbrSpecularGlossiness),
/* harmony export */   KHR_materials_sheen: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_sheen),
/* harmony export */   KHR_materials_specular: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_specular),
/* harmony export */   KHR_materials_translucency: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_translucency),
/* harmony export */   KHR_materials_transmission: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_transmission),
/* harmony export */   KHR_materials_unlit: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_unlit),
/* harmony export */   KHR_materials_variants: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_variants),
/* harmony export */   KHR_materials_volume: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_materials_volume),
/* harmony export */   KHR_mesh_quantization: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_mesh_quantization),
/* harmony export */   KHR_texture_basisu: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_texture_basisu),
/* harmony export */   KHR_texture_transform: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_texture_transform),
/* harmony export */   KHR_xmp_json_ld: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.KHR_xmp_json_ld),
/* harmony export */   MSFT_audio_emitter: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_audio_emitter),
/* harmony export */   MSFT_lod: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_lod),
/* harmony export */   MSFT_minecraftMesh: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_minecraftMesh),
/* harmony export */   MSFT_sRGBFactors: () => (/* reexport safe */ _Extensions_index__WEBPACK_IMPORTED_MODULE_3__.MSFT_sRGBFactors)
/* harmony export */ });
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../dev/loaders/src/glTF/2.0/glTFLoader.ts");
/* harmony import */ var _glTFLoaderExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoaderExtension */ "../../../dev/loaders/src/glTF/2.0/glTFLoaderExtension.ts");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/2.0/glTFLoaderInterfaces.ts");
/* harmony import */ var _Extensions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Extensions/index */ "../../../dev/loaders/src/glTF/2.0/Extensions/index.ts");
/* eslint-disable import/no-internal-modules */






/***/ }),

/***/ "../../../dev/loaders/src/glTF/glTFFileLoader.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/glTFFileLoader.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFFileLoader: () => (/* binding */ GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* binding */ GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* binding */ GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* binding */ GLTFLoaderState)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/error */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFValidation */ "../../../dev/loaders/src/glTF/glTFValidation.ts");









function readAsync(arrayBuffer, byteOffset, byteLength) {
    try {
        return Promise.resolve(new Uint8Array(arrayBuffer, byteOffset, byteLength));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
function readViewAsync(arrayBufferView, byteOffset, byteLength) {
    try {
        if (arrayBufferView.byteOffset + byteLength > arrayBufferView.byteLength) {
            throw new Error("Array length out of bounds.");
        }
        return Promise.resolve(new Uint8Array(arrayBufferView.buffer, arrayBufferView.byteOffset + byteOffset, byteLength));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
/**
 * Mode that determines the coordinate system to use.
 */
var GLTFLoaderCoordinateSystemMode;
(function (GLTFLoaderCoordinateSystemMode) {
    /**
     * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
     */
    GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["AUTO"] = 0] = "AUTO";
    /**
     * Sets the useRightHandedSystem flag on the scene.
     */
    GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["FORCE_RIGHT_HANDED"] = 1] = "FORCE_RIGHT_HANDED";
})(GLTFLoaderCoordinateSystemMode || (GLTFLoaderCoordinateSystemMode = {}));
/**
 * Mode that determines what animations will start.
 */
var GLTFLoaderAnimationStartMode;
(function (GLTFLoaderAnimationStartMode) {
    /**
     * No animation will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["NONE"] = 0] = "NONE";
    /**
     * The first animation will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["FIRST"] = 1] = "FIRST";
    /**
     * All animations will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["ALL"] = 2] = "ALL";
})(GLTFLoaderAnimationStartMode || (GLTFLoaderAnimationStartMode = {}));
/**
 * Loader state.
 */
var GLTFLoaderState;
(function (GLTFLoaderState) {
    /**
     * The asset is loading.
     */
    GLTFLoaderState[GLTFLoaderState["LOADING"] = 0] = "LOADING";
    /**
     * The asset is ready for rendering.
     */
    GLTFLoaderState[GLTFLoaderState["READY"] = 1] = "READY";
    /**
     * The asset is completely loaded.
     */
    GLTFLoaderState[GLTFLoaderState["COMPLETE"] = 2] = "COMPLETE";
})(GLTFLoaderState || (GLTFLoaderState = {}));
/**
 * File loader for loading glTF files into a scene.
 */
var GLTFFileLoader = /** @class */ (function () {
    function GLTFFileLoader() {
        // --------------
        // Common options
        // --------------
        /**
         * Raised when the asset has been parsed
         */
        this.onParsedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        // ----------
        // V2 options
        // ----------
        /**
         * The coordinate system mode. Defaults to AUTO.
         */
        this.coordinateSystemMode = GLTFLoaderCoordinateSystemMode.AUTO;
        /**
         * The animation start mode. Defaults to FIRST.
         */
        this.animationStartMode = GLTFLoaderAnimationStartMode.FIRST;
        /**
         * Defines if the loader should compile materials before raising the success callback. Defaults to false.
         */
        this.compileMaterials = false;
        /**
         * Defines if the loader should also compile materials with clip planes. Defaults to false.
         */
        this.useClipPlane = false;
        /**
         * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
         */
        this.compileShadowGenerators = false;
        /**
         * Defines if the Alpha blended materials are only applied as coverage.
         * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
         * If true, no extra effects are applied to transparent pixels.
         */
        this.transparencyAsCoverage = false;
        /**
         * Defines if the loader should use range requests when load binary glTF files from HTTP.
         * Enabling will disable offline support and glTF validator.
         * Defaults to false.
         */
        this.useRangeRequests = false;
        /**
         * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
         */
        this.createInstances = true;
        /**
         * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
         */
        this.alwaysComputeBoundingBox = false;
        /**
         * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
         */
        this.loadAllMaterials = false;
        /**
         * If true, load only the materials defined in the file. Defaults to false.
         */
        this.loadOnlyMaterials = false;
        /**
         * If true, do not load any materials defined in the file. Defaults to false.
         */
        this.skipMaterials = false;
        /**
         * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
         */
        this.useSRGBBuffers = true;
        /**
         * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
         */
        this.targetFps = 60;
        /**
         * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
         * Set this to true if loading assets with invalid `skin.skeleton` values.
         */
        this.alwaysComputeSkeletonRootNode = false;
        /**
         * Function called before loading a url referenced by the asset.
         * @param url
         */
        this.preprocessUrlAsync = function (url) { return Promise.resolve(url); };
        /**
         * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        this.onMeshLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         * @param node - the transform node that corresponds to the original glTF skin node used for animations
         * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
         */
        this.onSkinLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        this.onTextureLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a material after parsing the glTF properties of the material.
         */
        this.onMaterialLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        this.onCameraLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        this.onCompleteObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when an error occurs.
         */
        this.onErrorObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised after the loader is disposed.
         */
        this.onDisposeObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised after a loader extension is created.
         * Set additional options for a loader extension in this event.
         */
        this.onExtensionLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Defines if the loader should validate the asset.
         */
        this.validate = false;
        /**
         * Observable raised after validation when validate is set to true. The event data is the result of the validation.
         */
        this.onValidatedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        this._loader = null;
        this._state = null;
        this._requests = new Array();
        /**
         * Name of the loader ("gltf")
         */
        this.name = "gltf";
        /** @internal */
        this.extensions = {
            ".gltf": { isBinary: false },
            ".glb": { isBinary: true },
        };
        /**
         * Observable raised when the loader state changes.
         */
        this.onLoaderStateChangedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        this._logIndentLevel = 0;
        this._loggingEnabled = false;
        /** @internal */
        this._log = this._logDisabled;
        this._capturePerformanceCounters = false;
        /** @internal */
        this._startPerformanceCounter = this._startPerformanceCounterDisabled;
        /** @internal */
        this._endPerformanceCounter = this._endPerformanceCounterDisabled;
    }
    Object.defineProperty(GLTFFileLoader.prototype, "onParsed", {
        /**
         * Raised when the asset has been parsed
         */
        set: function (callback) {
            if (this._onParsedObserver) {
                this.onParsedObservable.remove(this._onParsedObserver);
            }
            this._onParsedObserver = this.onParsedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onMeshLoaded", {
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        set: function (callback) {
            if (this._onMeshLoadedObserver) {
                this.onMeshLoadedObservable.remove(this._onMeshLoadedObserver);
            }
            this._onMeshLoadedObserver = this.onMeshLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onTextureLoaded", {
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        set: function (callback) {
            if (this._onTextureLoadedObserver) {
                this.onTextureLoadedObservable.remove(this._onTextureLoadedObserver);
            }
            this._onTextureLoadedObserver = this.onTextureLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onMaterialLoaded", {
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        set: function (callback) {
            if (this._onMaterialLoadedObserver) {
                this.onMaterialLoadedObservable.remove(this._onMaterialLoadedObserver);
            }
            this._onMaterialLoadedObserver = this.onMaterialLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onCameraLoaded", {
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        set: function (callback) {
            if (this._onCameraLoadedObserver) {
                this.onCameraLoadedObservable.remove(this._onCameraLoadedObserver);
            }
            this._onCameraLoadedObserver = this.onCameraLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onComplete", {
        /**
         * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        set: function (callback) {
            if (this._onCompleteObserver) {
                this.onCompleteObservable.remove(this._onCompleteObserver);
            }
            this._onCompleteObserver = this.onCompleteObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onError", {
        /**
         * Callback raised when an error occurs.
         */
        set: function (callback) {
            if (this._onErrorObserver) {
                this.onErrorObservable.remove(this._onErrorObserver);
            }
            this._onErrorObserver = this.onErrorObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onDispose", {
        /**
         * Callback raised after the loader is disposed.
         */
        set: function (callback) {
            if (this._onDisposeObserver) {
                this.onDisposeObservable.remove(this._onDisposeObserver);
            }
            this._onDisposeObserver = this.onDisposeObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onExtensionLoaded", {
        /**
         * Callback raised after a loader extension is created.
         */
        set: function (callback) {
            if (this._onExtensionLoadedObserver) {
                this.onExtensionLoadedObservable.remove(this._onExtensionLoadedObserver);
            }
            this._onExtensionLoadedObserver = this.onExtensionLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "loggingEnabled", {
        /**
         * Defines if the loader logging is enabled.
         */
        get: function () {
            return this._loggingEnabled;
        },
        set: function (value) {
            if (this._loggingEnabled === value) {
                return;
            }
            this._loggingEnabled = value;
            if (this._loggingEnabled) {
                this._log = this._logEnabled;
            }
            else {
                this._log = this._logDisabled;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "capturePerformanceCounters", {
        /**
         * Defines if the loader should capture performance counters.
         */
        get: function () {
            return this._capturePerformanceCounters;
        },
        set: function (value) {
            if (this._capturePerformanceCounters === value) {
                return;
            }
            this._capturePerformanceCounters = value;
            if (this._capturePerformanceCounters) {
                this._startPerformanceCounter = this._startPerformanceCounterEnabled;
                this._endPerformanceCounter = this._endPerformanceCounterEnabled;
            }
            else {
                this._startPerformanceCounter = this._startPerformanceCounterDisabled;
                this._endPerformanceCounter = this._endPerformanceCounterDisabled;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onValidated", {
        /**
         * Callback raised after a loader extension is created.
         */
        set: function (callback) {
            if (this._onValidatedObserver) {
                this.onValidatedObservable.remove(this._onValidatedObserver);
            }
            this._onValidatedObserver = this.onValidatedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Disposes the loader, releases resources during load, and cancels any outstanding requests.
     */
    GLTFFileLoader.prototype.dispose = function () {
        if (this._loader) {
            this._loader.dispose();
            this._loader = null;
        }
        for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
            var request = _a[_i];
            request.abort();
        }
        this._requests.length = 0;
        delete this._progressCallback;
        this.preprocessUrlAsync = function (url) { return Promise.resolve(url); };
        this.onMeshLoadedObservable.clear();
        this.onSkinLoadedObservable.clear();
        this.onTextureLoadedObservable.clear();
        this.onMaterialLoadedObservable.clear();
        this.onCameraLoadedObservable.clear();
        this.onCompleteObservable.clear();
        this.onExtensionLoadedObservable.clear();
        this.onDisposeObservable.notifyObservers(undefined);
        this.onDisposeObservable.clear();
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadFile = function (scene, fileOrUrl, rootUrl, onSuccess, onProgress, useArrayBuffer, onError, name) {
        var _this = this;
        if (ArrayBuffer.isView(fileOrUrl)) {
            this._loadBinary(scene, fileOrUrl, rootUrl, onSuccess, onError, name);
            return null;
        }
        this._progressCallback = onProgress;
        var fileName = fileOrUrl.name || babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.GetFilename(fileOrUrl);
        if (useArrayBuffer) {
            if (this.useRangeRequests) {
                if (this.validate) {
                    babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("glTF validation is not supported when range requests are enabled");
                }
                var fileRequest_1 = {
                    abort: function () { },
                    onCompleteObservable: new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(),
                };
                var dataBuffer = {
                    readAsync: function (byteOffset, byteLength) {
                        return new Promise(function (resolve, reject) {
                            _this._loadFile(scene, fileOrUrl, function (data) {
                                resolve(new Uint8Array(data));
                            }, true, function (error) {
                                reject(error);
                            }, function (webRequest) {
                                webRequest.setRequestHeader("Range", "bytes=".concat(byteOffset, "-").concat(byteOffset + byteLength - 1));
                            });
                        });
                    },
                    byteLength: 0,
                };
                this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader(dataBuffer)).then(function (loaderData) {
                    fileRequest_1.onCompleteObservable.notifyObservers(fileRequest_1);
                    onSuccess(loaderData);
                }, onError ? function (error) { return onError(undefined, error); } : undefined);
                return fileRequest_1;
            }
            return this._loadFile(scene, fileOrUrl, function (data) {
                _this._validate(scene, new Uint8Array(data), rootUrl, fileName);
                _this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                    readAsync: function (byteOffset, byteLength) { return readAsync(data, byteOffset, byteLength); },
                    byteLength: data.byteLength,
                })).then(function (loaderData) {
                    onSuccess(loaderData);
                }, onError ? function (error) { return onError(undefined, error); } : undefined);
            }, true, onError);
        }
        return this._loadFile(scene, fileOrUrl, function (data) {
            _this._validate(scene, new Uint8Array(data), rootUrl, fileName);
            onSuccess({ json: _this._parseJson(data) });
        }, useArrayBuffer, onError);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._loadBinary = function (scene, data, rootUrl, onSuccess, onError, fileName) {
        this._validate(scene, data, rootUrl, fileName);
        this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
            readAsync: function (byteOffset, byteLength) { return readViewAsync(data, byteOffset, byteLength); },
            byteLength: data.byteLength,
        })).then(function (loaderData) {
            onSuccess(loaderData);
        }, onError ? function (error) { return onError(undefined, error); } : undefined);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            return _this._loader.importMeshAsync(meshesNames, scene, null, data, rootUrl, onProgress, fileName);
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            return _this._loader.loadAsync(scene, data, rootUrl, onProgress, fileName);
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            // Prepare the asset container.
            var container = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
            // Get materials/textures when loading to add to container
            var materials = [];
            _this.onMaterialLoadedObservable.add(function (material) {
                materials.push(material);
            });
            var textures = [];
            _this.onTextureLoadedObservable.add(function (texture) {
                textures.push(texture);
            });
            var cameras = [];
            _this.onCameraLoadedObservable.add(function (camera) {
                cameras.push(camera);
            });
            var morphTargetManagers = [];
            _this.onMeshLoadedObservable.add(function (mesh) {
                if (mesh.morphTargetManager) {
                    morphTargetManagers.push(mesh.morphTargetManager);
                }
            });
            return _this._loader.importMeshAsync(null, scene, container, data, rootUrl, onProgress, fileName).then(function (result) {
                Array.prototype.push.apply(container.geometries, result.geometries);
                Array.prototype.push.apply(container.meshes, result.meshes);
                Array.prototype.push.apply(container.particleSystems, result.particleSystems);
                Array.prototype.push.apply(container.skeletons, result.skeletons);
                Array.prototype.push.apply(container.animationGroups, result.animationGroups);
                Array.prototype.push.apply(container.materials, materials);
                Array.prototype.push.apply(container.textures, textures);
                Array.prototype.push.apply(container.lights, result.lights);
                Array.prototype.push.apply(container.transformNodes, result.transformNodes);
                Array.prototype.push.apply(container.cameras, cameras);
                Array.prototype.push.apply(container.morphTargetManagers, morphTargetManagers);
                return container;
            });
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.canDirectLoad = function (data) {
        return ((data.indexOf("asset") !== -1 && data.indexOf("version") !== -1) ||
            data.startsWith("data:base64," + GLTFFileLoader._MagicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
            data.startsWith("data:;base64," + GLTFFileLoader._MagicBase64Encoded) ||
            data.startsWith("data:application/octet-stream;base64," + GLTFFileLoader._MagicBase64Encoded) ||
            data.startsWith("data:model/gltf-binary;base64," + GLTFFileLoader._MagicBase64Encoded));
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.directLoad = function (scene, data) {
        if (data.startsWith("base64," + GLTFFileLoader._MagicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
            data.startsWith(";base64," + GLTFFileLoader._MagicBase64Encoded) ||
            data.startsWith("application/octet-stream;base64," + GLTFFileLoader._MagicBase64Encoded) ||
            data.startsWith("model/gltf-binary;base64," + GLTFFileLoader._MagicBase64Encoded)) {
            var arrayBuffer_1 = (0,babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DecodeBase64UrlToBinary)(data);
            this._validate(scene, new Uint8Array(arrayBuffer_1));
            return this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                readAsync: function (byteOffset, byteLength) { return readAsync(arrayBuffer_1, byteOffset, byteLength); },
                byteLength: arrayBuffer_1.byteLength,
            }));
        }
        this._validate(scene, data);
        return Promise.resolve({ json: this._parseJson(data) });
    };
    /** @internal */
    GLTFFileLoader.prototype.createPlugin = function () {
        return new GLTFFileLoader();
    };
    Object.defineProperty(GLTFFileLoader.prototype, "loaderState", {
        /**
         * The loader state or null if the loader is not active.
         */
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a promise that resolves when the asset is completely loaded.
     * @returns a promise that resolves when the asset is completely loaded.
     */
    GLTFFileLoader.prototype.whenCompleteAsync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onCompleteObservable.addOnce(function () {
                resolve();
            });
            _this.onErrorObservable.addOnce(function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._setState = function (state) {
        if (this._state === state) {
            return;
        }
        this._state = state;
        this.onLoaderStateChangedObservable.notifyObservers(this._state);
        this._log(GLTFLoaderState[this._state]);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._loadFile = function (scene, fileOrUrl, onSuccess, useArrayBuffer, onError, onOpened) {
        var _this = this;
        var request = scene._loadFile(fileOrUrl, onSuccess, function (event) {
            _this._onProgress(event, request);
        }, true, useArrayBuffer, onError, onOpened);
        request.onCompleteObservable.add(function (request) {
            _this._requests.splice(_this._requests.indexOf(request), 1);
        });
        this._requests.push(request);
        return request;
    };
    GLTFFileLoader.prototype._onProgress = function (event, request) {
        if (!this._progressCallback) {
            return;
        }
        request._lengthComputable = event.lengthComputable;
        request._loaded = event.loaded;
        request._total = event.total;
        var lengthComputable = true;
        var loaded = 0;
        var total = 0;
        for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
            var request_1 = _a[_i];
            if (request_1._lengthComputable === undefined || request_1._loaded === undefined || request_1._total === undefined) {
                return;
            }
            lengthComputable = lengthComputable && request_1._lengthComputable;
            loaded += request_1._loaded;
            total += request_1._total;
        }
        this._progressCallback({
            lengthComputable: lengthComputable,
            loaded: loaded,
            total: lengthComputable ? total : 0,
        });
    };
    GLTFFileLoader.prototype._validate = function (scene, data, rootUrl, fileName) {
        var _this = this;
        if (rootUrl === void 0) { rootUrl = ""; }
        if (fileName === void 0) { fileName = ""; }
        if (!this.validate) {
            return;
        }
        this._startPerformanceCounter("Validate JSON");
        _glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation.ValidateAsync(data, rootUrl, fileName, function (uri) {
            return _this.preprocessUrlAsync(rootUrl + uri).then(function (url) { return scene._loadFileAsync(url, undefined, true, true); });
        }).then(function (result) {
            _this._endPerformanceCounter("Validate JSON");
            _this.onValidatedObservable.notifyObservers(result);
            _this.onValidatedObservable.clear();
        }, function (reason) {
            _this._endPerformanceCounter("Validate JSON");
            babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Failed to validate: ".concat(reason.message));
            _this.onValidatedObservable.clear();
        });
    };
    GLTFFileLoader.prototype._getLoader = function (loaderData) {
        var asset = loaderData.json.asset || {};
        this._log("Asset version: ".concat(asset.version));
        asset.minVersion && this._log("Asset minimum version: ".concat(asset.minVersion));
        asset.generator && this._log("Asset generator: ".concat(asset.generator));
        var version = GLTFFileLoader._parseVersion(asset.version);
        if (!version) {
            throw new Error("Invalid version: " + asset.version);
        }
        if (asset.minVersion !== undefined) {
            var minVersion = GLTFFileLoader._parseVersion(asset.minVersion);
            if (!minVersion) {
                throw new Error("Invalid minimum version: " + asset.minVersion);
            }
            if (GLTFFileLoader._compareVersion(minVersion, { major: 2, minor: 0 }) > 0) {
                throw new Error("Incompatible minimum version: " + asset.minVersion);
            }
        }
        var createLoaders = {
            1: GLTFFileLoader._CreateGLTF1Loader,
            2: GLTFFileLoader._CreateGLTF2Loader,
        };
        var createLoader = createLoaders[version.major];
        if (!createLoader) {
            throw new Error("Unsupported version: " + asset.version);
        }
        return createLoader(this);
    };
    GLTFFileLoader.prototype._parseJson = function (json) {
        this._startPerformanceCounter("Parse JSON");
        this._log("JSON length: ".concat(json.length));
        var parsed = JSON.parse(json);
        this._endPerformanceCounter("Parse JSON");
        return parsed;
    };
    GLTFFileLoader.prototype._unpackBinaryAsync = function (dataReader) {
        var _this = this;
        this._startPerformanceCounter("Unpack Binary");
        // Read magic + version + length + json length + json format
        return dataReader.loadAsync(20).then(function () {
            var Binary = {
                Magic: 0x46546c67,
            };
            var magic = dataReader.readUint32();
            if (magic !== Binary.Magic) {
                throw new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.RuntimeError("Unexpected magic: " + magic, babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.ErrorCodes.GLTFLoaderUnexpectedMagicError);
            }
            var version = dataReader.readUint32();
            if (_this.loggingEnabled) {
                _this._log("Binary version: ".concat(version));
            }
            var length = dataReader.readUint32();
            if (!_this.useRangeRequests && length !== dataReader.buffer.byteLength) {
                babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Length in header does not match actual data length: ".concat(length, " != ").concat(dataReader.buffer.byteLength));
            }
            var unpacked;
            switch (version) {
                case 1: {
                    unpacked = _this._unpackBinaryV1Async(dataReader, length);
                    break;
                }
                case 2: {
                    unpacked = _this._unpackBinaryV2Async(dataReader, length);
                    break;
                }
                default: {
                    throw new Error("Unsupported version: " + version);
                }
            }
            _this._endPerformanceCounter("Unpack Binary");
            return unpacked;
        });
    };
    GLTFFileLoader.prototype._unpackBinaryV1Async = function (dataReader, length) {
        var ContentFormat = {
            JSON: 0,
        };
        var contentLength = dataReader.readUint32();
        var contentFormat = dataReader.readUint32();
        if (contentFormat !== ContentFormat.JSON) {
            throw new Error("Unexpected content format: ".concat(contentFormat));
        }
        var bodyLength = length - dataReader.byteOffset;
        var data = { json: this._parseJson(dataReader.readString(contentLength)), bin: null };
        if (bodyLength !== 0) {
            var startByteOffset_1 = dataReader.byteOffset;
            data.bin = {
                readAsync: function (byteOffset, byteLength) { return dataReader.buffer.readAsync(startByteOffset_1 + byteOffset, byteLength); },
                byteLength: bodyLength,
            };
        }
        return Promise.resolve(data);
    };
    GLTFFileLoader.prototype._unpackBinaryV2Async = function (dataReader, length) {
        var _this = this;
        var ChunkFormat = {
            JSON: 0x4e4f534a,
            BIN: 0x004e4942,
        };
        // Read the JSON chunk header.
        var chunkLength = dataReader.readUint32();
        var chunkFormat = dataReader.readUint32();
        if (chunkFormat !== ChunkFormat.JSON) {
            throw new Error("First chunk format is not JSON");
        }
        // Bail if there are no other chunks.
        if (dataReader.byteOffset + chunkLength === length) {
            return dataReader.loadAsync(chunkLength).then(function () {
                return { json: _this._parseJson(dataReader.readString(chunkLength)), bin: null };
            });
        }
        // Read the JSON chunk and the length and type of the next chunk.
        return dataReader.loadAsync(chunkLength + 8).then(function () {
            var data = { json: _this._parseJson(dataReader.readString(chunkLength)), bin: null };
            var readAsync = function () {
                var chunkLength = dataReader.readUint32();
                var chunkFormat = dataReader.readUint32();
                switch (chunkFormat) {
                    case ChunkFormat.JSON: {
                        throw new Error("Unexpected JSON chunk");
                    }
                    case ChunkFormat.BIN: {
                        var startByteOffset_2 = dataReader.byteOffset;
                        data.bin = {
                            readAsync: function (byteOffset, byteLength) { return dataReader.buffer.readAsync(startByteOffset_2 + byteOffset, byteLength); },
                            byteLength: chunkLength,
                        };
                        dataReader.skipBytes(chunkLength);
                        break;
                    }
                    default: {
                        // ignore unrecognized chunkFormat
                        dataReader.skipBytes(chunkLength);
                        break;
                    }
                }
                if (dataReader.byteOffset !== length) {
                    return dataReader.loadAsync(8).then(readAsync);
                }
                return Promise.resolve(data);
            };
            return readAsync();
        });
    };
    GLTFFileLoader._parseVersion = function (version) {
        if (version === "1.0" || version === "1.0.1") {
            return {
                major: 1,
                minor: 0,
            };
        }
        var match = (version + "").match(/^(\d+)\.(\d+)/);
        if (!match) {
            return null;
        }
        return {
            major: parseInt(match[1]),
            minor: parseInt(match[2]),
        };
    };
    GLTFFileLoader._compareVersion = function (a, b) {
        if (a.major > b.major) {
            return 1;
        }
        if (a.major < b.major) {
            return -1;
        }
        if (a.minor > b.minor) {
            return 1;
        }
        if (a.minor < b.minor) {
            return -1;
        }
        return 0;
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._logOpen = function (message) {
        this._log(message);
        this._logIndentLevel++;
    };
    /** @internal */
    GLTFFileLoader.prototype._logClose = function () {
        --this._logIndentLevel;
    };
    GLTFFileLoader.prototype._logEnabled = function (message) {
        var spaces = GLTFFileLoader._logSpaces.substr(0, this._logIndentLevel * 2);
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("".concat(spaces).concat(message));
    };
    GLTFFileLoader.prototype._logDisabled = function (message) { };
    GLTFFileLoader.prototype._startPerformanceCounterEnabled = function (counterName) {
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.StartPerformanceCounter(counterName);
    };
    GLTFFileLoader.prototype._startPerformanceCounterDisabled = function (counterName) { };
    GLTFFileLoader.prototype._endPerformanceCounterEnabled = function (counterName) {
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.EndPerformanceCounter(counterName);
    };
    GLTFFileLoader.prototype._endPerformanceCounterDisabled = function (counterName) { };
    // ----------
    // V1 options
    // ----------
    /**
     * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
     * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
     * Defaults to true.
     * @internal
     */
    GLTFFileLoader.IncrementalLoading = true;
    /**
     * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
     * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
     * @internal
     */
    GLTFFileLoader.HomogeneousCoordinates = false;
    GLTFFileLoader._MagicBase64Encoded = "Z2xURg"; // "glTF" base64 encoded (without the quotes!)
    GLTFFileLoader._logSpaces = "                                ";
    return GLTFFileLoader;
}());
if (babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new GLTFFileLoader());
}


/***/ }),

/***/ "../../../dev/loaders/src/glTF/glTFValidation.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/glTFValidation.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFValidation: () => (/* binding */ GLTFValidation)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);

function validateAsync(data, rootUrl, fileName, getExternalResource) {
    var options = {
        externalResourceFunction: function (uri) { return getExternalResource(uri).then(function (value) { return new Uint8Array(value); }); },
    };
    if (fileName) {
        options.uri = rootUrl === "file:" ? fileName : rootUrl + fileName;
    }
    return data instanceof ArrayBuffer ? GLTFValidator.validateBytes(new Uint8Array(data), options) : GLTFValidator.validateString(data, options);
}
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 */
function workerFunc() {
    var pendingExternalResources = [];
    onmessage = function (message) {
        var data = message.data;
        switch (data.id) {
            case "init": {
                importScripts(data.url);
                break;
            }
            case "validate": {
                validateAsync(data.data, data.rootUrl, data.fileName, function (uri) {
                    return new Promise(function (resolve, reject) {
                        var index = pendingExternalResources.length;
                        pendingExternalResources.push({ resolve: resolve, reject: reject });
                        postMessage({ id: "getExternalResource", index: index, uri: uri });
                    });
                }).then(function (value) {
                    postMessage({ id: "validate.resolve", value: value });
                }, function (reason) {
                    postMessage({ id: "validate.reject", reason: reason });
                });
                break;
            }
            case "getExternalResource.resolve": {
                pendingExternalResources[data.index].resolve(data.value);
                break;
            }
            case "getExternalResource.reject": {
                pendingExternalResources[data.index].reject(data.reason);
                break;
            }
        }
    };
}
/**
 * glTF validation
 */
var GLTFValidation = /** @class */ (function () {
    function GLTFValidation() {
    }
    /**
     * Validate a glTF asset using the glTF-Validator.
     * @param data The JSON of a glTF or the array buffer of a binary glTF
     * @param rootUrl The root url for the glTF
     * @param fileName The file name for the glTF
     * @param getExternalResource The callback to get external resources for the glTF validator
     * @returns A promise that resolves with the glTF validation results once complete
     */
    GLTFValidation.ValidateAsync = function (data, rootUrl, fileName, getExternalResource) {
        var _this = this;
        var dataCopy = ArrayBuffer.isView(data) ? data.slice().buffer : data;
        if (typeof Worker === "function") {
            return new Promise(function (resolve, reject) {
                var workerContent = "".concat(validateAsync, "(").concat(workerFunc, ")()");
                var workerBlobUrl = URL.createObjectURL(new Blob([workerContent], { type: "application/javascript" }));
                var worker = new Worker(workerBlobUrl);
                var onError = function (error) {
                    worker.removeEventListener("error", onError);
                    worker.removeEventListener("message", onMessage);
                    reject(error);
                };
                var onMessage = function (message) {
                    var data = message.data;
                    switch (data.id) {
                        case "getExternalResource": {
                            getExternalResource(data.uri).then(function (value) {
                                worker.postMessage({ id: "getExternalResource.resolve", index: data.index, value: value }, [value]);
                            }, function (reason) {
                                worker.postMessage({ id: "getExternalResource.reject", index: data.index, reason: reason });
                            });
                            break;
                        }
                        case "validate.resolve": {
                            worker.removeEventListener("error", onError);
                            worker.removeEventListener("message", onMessage);
                            resolve(data.value);
                            worker.terminate();
                            break;
                        }
                        case "validate.reject": {
                            worker.removeEventListener("error", onError);
                            worker.removeEventListener("message", onMessage);
                            reject(data.reason);
                            worker.terminate();
                        }
                    }
                };
                worker.addEventListener("error", onError);
                worker.addEventListener("message", onMessage);
                worker.postMessage({ id: "init", url: _this.Configuration.url });
                worker.postMessage({ id: "validate", data: dataCopy, rootUrl: rootUrl, fileName: fileName });
            });
        }
        else {
            if (!this._LoadScriptPromise) {
                this._LoadScriptPromise = babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadScriptAsync(this.Configuration.url);
            }
            return this._LoadScriptPromise.then(function () {
                return validateAsync(dataCopy, rootUrl, fileName, getExternalResource);
            });
        }
    };
    /**
     * The configuration. Defaults to `{ url: "https://preview.babylonjs.com/gltf_validator.js" }`.
     */
    GLTFValidation.Configuration = {
        url: "gltf_validator.js",
    };
    return GLTFValidation;
}());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF.ts":
/*!******************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFFileLoader: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   GLTFValidation: () => (/* reexport safe */ loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation)
/* harmony export */ });
/* harmony import */ var loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/glTFFileLoader */ "../../../dev/loaders/src/glTF/glTFFileLoader.ts");
/* harmony import */ var loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loaders/glTF/glTFValidation */ "../../../dev/loaders/src/glTF/glTFValidation.ts");


/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var key in loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__[key];
    }
    for (var key in loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__) {
        globalObject.BABYLON[key] = loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__[key];
    }
}




/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF2.ts":
/*!*******************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF2.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF2: () => (/* reexport module object */ loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__)
/* harmony export */ });
/* harmony import */ var loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/2.0/Extensions/index */ "../../../dev/loaders/src/glTF/2.0/Extensions/index.ts");
/* harmony import */ var loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loaders/glTF/2.0/glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/2.0/glTFLoaderInterfaces.ts");
/* harmony import */ var loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! loaders/glTF/2.0/index */ "../../../dev/loaders/src/glTF/2.0/index.ts");
/* eslint-disable import/no-internal-modules */



/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    var BABYLON_1 = globalObject.BABYLON;
    BABYLON_1.GLTF2 = BABYLON_1.GLTF2 || {};
    BABYLON_1.GLTF2.Loader = BABYLON_1.GLTF2.Loader || {};
    BABYLON_1.GLTF2.Loader.Extensions = BABYLON_1.GLTF2.Loader.Extensions || {};
    var keys = [];
    for (var key in loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__) {
        BABYLON_1.GLTF2.Loader.Extensions[key] = loaders_glTF_2_0_Extensions_index__WEBPACK_IMPORTED_MODULE_0__[key];
        keys.push(key);
    }
    for (var key in loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__) {
        BABYLON_1.GLTF2.Loader[key] = loaders_glTF_2_0_glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_1__[key];
        keys.push(key);
    }
    for (var key in loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__) {
        // Prevent Reassignment.
        if (keys.indexOf(key) > -1) {
            continue;
        }
        BABYLON_1.GLTF2[key] = loaders_glTF_2_0_index__WEBPACK_IMPORTED_MODULE_2__[key];
    }
}



/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF2FileLoader.ts":
/*!*****************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF2FileLoader.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF2: () => (/* reexport safe */ _legacy_glTF2__WEBPACK_IMPORTED_MODULE_1__.GLTF2),
/* harmony export */   GLTFFileLoader: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   GLTFValidation: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFValidation)
/* harmony export */ });
/* harmony import */ var _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legacy-glTF */ "../../../lts/loaders/src/legacy/legacy-glTF.ts");
/* harmony import */ var _legacy_glTF2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy-glTF2 */ "../../../lts/loaders/src/legacy/legacy-glTF2.ts");
// eslint-disable-next-line import/export




/***/ }),

/***/ "babylonjs/Misc/observable":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!********************************!*\
  !*** ./src/glTF2FileLoader.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_glTF2FileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_glTF2FileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-glTF2FileLoader */ "../../../lts/loaders/src/legacy/legacy-glTF2FileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_glTF2FileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5nbFRGMkZpbGVMb2FkZXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBRUE7QUFXQTs7QUFFQTtBQUNBO0FBQ0E7QUFjQTs7QUFFQTtBQUNBO0FBaEJBOztBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTs7QUFaQTtBQUFBO0FBYUE7OztBQWhCQTtBQUFBO0FBaUJBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKQTtBQUlBO0FBTUE7QUFFQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFhQTs7QUFFQTtBQUNBO0FBZkE7O0FBRUE7QUFDQTtBQWFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5R0E7QUFHQTtBQUVBO0FBTUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBYUE7O0FBRUE7QUFDQTtBQWZBOztBQUVBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRUE7QUFNQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQVNBOztBQUVBO0FBQ0E7QUFYQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUdBO0FBTUE7O0FBRUE7QUFDQTtBQXFCQTs7QUFFQTtBQUNBO0FBdkJBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBZ0JBO0FBQ0E7QUFiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBOztBQUtBO0FBSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBOztBQU9BO0FBTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFBQTs7QUFXQTtBQVZBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TUE7QUFRQTtBQUNBO0FBRUE7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBUUE7O0FBRUE7QUFDQTtBQVZBOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBS0E7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SkE7QUFFQTtBQVFBO0FBRUE7QUFNQTs7QUFFQTtBQUNBO0FBQ0E7QUF1QkE7O0FBRUE7QUFDQTtBQXpCQTs7QUFFQTtBQUNBO0FBWUE7O0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFlQTs7QUFFQTtBQUNBO0FBakJBOztBQUVBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySEE7QUFLQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBa0JBOztBQUVBO0FBQ0E7QUFwQkE7O0FBRUE7QUFDQTtBQU9BOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBS0E7QUFHQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFrQkE7O0FBRUE7QUFDQTtBQXBCQTs7QUFFQTtBQUNBO0FBT0E7O0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEhBO0FBS0E7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWtCQTs7QUFFQTtBQUNBO0FBcEJBOztBQUVBO0FBQ0E7QUFPQTs7QUFFQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBS0E7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQXVCQTs7QUFFQTtBQUNBO0FBcEJBOztBQUVBO0FBQ0E7QUFPQTs7QUFFQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQTNEQTs7QUFFQTtBQUNBO0FBeURBO0FBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBS0E7QUFHQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWtCQTs7QUFFQTtBQUNBO0FBcEJBOztBQUVBO0FBQ0E7QUFPQTs7QUFFQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUtBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFrQkE7O0FBRUE7QUFDQTtBQXBCQTs7QUFFQTtBQUNBO0FBT0E7O0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4R0E7QUFLQTtBQUNBO0FBR0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBa0JBOztBQUVBO0FBQ0E7QUFwQkE7O0FBRUE7QUFDQTtBQU9BOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBO0FBS0E7QUFDQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBa0JBOztBQUVBO0FBQ0E7QUFwQkE7O0FBRUE7QUFDQTtBQU9BOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakdBO0FBS0E7QUFHQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFrQkE7O0FBRUE7QUFDQTtBQXBCQTs7QUFFQTtBQUNBO0FBT0E7O0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25HQTtBQUtBO0FBS0E7QUFFQTtBQUNBO0FBQ0E7QUFnREE7O0FBRUE7QUFDQTtBQWlDQTs7OztBQUlBO0FBQ0E7QUFBQTtBQWhCQTtBQUNBO0FBQ0E7QUFDQTtBQWNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBcERBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEwQ0E7OztBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQUE7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFrQkE7O0FBRUE7QUFDQTtBQXBCQTs7QUFFQTtBQUNBO0FBT0E7O0FBRUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFaQTtBQUNBO0FBS0E7QUFFQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQWtCQTs7QUFFQTtBQUNBO0FBcEJBOztBQUVBO0FBQ0E7QUFPQTs7QUFFQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRkE7QUFHQTtBQU1BO0FBWUE7O0FBRUE7QUFDQTtBQUNBO0FBZUE7O0FBRUE7QUFDQTtBQWpCQTs7QUFFQTtBQUNBO0FBZUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXhFQTtBQUFBO0FBeUVBO0FBQ0E7O0FBaEZBO0FBQ0E7QUFBQTtBQWlGQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxU0E7QUFLQTtBQUdBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQWtCQTs7QUFFQTtBQUNBO0FBcEJBOztBQUVBO0FBQ0E7QUFPQTs7QUFFQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDckdBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFXQTs7QUFFQTtBQUNBO0FBYkE7O0FBRUE7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQU1BO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBU0E7O0FBRUE7QUFDQTtBQVhBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFJQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBYUE7O0FBRUE7QUFDQTtBQWZBOztBQUVBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUVBO0FBR0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBa0JBOztBQUVBO0FBQ0E7QUFwQkE7O0FBRUE7QUFDQTtBQU9BOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUlBO0FBSUE7QUF5QkE7OztBQUdBO0FBQ0E7QUFDQTtBQWVBOztBQUVBO0FBQ0E7QUFqQkE7O0FBRUE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBOztBQWZBO0FBQUE7QUFBQTtBQWlCQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFWQTtBQUFBO0FBWUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDalRBO0FBQ0E7QUFPQTtBQUdBO0FBUUE7O0FBRUE7QUFDQTtBQUNBO0FBaURBOztBQUVBO0FBQ0E7QUFuREE7O0FBRUE7QUFDQTtBQU9BOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFsQkE7QUFBQTtBQW1CQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFsQkE7QUFBQTtBQW1CQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBbENBO0FBQUE7QUFtQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFuQ0E7QUFBQTtBQW9DQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5WkE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBU0E7QUFDQTtBQVRBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBU0E7QUFDQTtBQVRBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQTBDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBMkJBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBeUNBO0FBeENBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQVdBOztBQUVBO0FBQ0E7QUF5R0E7O0FBRUE7QUFDQTtBQTNHQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBcUZBO0FBQ0E7QUE3RUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFLQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFBQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBS0E7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFLQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFBQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFKQTtBQUFBO0FBQUE7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFnQkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFJQTtBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFLQTtBQUVBO0FBT0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFucUZBO0FBRUE7O0FBRUE7QUFDQTtBQStwRkE7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdjNGQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFBQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFLQTtBQUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUE0QkE7QUEzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXJCQTtBQUFBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ0E7QUFDQTtBQWFBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFzQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFnQkE7O0FBRUE7QUFDQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQWlDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFlQTs7Ozs7QUFLQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQWNBOztBQUVBO0FBQ0E7QUFjQTs7QUFFQTtBQUNBO0FBY0E7Ozs7QUFJQTtBQUNBO0FBZ0JBOztBQUVBO0FBQ0E7QUFjQTs7QUFFQTtBQUNBO0FBY0E7OztBQUdBO0FBQ0E7QUEwREE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFjQTtBQUNBO0FBRUE7QUFJQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQStTQTs7QUFFQTtBQUNBO0FBaVVBO0FBQ0E7QUFFQTtBQUNBO0FBc0JBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFhQTtBQTcvQkE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUEySEE7QUFKQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBb0JBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBWUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFZQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQWdCQTtBQUxBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBWUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFZQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQWFBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBS0E7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBZEE7QUFtQkE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQWhCQTtBQWlDQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQW9CQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUlBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFJQTtBQUVBOztBQUVBO0FBQ0E7QUFRQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBT0E7OztBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQVFBO0FBSUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFyL0JBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUEwVEE7QUE2bkJBO0FBOENBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN3JDQTtBQVNBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFZQTs7QUFFQTtBQUNBO0FBQUE7QUFvRkE7QUExRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQUE7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWxGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQThFQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxS0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0VYVF9saWdodHNfaW1hZ2VfYmFzZWQudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9FWFRfbWVzaF9ncHVfaW5zdGFuY2luZy50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0VYVF9tZXNob3B0X2NvbXByZXNzaW9uLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvRVhUX3RleHR1cmVfd2VicC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0V4dHJhc0FzTWV0YWRhdGEudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfYW5pbWF0aW9uX3BvaW50ZXIuZGF0YS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9hbmltYXRpb25fcG9pbnRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9kcmFjb19tZXNoX2NvbXByZXNzaW9uLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX2xpZ2h0c19wdW5jdHVhbC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfYW5pc290cm9weS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfY2xlYXJjb2F0LnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfaW9yLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19zaGVlbi50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfc3BlY3VsYXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3RyYW5zbHVjZW5jeS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc191bmxpdC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tYXRlcmlhbHNfdmFyaWFudHMudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9LSFJfbWF0ZXJpYWxzX3ZvbHVtZS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl9tZXNoX3F1YW50aXphdGlvbi50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl90ZXh0dXJlX2Jhc2lzdS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl90ZXh0dXJlX3RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL0tIUl94bXBfanNvbl9sZC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL01TRlRfYXVkaW9fZW1pdHRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL01TRlRfbG9kLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvTVNGVF9taW5lY3JhZnRNZXNoLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL0V4dGVuc2lvbnMvTVNGVF9zUkdCRmFjdG9ycy50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9FeHRlbnNpb25zL2luZGV4LnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMi4wL2dsVEZMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8yLjAvZ2xURkxvYWRlckFuaW1hdGlvbi50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzIuMC9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGL2dsVEZGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvZ2xURlZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1nbFRGLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vbHRzL2xvYWRlcnMvc3JjL2xlZ2FjeS9sZWdhY3ktZ2xURjIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1nbFRGMkZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0xPQURFUlMvLi9zcmMvZ2xURjJGaWxlTG9hZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1sb2FkZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbG9hZGVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTE9BREVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2Nfb2JzZXJ2YWJsZV9fKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFNjYWxhciB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguc2NhbGFyXCI7XHJcbmltcG9ydCB7IFNwaGVyaWNhbEhhcm1vbmljcywgU3BoZXJpY2FsUG9seW5vbWlhbCB9IGZyb20gXCJjb3JlL01hdGhzL3NwaGVyaWNhbFBvbHlub21pYWxcIjtcclxuaW1wb3J0IHsgUXVhdGVybmlvbiwgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBSYXdDdWJlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9yYXdDdWJlVGV4dHVyZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJRVhUTGlnaHRzSW1hZ2VCYXNlZF9MaWdodFJlZmVyZW5jZUltYWdlQmFzZWQsIElFWFRMaWdodHNJbWFnZUJhc2VkX0xpZ2h0SW1hZ2VCYXNlZCwgSUVYVExpZ2h0c0ltYWdlQmFzZWQgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyLCBBcnJheUl0ZW0gfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiRVhUX2xpZ2h0c19pbWFnZV9iYXNlZFwiO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIiB7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICBpbnRlcmZhY2UgSUVYVExpZ2h0c0ltYWdlQmFzZWRfTGlnaHRJbWFnZUJhc2VkIHtcclxuICAgICAgICBfYmFieWxvblRleHR1cmU/OiBCYXNlVGV4dHVyZTtcclxuICAgICAgICBfbG9hZGVkPzogUHJvbWlzZTx2b2lkPjtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL1ZlbmRvci9FWFRfbGlnaHRzX2ltYWdlX2Jhc2VkL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF9saWdodHNfaW1hZ2VfYmFzZWQgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG4gICAgcHJpdmF0ZSBfbGlnaHRzPzogSUVYVExpZ2h0c0ltYWdlQmFzZWRfTGlnaHRJbWFnZUJhc2VkW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbGlnaHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBvbkxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHRoaXMuX2xvYWRlci5nbHRmLmV4dGVuc2lvbnM7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbnMgJiYgZXh0ZW5zaW9uc1t0aGlzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbnNbdGhpcy5uYW1lXSBhcyBJRVhUTGlnaHRzSW1hZ2VCYXNlZDtcclxuICAgICAgICAgICAgdGhpcy5fbGlnaHRzID0gZXh0ZW5zaW9uLmxpZ2h0cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRTY2VuZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgc2NlbmU6IElTY2VuZSk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUVYVExpZ2h0c0ltYWdlQmFzZWRfTGlnaHRSZWZlcmVuY2VJbWFnZUJhc2VkPihjb250ZXh0LCBzY2VuZSwgdGhpcy5uYW1lLCAoZXh0ZW5zaW9uQ29udGV4dCwgZXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRTY2VuZUFzeW5jKGNvbnRleHQsIHNjZW5lKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIubG9nT3BlbihgJHtleHRlbnNpb25Db250ZXh0fWApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbGlnaHQgPSBBcnJheUl0ZW0uR2V0KGAke2V4dGVuc2lvbkNvbnRleHR9L2xpZ2h0YCwgdGhpcy5fbGlnaHRzLCBleHRlbnNpb24ubGlnaHQpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZExpZ2h0QXN5bmMoYC9leHRlbnNpb25zLyR7dGhpcy5uYW1lfS9saWdodHMvJHtleHRlbnNpb24ubGlnaHR9YCwgbGlnaHQpLnRoZW4oKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLmVudmlyb25tZW50VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvZ0Nsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRMaWdodEFzeW5jKGNvbnRleHQ6IHN0cmluZywgbGlnaHQ6IElFWFRMaWdodHNJbWFnZUJhc2VkX0xpZ2h0SW1hZ2VCYXNlZCk6IFByb21pc2U8QmFzZVRleHR1cmU+IHtcclxuICAgICAgICBpZiAoIWxpZ2h0Ll9sb2FkZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvZ09wZW4oYCR7Y29udGV4dH1gKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBBcnJheTxBcnJheTxBcnJheUJ1ZmZlclZpZXc+PihsaWdodC5zcGVjdWxhckltYWdlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtaXBtYXAgPSAwOyBtaXBtYXAgPCBsaWdodC5zcGVjdWxhckltYWdlcy5sZW5ndGg7IG1pcG1hcCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNlcyA9IGxpZ2h0LnNwZWN1bGFySW1hZ2VzW21pcG1hcF07XHJcbiAgICAgICAgICAgICAgICBpbWFnZURhdGFbbWlwbWFwXSA9IG5ldyBBcnJheTxBcnJheUJ1ZmZlclZpZXc+KGZhY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmYWNlID0gMDsgZmFjZSA8IGZhY2VzLmxlbmd0aDsgZmFjZSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlY3VsYXJJbWFnZUNvbnRleHQgPSBgJHtjb250ZXh0fS9zcGVjdWxhckltYWdlcy8ke21pcG1hcH0vJHtmYWNlfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvZ09wZW4oYCR7c3BlY3VsYXJJbWFnZUNvbnRleHR9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZmFjZXNbZmFjZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheUl0ZW0uR2V0KHNwZWN1bGFySW1hZ2VDb250ZXh0LCB0aGlzLl9sb2FkZXIuZ2x0Zi5pbWFnZXMsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIubG9hZEltYWdlQXN5bmMoYC9pbWFnZXMvJHtpbmRleH1gLCBpbWFnZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VEYXRhW21pcG1hcF1bZmFjZV0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2dDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIubG9nQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxpZ2h0Ll9sb2FkZWQgPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uVGV4dHVyZSA9IG5ldyBSYXdDdWJlVGV4dHVyZSh0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLCBudWxsLCBsaWdodC5zcGVjdWxhckltYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZS5uYW1lID0gbGlnaHQubmFtZSB8fCBcImVudmlyb25tZW50XCI7XHJcbiAgICAgICAgICAgICAgICBsaWdodC5fYmFieWxvblRleHR1cmUgPSBiYWJ5bG9uVGV4dHVyZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGlnaHQuaW50ZW5zaXR5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UZXh0dXJlLmxldmVsID0gbGlnaHQuaW50ZW5zaXR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaWdodC5yb3RhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IFF1YXRlcm5pb24uRnJvbUFycmF5KGxpZ2h0LnJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW52ZXJ0IHRoZSByb3RhdGlvbiBzbyB0aGF0IHBvc2l0aXZlIHJvdGF0aW9uIGlzIGNvdW50ZXItY2xvY2t3aXNlLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbG9hZGVyLmJhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IFF1YXRlcm5pb24uSW52ZXJzZShyb3RhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBNYXRyaXguRnJvbVF1YXRlcm5pb25Ub1JlZihyb3RhdGlvbiwgYmFieWxvblRleHR1cmUuZ2V0UmVmbGVjdGlvblRleHR1cmVNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFsaWdodC5pcnJhZGlhbmNlQ29lZmZpY2llbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBJcnJhZGlhbmNlIGNvZWZmaWNpZW50cyBhcmUgbWlzc2luZ2ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaGVyaWNhbEhhcm1vbmljcyA9IFNwaGVyaWNhbEhhcm1vbmljcy5Gcm9tQXJyYXkobGlnaHQuaXJyYWRpYW5jZUNvZWZmaWNpZW50cyk7XHJcbiAgICAgICAgICAgICAgICBzcGhlcmljYWxIYXJtb25pY3Muc2NhbGVJblBsYWNlKGxpZ2h0LmludGVuc2l0eSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3BoZXJpY2FsSGFybW9uaWNzLmNvbnZlcnRJcnJhZGlhbmNlVG9MYW1iZXJ0aWFuUmFkaWFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaGVyaWNhbFBvbHlub21pYWwgPSBTcGhlcmljYWxQb2x5bm9taWFsLkZyb21IYXJtb25pY3Moc3BoZXJpY2FsSGFybW9uaWNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wdXRlIHRoZSBsb2QgZ2VuZXJhdGlvbiBzY2FsZSB0byBmaXQgZXhhY3RseSB0byB0aGUgbnVtYmVyIG9mIGxldmVscyBhdmFpbGFibGUuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2RHZW5lcmF0aW9uU2NhbGUgPSAoaW1hZ2VEYXRhLmxlbmd0aCAtIDEpIC8gU2NhbGFyLkxvZzIobGlnaHQuc3BlY3VsYXJJbWFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25UZXh0dXJlLnVwZGF0ZVJHQkRBc3luYyhpbWFnZURhdGEsIHNwaGVyaWNhbFBvbHlub21pYWwsIGxvZEdlbmVyYXRpb25TY2FsZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpZ2h0Ll9sb2FkZWQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaWdodC5fYmFieWxvblRleHR1cmUhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBFWFRfbGlnaHRzX2ltYWdlX2Jhc2VkKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgeyBWZWN0b3IzLCBRdWF0ZXJuaW9uLCBNYXRyaXgsIFRtcFZlY3RvcnMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciwgQXJyYXlJdGVtIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgSU5vZGUgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSUVYVE1lc2hHcHVJbnN0YW5jaW5nIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IFwiY29yZS9NZXNoZXMvdGhpbkluc3RhbmNlTWVzaFwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiRVhUX21lc2hfZ3B1X2luc3RhbmNpbmdcIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9WZW5kb3IvRVhUX21lc2hfZ3B1X2luc3RhbmNpbmcvUkVBRE1FLm1kKVxyXG4gKiBbUGxheWdyb3VuZCBTYW1wbGVdKGh0dHBzOi8vcGxheWdyb3VuZC5iYWJ5bG9uanMuY29tLyNRRklHTFcjOSlcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF9tZXNoX2dwdV9pbnN0YW5jaW5nIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5fbG9hZGVyLmlzRXh0ZW5zaW9uVXNlZChOQU1FKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIGFzc2lnbjogKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPj4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGTG9hZGVyLkxvYWRFeHRlbnNpb25Bc3luYzxJRVhUTWVzaEdwdUluc3RhbmNpbmcsIFRyYW5zZm9ybU5vZGU+KGNvbnRleHQsIG5vZGUsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIuX2Rpc2FibGVJbnN0YW5jZWRNZXNoKys7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fbG9hZGVyLmxvYWROb2RlQXN5bmMoYC9ub2Rlcy8ke25vZGUuaW5kZXh9YCwgbm9kZSwgYXNzaWduKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5fZGlzYWJsZUluc3RhbmNlZE1lc2gtLTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbm9kZS5fcHJpbWl0aXZlQmFieWxvbk1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8TnVsbGFibGU8RmxvYXQzMkFycmF5Pj4+KCk7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZUNvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGxvYWRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24uYXR0cmlidXRlc1thdHRyaWJ1dGVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goUHJvbWlzZS5yZXNvbHZlKG51bGwpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzb3IgPSBBcnJheUl0ZW0uR2V0KGAke2V4dGVuc2lvbkNvbnRleHR9L2F0dHJpYnV0ZXMvJHthdHRyaWJ1dGV9YCwgdGhpcy5fbG9hZGVyLmdsdGYuYWNjZXNzb3JzLCBleHRlbnNpb24uYXR0cmlidXRlc1thdHRyaWJ1dGVdKTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLl9sb2FkRmxvYXRBY2Nlc3NvckFzeW5jKGAvYWNjZXNzb3JzLyR7YWNjZXNzb3IuYnVmZmVyVmlld31gLCBhY2Nlc3NvcikpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZUNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VDb3VudCA9IGFjY2Vzc29yLmNvdW50O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZUNvdW50ICE9PSBhY2Nlc3Nvci5jb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtleHRlbnNpb25Db250ZXh0fS9hdHRyaWJ1dGVzOiBJbnN0YW5jZSBidWZmZXIgYWNjZXNzb3JzIGRvIG5vdCBoYXZlIHRoZSBzYW1lIGNvdW50LmApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRSQU5TTEFUSU9OXCIpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiUk9UQVRJT05cIik7XHJcbiAgICAgICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJTQ0FMRVwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oKGJhYnlsb25UcmFuc2Zvcm1Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKFt0cmFuc2xhdGlvbkJ1ZmZlciwgcm90YXRpb25CdWZmZXIsIHNjYWxlQnVmZmVyXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdHJpY2VzID0gbmV3IEZsb2F0MzJBcnJheShpbnN0YW5jZUNvdW50ICogMTYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBUbXBWZWN0b3JzLlZlY3RvcjNbMF0uY29weUZyb21GbG9hdHMoMCwgMCwgMCk7IC8vIHRyYW5zbGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgVG1wVmVjdG9ycy5RdWF0ZXJuaW9uWzBdLmNvcHlGcm9tRmxvYXRzKDAsIDAsIDAsIDEpOyAvLyByb3RhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIFRtcFZlY3RvcnMuVmVjdG9yM1sxXS5jb3B5RnJvbUZsb2F0cygxLCAxLCAxKTsgLy8gc2NhbGVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZUNvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRpb25CdWZmZXIgJiYgVmVjdG9yMy5Gcm9tQXJyYXlUb1JlZih0cmFuc2xhdGlvbkJ1ZmZlciwgaSAqIDMsIFRtcFZlY3RvcnMuVmVjdG9yM1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uQnVmZmVyICYmIFF1YXRlcm5pb24uRnJvbUFycmF5VG9SZWYocm90YXRpb25CdWZmZXIsIGkgKiA0LCBUbXBWZWN0b3JzLlF1YXRlcm5pb25bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZUJ1ZmZlciAmJiBWZWN0b3IzLkZyb21BcnJheVRvUmVmKHNjYWxlQnVmZmVyLCBpICogMywgVG1wVmVjdG9ycy5WZWN0b3IzWzFdKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdHJpeC5Db21wb3NlVG9SZWYoVG1wVmVjdG9ycy5WZWN0b3IzWzFdLCBUbXBWZWN0b3JzLlF1YXRlcm5pb25bMF0sIFRtcFZlY3RvcnMuVmVjdG9yM1swXSwgVG1wVmVjdG9ycy5NYXRyaXhbMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVG1wVmVjdG9ycy5NYXRyaXhbMF0uY29weVRvQXJyYXkobWF0cmljZXMsIGkgKiAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25NZXNoIG9mIG5vZGUuX3ByaW1pdGl2ZUJhYnlsb25NZXNoZXMhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChiYWJ5bG9uTWVzaCBhcyBNZXNoKS50aGluSW5zdGFuY2VTZXRCdWZmZXIoXCJtYXRyaXhcIiwgbWF0cmljZXMsIDE2LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiYWJ5bG9uVHJhbnNmb3JtTm9kZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgRVhUX21lc2hfZ3B1X2luc3RhbmNpbmcobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgQXJyYXlJdGVtLCBHTFRGTG9hZGVyIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJQnVmZmVyVmlldyB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElFWFRNZXNob3B0Q29tcHJlc3Npb24gfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lc2hvcHRDb21wcmVzc2lvbiB9IGZyb20gXCJjb3JlL01lc2hlcy9Db21wcmVzc2lvbi9tZXNob3B0Q29tcHJlc3Npb25cIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIkVYVF9tZXNob3B0X2NvbXByZXNzaW9uXCI7XHJcblxyXG5pbnRlcmZhY2UgSUJ1ZmZlclZpZXdNZXNob3B0IGV4dGVuZHMgSUJ1ZmZlclZpZXcge1xyXG4gICAgX21lc2hPcHREYXRhPzogUHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+O1xyXG59XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvVmVuZG9yL0VYVF9tZXNob3B0X2NvbXByZXNzaW9uL1JFQURNRS5tZClcclxuICpcclxuICogVGhpcyBleHRlbnNpb24gdXNlcyBhIFdlYkFzc2VtYmx5IGRlY29kZXIgbW9kdWxlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3pldXgvbWVzaG9wdGltaXplci90cmVlL21hc3Rlci9qc1xyXG4gKiBAc2luY2UgNS4wLjBcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF9tZXNob3B0X2NvbXByZXNzaW9uIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBsb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQnVmZmVyVmlld0FzeW5jKGNvbnRleHQ6IHN0cmluZywgYnVmZmVyVmlldzogSUJ1ZmZlclZpZXcpOiBOdWxsYWJsZTxQcm9taXNlPEFycmF5QnVmZmVyVmlldz4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUVYVE1lc2hvcHRDb21wcmVzc2lvbiwgQXJyYXlCdWZmZXJWaWV3Pihjb250ZXh0LCBidWZmZXJWaWV3LCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlld01lc2hvcHQgPSBidWZmZXJWaWV3IGFzIElCdWZmZXJWaWV3TWVzaG9wdDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlclZpZXdNZXNob3B0Ll9tZXNoT3B0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlclZpZXdNZXNob3B0Ll9tZXNoT3B0RGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9idWZmZXJgLCB0aGlzLl9sb2FkZXIuZ2x0Zi5idWZmZXJzLCBleHRlbnNpb24uYnVmZmVyKTtcclxuICAgICAgICAgICAgYnVmZmVyVmlld01lc2hvcHQuX21lc2hPcHREYXRhID0gdGhpcy5fbG9hZGVyLmxvYWRCdWZmZXJBc3luYyhgL2J1ZmZlcnMvJHtidWZmZXIuaW5kZXh9YCwgYnVmZmVyLCBleHRlbnNpb24uYnl0ZU9mZnNldCB8fCAwLCBleHRlbnNpb24uYnl0ZUxlbmd0aCkudGhlbigoYnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWVzaG9wdENvbXByZXNzaW9uLkRlZmF1bHQuZGVjb2RlR2x0ZkJ1ZmZlckFzeW5jKGJ1ZmZlciBhcyBVaW50OEFycmF5LCBleHRlbnNpb24uY291bnQsIGV4dGVuc2lvbi5ieXRlU3RyaWRlLCBleHRlbnNpb24ubW9kZSwgZXh0ZW5zaW9uLmZpbHRlcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlclZpZXdNZXNob3B0Ll9tZXNoT3B0RGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgRVhUX21lc2hvcHRfY29tcHJlc3Npb24obG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyLCBBcnJheUl0ZW0gfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElUZXh0dXJlIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUVYVFRleHR1cmVXZWJQIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiRVhUX3RleHR1cmVfd2VicFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL1ZlbmRvci9FWFRfdGV4dHVyZV93ZWJwL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEVYVF90ZXh0dXJlX3dlYnAgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKiogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLiAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBsb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkVGV4dHVyZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgdGV4dHVyZTogSVRleHR1cmUsIGFzc2lnbjogKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCk6IE51bGxhYmxlPFByb21pc2U8QmFzZVRleHR1cmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElFWFRUZXh0dXJlV2ViUCwgQmFzZVRleHR1cmU+KGNvbnRleHQsIHRleHR1cmUsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVyID0gdGV4dHVyZS5zYW1wbGVyID09IHVuZGVmaW5lZCA/IEdMVEZMb2FkZXIuRGVmYXVsdFNhbXBsZXIgOiBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L3NhbXBsZXJgLCB0aGlzLl9sb2FkZXIuZ2x0Zi5zYW1wbGVycywgdGV4dHVyZS5zYW1wbGVyKTtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheUl0ZW0uR2V0KGAke2V4dGVuc2lvbkNvbnRleHR9L3NvdXJjZWAsIHRoaXMuX2xvYWRlci5nbHRmLmltYWdlcywgZXh0ZW5zaW9uLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuX2NyZWF0ZVRleHR1cmVBc3luYyhcclxuICAgICAgICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAoYmFieWxvblRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhc3NpZ24oYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICF0ZXh0dXJlLl90ZXh0dXJlSW5mby5ub25Db2xvckRhdGFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgRVhUX3RleHR1cmVfd2VicChsb2FkZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gXCJjb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSVByb3BlcnR5IH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElOb2RlLCBJQ2FtZXJhLCBJTWF0ZXJpYWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJFeHRyYXNBc01ldGFkYXRhXCI7XHJcblxyXG5pbnRlcmZhY2UgT2JqZWN0V2l0aE1ldGFkYXRhIHtcclxuICAgIG1ldGFkYXRhOiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdG9yZSBnbFRGIGV4dHJhcyAoaWYgcHJlc2VudCkgaW4gQkpTIG9iamVjdHMnIG1ldGFkYXRhXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXh0cmFzQXNNZXRhZGF0YSBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2Fzc2lnbkV4dHJhcyhiYWJ5bG9uT2JqZWN0OiBPYmplY3RXaXRoTWV0YWRhdGEsIGdsdGZQcm9wOiBJUHJvcGVydHkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ2x0ZlByb3AuZXh0cmFzICYmIE9iamVjdC5rZXlzKGdsdGZQcm9wLmV4dHJhcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IChiYWJ5bG9uT2JqZWN0Lm1ldGFkYXRhID0gYmFieWxvbk9iamVjdC5tZXRhZGF0YSB8fCB7fSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdsdGYgPSAobWV0YWRhdGEuZ2x0ZiA9IG1ldGFkYXRhLmdsdGYgfHwge30pO1xyXG4gICAgICAgICAgICBnbHRmLmV4dHJhcyA9IGdsdGZQcm9wLmV4dHJhcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIGFzc2lnbjogKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIubG9hZE5vZGVBc3luYyhjb250ZXh0LCBub2RlLCAoYmFieWxvblRyYW5zZm9ybU5vZGUpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzaWduRXh0cmFzKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCBub2RlKTtcclxuICAgICAgICAgICAgYXNzaWduKGJhYnlsb25UcmFuc2Zvcm1Ob2RlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZENhbWVyYUFzeW5jKGNvbnRleHQ6IHN0cmluZywgY2FtZXJhOiBJQ2FtZXJhLCBhc3NpZ246IChiYWJ5bG9uQ2FtZXJhOiBDYW1lcmEpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPENhbWVyYT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRDYW1lcmFBc3luYyhjb250ZXh0LCBjYW1lcmEsIChiYWJ5bG9uQ2FtZXJhKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2lnbkV4dHJhcyhiYWJ5bG9uQ2FtZXJhLCBjYW1lcmEpO1xyXG4gICAgICAgICAgICBhc3NpZ24oYmFieWxvbkNhbWVyYSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZU1hdGVyaWFsKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIpOiBOdWxsYWJsZTxNYXRlcmlhbD4ge1xyXG4gICAgICAgIGNvbnN0IGJhYnlsb25NYXRlcmlhbCA9IHRoaXMuX2xvYWRlci5jcmVhdGVNYXRlcmlhbChjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlKTtcclxuICAgICAgICB0aGlzLl9hc3NpZ25FeHRyYXMoYmFieWxvbk1hdGVyaWFsLCBtYXRlcmlhbCk7XHJcbiAgICAgICAgcmV0dXJuIGJhYnlsb25NYXRlcmlhbDtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKTogSUdMVEZMb2FkZXJFeHRlbnNpb24gPT4gbmV3IEV4dHJhc0FzTWV0YWRhdGEobG9hZGVyKSk7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5cclxuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBJQ2FtZXJhLCBJS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHQsIElNYXRlcmlhbCB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElBbmltYXRhYmxlIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRhYmxlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25Qcm9wZXJ0eUluZm8sIG5vZGVBbmltYXRpb25EYXRhIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJBbmltYXRpb25cIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29sb3IzKF90YXJnZXQ6IGFueSwgc291cmNlOiBGbG9hdDMyQXJyYXksIG9mZnNldDogbnVtYmVyLCBzY2FsZTogbnVtYmVyKTogQ29sb3IzIHtcclxuICAgIHJldHVybiBDb2xvcjMuRnJvbUFycmF5KHNvdXJjZSwgb2Zmc2V0KS5zY2FsZShzY2FsZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFscGhhKF90YXJnZXQ6IGFueSwgc291cmNlOiBGbG9hdDMyQXJyYXksIG9mZnNldDogbnVtYmVyLCBzY2FsZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBzb3VyY2Vbb2Zmc2V0ICsgM10gKiBzY2FsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RmxvYXQoX3RhcmdldDogYW55LCBzb3VyY2U6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHNjYWxlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNvdXJjZVtvZmZzZXRdICogc2NhbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1pbnVzRmxvYXQoX3RhcmdldDogYW55LCBzb3VyY2U6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHNjYWxlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIC1zb3VyY2Vbb2Zmc2V0XSAqIHNjYWxlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZXh0RmxvYXQoX3RhcmdldDogYW55LCBzb3VyY2U6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHNjYWxlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHNvdXJjZVtvZmZzZXQgKyAxXSAqIHNjYWxlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGbG9hdEJ5MihfdGFyZ2V0OiBhbnksIHNvdXJjZTogRmxvYXQzMkFycmF5LCBvZmZzZXQ6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gc291cmNlW29mZnNldF0gKiBzY2FsZSAqIDI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRleHR1cmVUcmFuc2Zvcm1UcmVlKHRleHR1cmVOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2NhbGU6IFtcclxuICAgICAgICAgICAgbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBgJHt0ZXh0dXJlTmFtZX0udVNjYWxlYCwgZ2V0RmxvYXQsICgpID0+IDIpLFxyXG4gICAgICAgICAgICBuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIGAke3RleHR1cmVOYW1lfS52U2NhbGVgLCBnZXROZXh0RmxvYXQsICgpID0+IDIpLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgb2Zmc2V0OiBbXHJcbiAgICAgICAgICAgIG5ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgYCR7dGV4dHVyZU5hbWV9LnVPZmZzZXRgLCBnZXRGbG9hdCwgKCkgPT4gMiksXHJcbiAgICAgICAgICAgIG5ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgYCR7dGV4dHVyZU5hbWV9LnZPZmZzZXRgLCBnZXROZXh0RmxvYXQsICgpID0+IDIpLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcm90YXRpb246IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIGAke3RleHR1cmVOYW1lfS53QW5nYCwgZ2V0TWludXNGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgfTtcclxufVxyXG5cclxuY2xhc3MgQ2FtZXJhQW5pbWF0aW9uUHJvcGVydHlJbmZvIGV4dGVuZHMgQW5pbWF0aW9uUHJvcGVydHlJbmZvIHtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBidWlsZEFuaW1hdGlvbnModGFyZ2V0OiBJQ2FtZXJhLCBuYW1lOiBzdHJpbmcsIGZwczogbnVtYmVyLCBrZXlzOiBhbnlbXSwgY2FsbGJhY2s6IChiYWJ5bG9uQW5pbWF0YWJsZTogSUFuaW1hdGFibGUsIGJhYnlsb25BbmltYXRpb246IEFuaW1hdGlvbikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNhbGxiYWNrKHRhcmdldC5fYmFieWxvbkNhbWVyYSEsIHRoaXMuX2J1aWxkQW5pbWF0aW9uKG5hbWUsIGZwcywga2V5cykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyBleHRlbmRzIEFuaW1hdGlvblByb3BlcnR5SW5mbyB7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgYnVpbGRBbmltYXRpb25zKHRhcmdldDogSU1hdGVyaWFsLCBuYW1lOiBzdHJpbmcsIGZwczogbnVtYmVyLCBrZXlzOiBhbnlbXSwgY2FsbGJhY2s6IChiYWJ5bG9uQW5pbWF0YWJsZTogSUFuaW1hdGFibGUsIGJhYnlsb25BbmltYXRpb246IEFuaW1hdGlvbikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgZmlsbE1vZGUgaW4gdGFyZ2V0Ll9kYXRhISkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0YXJnZXQuX2RhdGEhW2ZpbGxNb2RlXS5iYWJ5bG9uTWF0ZXJpYWwsIHRoaXMuX2J1aWxkQW5pbWF0aW9uKG5hbWUsIGZwcywga2V5cykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGlnaHRBbmltYXRpb25Qcm9wZXJ0eUluZm8gZXh0ZW5kcyBBbmltYXRpb25Qcm9wZXJ0eUluZm8ge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGJ1aWxkQW5pbWF0aW9ucyhcclxuICAgICAgICB0YXJnZXQ6IElLSFJMaWdodHNQdW5jdHVhbF9MaWdodCxcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgZnBzOiBudW1iZXIsXHJcbiAgICAgICAga2V5czogYW55W10sXHJcbiAgICAgICAgY2FsbGJhY2s6IChiYWJ5bG9uQW5pbWF0YWJsZTogSUFuaW1hdGFibGUsIGJhYnlsb25BbmltYXRpb246IEFuaW1hdGlvbikgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgY2FsbGJhY2sodGFyZ2V0Ll9iYWJ5bG9uTGlnaHQhLCB0aGlzLl9idWlsZEFuaW1hdGlvbihuYW1lLCBmcHMsIGtleXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgbm9kZXNUcmVlID0ge1xyXG4gICAgX19hcnJheV9fOiB7XHJcbiAgICAgICAgX190YXJnZXRfXzogdHJ1ZSxcclxuICAgICAgICAuLi5ub2RlQW5pbWF0aW9uRGF0YSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBjYW1lcmFzVHJlZSA9IHtcclxuICAgIF9fYXJyYXlfXzoge1xyXG4gICAgICAgIF9fdGFyZ2V0X186IHRydWUsXHJcbiAgICAgICAgb3J0aG9ncmFwaGljOiB7XHJcbiAgICAgICAgICAgIHhtYWc6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBDYW1lcmFBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwib3J0aG9MZWZ0XCIsIGdldE1pbnVzRmxvYXQsICgpID0+IDEpLFxyXG4gICAgICAgICAgICAgICAgbmV3IENhbWVyYUFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJvcnRob1JpZ2h0XCIsIGdldE5leHRGbG9hdCwgKCkgPT4gMSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHltYWc6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBDYW1lcmFBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwib3J0aG9Cb3R0b21cIiwgZ2V0TWludXNGbG9hdCwgKCkgPT4gMSksXHJcbiAgICAgICAgICAgICAgICBuZXcgQ2FtZXJhQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcIm9ydGhvVG9wXCIsIGdldE5leHRGbG9hdCwgKCkgPT4gMSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHpmYXI6IFtuZXcgQ2FtZXJhQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcIm1heFpcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgem5lYXI6IFtuZXcgQ2FtZXJhQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcIm1pblpcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBlcnNwZWN0aXZlOiB7XHJcbiAgICAgICAgICAgIHlmb3Y6IFtuZXcgQ2FtZXJhQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcImZvdlwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICB6ZmFyOiBbbmV3IENhbWVyYUFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJtYXhaXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgIHpuZWFyOiBbbmV3IENhbWVyYUFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJtaW5aXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBtYXRlcmlhbHNUcmVlID0ge1xyXG4gICAgX19hcnJheV9fOiB7XHJcbiAgICAgICAgX190YXJnZXRfXzogdHJ1ZSxcclxuICAgICAgICBwYnJNZXRhbGxpY1JvdWdobmVzczoge1xyXG4gICAgICAgICAgICBiYXNlQ29sb3JGYWN0b3I6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9DT0xPUjMsIFwiYWxiZWRvQ29sb3JcIiwgZ2V0Q29sb3IzLCAoKSA9PiA0KSxcclxuICAgICAgICAgICAgICAgIG5ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJhbHBoYVwiLCBnZXRBbHBoYSwgKCkgPT4gNCksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG1ldGFsbGljRmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcIm1ldGFsbGljXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgIHJvdWdobmVzc0ZhY3RvcjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJyb3VnaG5lc3NcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgYmFzZUNvbG9yVGV4dHVyZToge1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIEtIUl90ZXh0dXJlX3RyYW5zZm9ybTogZ2V0VGV4dHVyZVRyYW5zZm9ybVRyZWUoXCJhbGJlZG9UZXh0dXJlXCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtaXNzaXZlRmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0NPTE9SMywgXCJlbWlzc2l2ZUNvbG9yXCIsIGdldENvbG9yMywgKCkgPT4gMyldLFxyXG4gICAgICAgIG5vcm1hbFRleHR1cmU6IHtcclxuICAgICAgICAgICAgc2NhbGU6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwiYnVtcFRleHR1cmUubGV2ZWxcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9jY2x1c2lvblRleHR1cmU6IHtcclxuICAgICAgICAgICAgc3RyZW5ndGg6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwiYW1iaWVudFRleHR1cmVTdHJlbmd0aFwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICBleHRlbnNpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBLSFJfdGV4dHVyZV90cmFuc2Zvcm06IGdldFRleHR1cmVUcmFuc2Zvcm1UcmVlKFwiYW1iaWVudFRleHR1cmVcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWlzc2l2ZVRleHR1cmU6IHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xyXG4gICAgICAgICAgICAgICAgS0hSX3RleHR1cmVfdHJhbnNmb3JtOiBnZXRUZXh0dXJlVHJhbnNmb3JtVHJlZShcImVtaXNzaXZlVGV4dHVyZVwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcclxuICAgICAgICAgICAgS0hSX21hdGVyaWFsc19pb3I6IHtcclxuICAgICAgICAgICAgICAgIGlvcjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJpbmRleE9mUmVmcmFjdGlvblwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBLSFJfbWF0ZXJpYWxzX2NsZWFyY29hdDoge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJjb2F0RmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcImNsZWFyQ29hdC5pbnRlbnNpdHlcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgICAgIGNsZWFyY29hdFJvdWdobmVzc0ZhY3RvcjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJjbGVhckNvYXQucm91Z2huZXNzXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEtIUl9tYXRlcmlhbHNfc2hlZW46IHtcclxuICAgICAgICAgICAgICAgIHNoZWVuQ29sb3JGYWN0b3I6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfQ09MT1IzLCBcInNoZWVuLmNvbG9yXCIsIGdldENvbG9yMywgKCkgPT4gMyldLFxyXG4gICAgICAgICAgICAgICAgc2hlZW5Sb3VnaG5lc3NGYWN0b3I6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwic2hlZW4ucm91Z2huZXNzXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEtIUl9tYXRlcmlhbHNfc3BlY3VsYXI6IHtcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyRmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcIm1ldGFsbGljRjBGYWN0b3JcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgICAgIHNwZWN1bGFyQ29sb3JGYWN0b3I6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfQ09MT1IzLCBcIm1ldGFsbGljUmVmbGVjdGFuY2VDb2xvclwiLCBnZXRDb2xvcjMsICgpID0+IDMpXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aDoge1xyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVTdHJlbmd0aDogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJlbWlzc2l2ZUludGVuc2l0eVwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBLSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvbjoge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNtaXNzaW9uRmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcInN1YlN1cmZhY2UucmVmcmFjdGlvbkludGVuc2l0eVwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBLSFJfbWF0ZXJpYWxzX3ZvbHVtZToge1xyXG4gICAgICAgICAgICAgICAgYXR0ZW51YXRpb25Db2xvcjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9DT0xPUjMsIFwic3ViU3VyZmFjZS50aW50Q29sb3JcIiwgZ2V0Q29sb3IzLCAoKSA9PiAzKV0sXHJcbiAgICAgICAgICAgICAgICBhdHRlbnVhdGlvbkRpc3RhbmNlOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcInN1YlN1cmZhY2UudGludENvbG9yQXREaXN0YW5jZVwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICAgICAgdGhpY2tuZXNzRmFjdG9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcInN1YlN1cmZhY2UubWF4aW11bVRoaWNrbmVzc1wiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBLSFJfbWF0ZXJpYWxzX2lyaWRlc2NlbmNlOiB7XHJcbiAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZUZhY3RvcjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJpcmlkZXNjZW5jZS5pbnRlbnNpdHlcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgICAgIGlyaWRlc2NlbmNlSW9yOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcImlyaWRlc2NlbmNlLmluZGV4T2ZSZWZyYWN0aW9uXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgICAgICBpcmlkZXNjZW5jZVRoaWNrbmVzc01pbmltdW06IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwiaXJpZGVzY2VuY2UubWluaW11bVRoaWNrbmVzc1wiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICAgICAgaXJpZGVzY2VuY2VUaGlja25lc3NNYXhpbXVtOiBbbmV3IE1hdGVyaWFsQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcImlyaWRlc2NlbmNlLm1heGltdW1UaGlja25lc3NcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5OiB7XHJcbiAgICAgICAgICAgICAgICBhbmlzb3Ryb3B5U3RyZW5ndGg6IFtuZXcgTWF0ZXJpYWxBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwiYW5pc290cm9weS5pbnRlbnNpdHlcIiwgZ2V0RmxvYXQsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgICAgIGFuaXNvdHJvcHlSb3RhdGlvbjogW25ldyBNYXRlcmlhbEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJhbmlzb3Ryb3B5LmFuZ2xlXCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn07XHJcblxyXG5jb25zdCBleHRlbnNpb25zVHJlZSA9IHtcclxuICAgIEtIUl9saWdodHNfcHVuY3R1YWw6IHtcclxuICAgICAgICBsaWdodHM6IHtcclxuICAgICAgICAgICAgX19hcnJheV9fOiB7XHJcbiAgICAgICAgICAgICAgICBfX3RhcmdldF9fOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IFtuZXcgTGlnaHRBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfQ09MT1IzLCBcImRpZmZ1c2VcIiwgZ2V0Q29sb3IzLCAoKSA9PiAzKV0sXHJcbiAgICAgICAgICAgICAgICBpbnRlbnNpdHk6IFtuZXcgTGlnaHRBbmltYXRpb25Qcm9wZXJ0eUluZm8oQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfRkxPQVQsIFwiaW50ZW5zaXR5XCIsIGdldEZsb2F0LCAoKSA9PiAxKV0sXHJcbiAgICAgICAgICAgICAgICByYW5nZTogW25ldyBMaWdodEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJyYW5nZVwiLCBnZXRGbG9hdCwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICAgICAgc3BvdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyQ29uZUFuZ2xlOiBbbmV3IExpZ2h0QW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX0ZMT0FULCBcImlubmVyQW5nbGVcIiwgZ2V0RmxvYXRCeTIsICgpID0+IDEpXSxcclxuICAgICAgICAgICAgICAgICAgICBvdXRlckNvbmVBbmdsZTogW25ldyBMaWdodEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJhbmdsZVwiLCBnZXRGbG9hdEJ5MiwgKCkgPT4gMSldLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufTtcclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvblBvaW50ZXJUcmVlID0ge1xyXG4gICAgbm9kZXM6IG5vZGVzVHJlZSxcclxuICAgIG1hdGVyaWFsczogbWF0ZXJpYWxzVHJlZSxcclxuICAgIGNhbWVyYXM6IGNhbWVyYXNUcmVlLFxyXG4gICAgZXh0ZW5zaW9uczogZXh0ZW5zaW9uc1RyZWUsXHJcbn07XHJcbiIsImltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJQW5pbWF0aW9uVGFyZ2V0SW5mbyB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEFuaW1hdGlvbiB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGFibGUgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGlvbiwgSUFuaW1hdGlvbkNoYW5uZWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJS0hSQW5pbWF0aW9uUG9pbnRlciB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGggfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JlL01pc2MvbG9nZ2VyXCI7XHJcbmltcG9ydCB7IGFuaW1hdGlvblBvaW50ZXJUcmVlIH0gZnJvbSBcIi4vS0hSX2FuaW1hdGlvbl9wb2ludGVyLmRhdGFcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9hbmltYXRpb25fcG9pbnRlclwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uIFBSXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvcHVsbC8yMTQ3KVxyXG4gKiAhISEgRXhwZXJpbWVudGFsIEV4dGVuc2lvbiBTdWJqZWN0IHRvIENoYW5nZXMgISEhXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfYW5pbWF0aW9uX3BvaW50ZXIgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgZ2xURiBhbmltYXRpb24gY2hhbm5lbC5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25Db250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBhbmltYXRpb24gd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgZ2xURiBhbmltYXRpb24gcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBjaGFubmVsIFRoZSBnbFRGIGFuaW1hdGlvbiBjaGFubmVsIHByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0gb25Mb2FkIENhbGxlZCBmb3IgZWFjaCBhbmltYXRpb24gbG9hZGVkXHJcbiAgICAgKiBAcmV0dXJucyBBIHZvaWQgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGUgb3IgbnVsbCBpZiBub3QgaGFuZGxlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRBbmltYXRpb25DaGFubmVsQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIGFuaW1hdGlvbkNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBhbmltYXRpb246IElBbmltYXRpb24sXHJcbiAgICAgICAgY2hhbm5lbDogSUFuaW1hdGlvbkNoYW5uZWwsXHJcbiAgICAgICAgb25Mb2FkOiAoYmFieWxvbkFuaW1hdGFibGU6IElBbmltYXRhYmxlLCBiYWJ5bG9uQW5pbWF0aW9uOiBBbmltYXRpb24pID0+IHZvaWRcclxuICAgICk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb24gPSBjaGFubmVsLnRhcmdldC5leHRlbnNpb25zPy5LSFJfYW5pbWF0aW9uX3BvaW50ZXIgYXMgSUtIUkFuaW1hdGlvblBvaW50ZXI7XHJcbiAgICAgICAgaWYgKCFleHRlbnNpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhbm5lbC50YXJnZXQucGF0aCAhPT0gQW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUE9JTlRFUikge1xyXG4gICAgICAgICAgICBMb2dnZXIuV2FybihgJHtjb250ZXh0fS90YXJnZXQvcGF0aDogVmFsdWUgKCR7Y2hhbm5lbC50YXJnZXQucGF0aH0pIG11c3QgYmUgKCR7QW5pbWF0aW9uQ2hhbm5lbFRhcmdldFBhdGguUE9JTlRFUn0pIHdoZW4gdXNpbmcgdGhlICR7dGhpcy5uYW1lfSBleHRlbnNpb25gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjaGFubmVsLnRhcmdldC5ub2RlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuV2FybihgJHtjb250ZXh0fS90YXJnZXQvbm9kZTogVmFsdWUgKCR7Y2hhbm5lbC50YXJnZXQubm9kZX0pIG11c3Qgbm90IGJlIHByZXNlbnQgd2hlbiB1c2luZyB0aGUgJHt0aGlzLm5hbWV9IGV4dGVuc2lvbmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uQ29udGV4dCA9IGAke2NvbnRleHR9L2V4dGVuc2lvbnMvJHt0aGlzLm5hbWV9YDtcclxuXHJcbiAgICAgICAgY29uc3QgcG9pbnRlciA9IGV4dGVuc2lvbi5wb2ludGVyO1xyXG4gICAgICAgIGlmICghcG9pbnRlcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXh0ZW5zaW9uQ29udGV4dH06IFBvaW50ZXIgaXMgbWlzc2luZ2ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5mbyA9IHRoaXMuX3BhcnNlQW5pbWF0aW9uUG9pbnRlcihgJHtleHRlbnNpb25Db250ZXh0fS9wb2ludGVyYCwgcG9pbnRlcik7XHJcbiAgICAgICAgaWYgKCF0YXJnZXRJbmZvKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5XYXJuKGAke2V4dGVuc2lvbkNvbnRleHR9L3BvaW50ZXI6IEludmFsaWQgcG9pbnRlciAoJHtwb2ludGVyfSkgc2tpcHBlZGApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuX2xvYWRBbmltYXRpb25DaGFubmVsRnJvbVRhcmdldEluZm9Bc3luYyhjb250ZXh0LCBhbmltYXRpb25Db250ZXh0LCBhbmltYXRpb24sIGNoYW5uZWwsIHRhcmdldEluZm8sIG9uTG9hZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcG9pbnRlciBzdHJpbmcgaXMgcmVwcmVzZW50ZWQgYnkgYSBbSlNPTiBwb2ludGVyXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzY5MDEpLlxyXG4gICAgICogPGFuaW1hdGlvblBvaW50ZXI+IDo9IC88cm9vdE5vZGU+Lzxhc3NldEluZGV4Pi88cHJvcGVydHlQYXRoPlxyXG4gICAgICogPHJvb3ROb2RlPiA6PSBcIm5vZGVzXCIgfCBcIm1hdGVyaWFsc1wiIHwgXCJtZXNoZXNcIiB8IFwiY2FtZXJhc1wiIHwgXCJleHRlbnNpb25zXCJcclxuICAgICAqIDxhc3NldEluZGV4PiA6PSA8ZGlnaXQ+IHwgPG5hbWU+XHJcbiAgICAgKiA8cHJvcGVydHlQYXRoPiA6PSA8ZXh0ZW5zaW9uUGF0aD4gfCA8c3RhbmRhcmRQYXRoPlxyXG4gICAgICogPGV4dGVuc2lvblBhdGg+IDo9IFwiZXh0ZW5zaW9uc1wiLzxuYW1lPi88c3RhbmRhcmRQYXRoPlxyXG4gICAgICogPHN0YW5kYXJkUGF0aD4gOj0gPG5hbWU+IHwgPG5hbWU+LzxzdGFuZGFyZFBhdGg+XHJcbiAgICAgKiA8bmFtZT4gOj0gVytcclxuICAgICAqIDxkaWdpdD4gOj0gRCtcclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlczpcclxuICAgICAqICAtIFwiL25vZGVzLzAvcm90YXRpb25cIlxyXG4gICAgICogIC0gXCIvbWF0ZXJpYWxzLzIvZW1pc3NpdmVGYWN0b3JcIlxyXG4gICAgICogIC0gXCIvbWF0ZXJpYWxzLzIvcGJyTWV0YWxsaWNSb3VnaG5lc3MvYmFzZUNvbG9yRmFjdG9yXCJcclxuICAgICAqICAtIFwiL21hdGVyaWFscy8yL2V4dGVuc2lvbnMvS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aC9lbWlzc2l2ZVN0cmVuZ3RoXCJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGFyc2VBbmltYXRpb25Qb2ludGVyKGNvbnRleHQ6IHN0cmluZywgcG9pbnRlcjogc3RyaW5nKTogTnVsbGFibGU8SUFuaW1hdGlvblRhcmdldEluZm8+IHtcclxuICAgICAgICBpZiAoIXBvaW50ZXIuc3RhcnRzV2l0aChcIi9cIikpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH06IFZhbHVlICgke3BvaW50ZXJ9KSBtdXN0IHN0YXJ0IHdpdGggYSBzbGFzaGApO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gcG9pbnRlci5zcGxpdChcIi9cIik7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZmlyc3QgcGFydCBzaW5jZSBpdCB3aWxsIGJlIGVtcHR5IHN0cmluZyBhcyBwb2ludGVycyBtdXN0IHN0YXJ0IHdpdGggYSBzbGFzaC5cclxuICAgICAgICBwYXJ0cy5zaGlmdCgpO1xyXG5cclxuICAgICAgICBsZXQgbm9kZTogYW55ID0gYW5pbWF0aW9uUG9pbnRlclRyZWU7XHJcbiAgICAgICAgbGV0IGdsdGZDdXJyZW50Tm9kZTogYW55ID0gdGhpcy5fbG9hZGVyLmdsdGY7XHJcbiAgICAgICAgbGV0IGdsdGZUYXJnZXROb2RlOiBhbnkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLl9fYXJyYXlfXykge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuX19hcnJheV9fO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbcGFydF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2x0ZkN1cnJlbnROb2RlID0gZ2x0ZkN1cnJlbnROb2RlICYmIGdsdGZDdXJyZW50Tm9kZVtwYXJ0XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlLl9fdGFyZ2V0X18pIHtcclxuICAgICAgICAgICAgICAgIGdsdGZUYXJnZXROb2RlID0gZ2x0ZkN1cnJlbnROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWdsdGZUYXJnZXROb2RlIHx8ICFBcnJheS5pc0FycmF5KG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGFyZ2V0OiBnbHRmVGFyZ2V0Tm9kZSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogbm9kZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfYW5pbWF0aW9uX3BvaW50ZXIobG9hZGVyKSk7XHJcbiIsImltcG9ydCB7IERyYWNvQ29tcHJlc3Npb24gfSBmcm9tIFwiY29yZS9NZXNoZXMvQ29tcHJlc3Npb24vZHJhY29Db21wcmVzc2lvblwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5cclxuaW1wb3J0IHsgTWVzaFByaW1pdGl2ZU1vZGUgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUkRyYWNvTWVzaENvbXByZXNzaW9uIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IElNZXNoUHJpbWl0aXZlLCBJQnVmZmVyVmlldyB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciwgQXJyYXlJdGVtIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9kcmFjb19tZXNoX2NvbXByZXNzaW9uXCI7XHJcblxyXG5pbnRlcmZhY2UgSUJ1ZmZlclZpZXdEcmFjbyBleHRlbmRzIElCdWZmZXJWaWV3IHtcclxuICAgIF9kcmFjb0JhYnlsb25HZW9tZXRyeT86IFByb21pc2U8R2VvbWV0cnk+O1xyXG59XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfZHJhY29fbWVzaF9jb21wcmVzc2lvbi9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfZHJhY29fbWVzaF9jb21wcmVzc2lvbiBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmFjbyBjb21wcmVzc2lvbiB1c2VkIHRvIGRlY29kZSB2ZXJ0ZXggZGF0YSBvciBEcmFjb0NvbXByZXNzaW9uLkRlZmF1bHQgaWYgbm90IGRlZmluZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRyYWNvQ29tcHJlc3Npb24/OiBEcmFjb0NvbXByZXNzaW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgbm9ybWFsaXplZCBmbGFnIGZyb20gdGhlIGdsVEYgYWNjZXNzb3IgaW5zdGVhZCBvZiB0aGUgRHJhY28gZGF0YS4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZU5vcm1hbGl6ZWRGbGFnRnJvbUFjY2Vzc29yID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IERyYWNvQ29tcHJlc3Npb24uRGVjb2RlckF2YWlsYWJsZSAmJiB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRyYWNvQ29tcHJlc3Npb247XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRWZXJ0ZXhEYXRhQXN5bmMoY29udGV4dDogc3RyaW5nLCBwcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBiYWJ5bG9uTWVzaDogTWVzaCk6IE51bGxhYmxlPFByb21pc2U8R2VvbWV0cnk+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJEcmFjb01lc2hDb21wcmVzc2lvbiwgR2VvbWV0cnk+KGNvbnRleHQsIHByaW1pdGl2ZSwgdGhpcy5uYW1lLCAoZXh0ZW5zaW9uQ29udGV4dCwgZXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcmltaXRpdmUubW9kZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmltaXRpdmUubW9kZSAhPT0gTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfU1RSSVAgJiYgcHJpbWl0aXZlLm1vZGUgIT09IE1lc2hQcmltaXRpdmVNb2RlLlRSSUFOR0xFUykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogVW5zdXBwb3J0ZWQgbW9kZSAke3ByaW1pdGl2ZS5tb2RlfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSB0cmlhbmdsZSBzdHJpcHNcclxuICAgICAgICAgICAgICAgIGlmIChwcmltaXRpdmUubW9kZSA9PT0gTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfU1RSSVApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06IE1vZGUgJHtwcmltaXRpdmUubW9kZX0gaXMgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWRgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlczogeyBba2luZDogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZDogeyBba2luZDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYWRBdHRyaWJ1dGUgPSAobmFtZTogc3RyaW5nLCBraW5kOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUlkID0gZXh0ZW5zaW9uLmF0dHJpYnV0ZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAodW5pcXVlSWQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoLl9kZWxheUluZm8gPSBiYWJ5bG9uTWVzaC5fZGVsYXlJbmZvIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoLl9kZWxheUluZm8uaW5kZXhPZihraW5kKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5fZGVsYXlJbmZvLnB1c2goa2luZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlc1traW5kXSA9IHVuaXF1ZUlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZU5vcm1hbGl6ZWRGbGFnRnJvbUFjY2Vzc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWNjZXNzb3IgPSBBcnJheUl0ZW0uVHJ5R2V0KHRoaXMuX2xvYWRlci5nbHRmLmFjY2Vzc29ycywgcHJpbWl0aXZlLmF0dHJpYnV0ZXNbbmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY2Nlc3Nvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkW2tpbmRdID0gYWNjZXNzb3Iubm9ybWFsaXplZCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiUE9TSVRJT05cIiwgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCk7XHJcbiAgICAgICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJOT1JNQUxcIiwgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEFOR0VOVFwiLCBWZXJ0ZXhCdWZmZXIuVGFuZ2VudEtpbmQpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfMFwiLCBWZXJ0ZXhCdWZmZXIuVVZLaW5kKTtcclxuICAgICAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRFWENPT1JEXzFcIiwgVmVydGV4QnVmZmVyLlVWMktpbmQpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfMlwiLCBWZXJ0ZXhCdWZmZXIuVVYzS2luZCk7XHJcbiAgICAgICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJURVhDT09SRF8zXCIsIFZlcnRleEJ1ZmZlci5VVjRLaW5kKTtcclxuICAgICAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRFWENPT1JEXzRcIiwgVmVydGV4QnVmZmVyLlVWNUtpbmQpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfNVwiLCBWZXJ0ZXhCdWZmZXIuVVY2S2luZCk7XHJcbiAgICAgICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJKT0lOVFNfMFwiLCBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNJbmRpY2VzS2luZCk7XHJcbiAgICAgICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJXRUlHSFRTXzBcIiwgVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0tpbmQpO1xyXG4gICAgICAgICAgICBsb2FkQXR0cmlidXRlKFwiQ09MT1JfMFwiLCBWZXJ0ZXhCdWZmZXIuQ29sb3JLaW5kKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBBcnJheUl0ZW0uR2V0KGV4dGVuc2lvbkNvbnRleHQsIHRoaXMuX2xvYWRlci5nbHRmLmJ1ZmZlclZpZXdzLCBleHRlbnNpb24uYnVmZmVyVmlldykgYXMgSUJ1ZmZlclZpZXdEcmFjbztcclxuICAgICAgICAgICAgaWYgKCFidWZmZXJWaWV3Ll9kcmFjb0JhYnlsb25HZW9tZXRyeSkge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyVmlldy5fZHJhY29CYWJ5bG9uR2VvbWV0cnkgPSB0aGlzLl9sb2FkZXIubG9hZEJ1ZmZlclZpZXdBc3luYyhgL2J1ZmZlclZpZXdzLyR7YnVmZmVyVmlldy5pbmRleH1gLCBidWZmZXJWaWV3KS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhY29Db21wcmVzc2lvbiA9IHRoaXMuZHJhY29Db21wcmVzc2lvbiB8fCBEcmFjb0NvbXByZXNzaW9uLkRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWNvQ29tcHJlc3Npb24uX2RlY29kZU1lc2hUb0dlb21ldHJ5Rm9yR2x0ZkFzeW5jKGJhYnlsb25NZXNoLm5hbWUsIHRoaXMuX2xvYWRlci5iYWJ5bG9uU2NlbmUsIGRhdGEsIGF0dHJpYnV0ZXMsIG5vcm1hbGl6ZWQpLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyVmlldy5fZHJhY29CYWJ5bG9uR2VvbWV0cnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IEtIUl9kcmFjb19tZXNoX2NvbXByZXNzaW9uKGxvYWRlcikpO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvZGlyZWN0aW9uYWxMaWdodFwiO1xyXG5pbXBvcnQgeyBQb2ludExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3BvaW50TGlnaHRcIjtcclxuaW1wb3J0IHsgU3BvdExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3Nwb3RMaWdodFwiO1xyXG5pbXBvcnQgeyBMaWdodCB9IGZyb20gXCJjb3JlL0xpZ2h0cy9saWdodFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRSZWZlcmVuY2UgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0VHlwZSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJTm9kZSwgSUtIUkxpZ2h0c1B1bmN0dWFsX0xpZ2h0IH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyLCBBcnJheUl0ZW0gfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX2xpZ2h0c19wdW5jdHVhbFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX2xpZ2h0c19wdW5jdHVhbC9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbGlnaHRzIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBoaWRkZW4gKi9cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuICAgIHByaXZhdGUgX2xpZ2h0cz86IElLSFJMaWdodHNQdW5jdHVhbF9MaWdodFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpZ2h0cztcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb25Mb2FkaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSB0aGlzLl9sb2FkZXIuZ2x0Zi5leHRlbnNpb25zO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25zICYmIGV4dGVuc2lvbnNbdGhpcy5uYW1lXSkge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBleHRlbnNpb25zW3RoaXMubmFtZV0gYXMgYW55O1xyXG4gICAgICAgICAgICB0aGlzLl9saWdodHMgPSBleHRlbnNpb24ubGlnaHRzO1xyXG4gICAgICAgICAgICBBcnJheUl0ZW0uQXNzaWduKHRoaXMuX2xpZ2h0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIGFzc2lnbjogKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPj4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGTG9hZGVyLkxvYWRFeHRlbnNpb25Bc3luYzxJS0hSTGlnaHRzUHVuY3R1YWxfTGlnaHRSZWZlcmVuY2UsIFRyYW5zZm9ybU5vZGU+KGNvbnRleHQsIG5vZGUsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWROb2RlQXN5bmMoY29udGV4dCwgbm9kZSwgKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFieWxvbkxpZ2h0OiBMaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaWdodCA9IEFycmF5SXRlbS5HZXQoZXh0ZW5zaW9uQ29udGV4dCwgdGhpcy5fbGlnaHRzLCBleHRlbnNpb24ubGlnaHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxpZ2h0Lm5hbWUgfHwgYmFieWxvbk1lc2gubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSAhIXRoaXMuX2xvYWRlci5fYXNzZXRDb250YWluZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaWdodC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuRElSRUNUSU9OQUw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbkRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodChuYW1lLCBWZWN0b3IzLkJhY2t3YXJkKCksIHRoaXMuX2xvYWRlci5iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uRGlyZWN0aW9uYWxMaWdodC5wb3NpdGlvbi5zZXRBbGwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25MaWdodCA9IGJhYnlsb25EaXJlY3Rpb25hbExpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuUE9JTlQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbkxpZ2h0ID0gbmV3IFBvaW50TGlnaHQobmFtZSwgVmVjdG9yMy5aZXJvKCksIHRoaXMuX2xvYWRlci5iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBLSFJMaWdodHNQdW5jdHVhbF9MaWdodFR5cGUuU1BPVDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uU3BvdExpZ2h0ID0gbmV3IFNwb3RMaWdodChuYW1lLCBWZWN0b3IzLlplcm8oKSwgVmVjdG9yMy5CYWNrd2FyZCgpLCAwLCAxLCB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvblNwb3RMaWdodC5hbmdsZSA9ICgobGlnaHQuc3BvdCAmJiBsaWdodC5zcG90Lm91dGVyQ29uZUFuZ2xlKSB8fCBNYXRoLlBJIC8gNCkgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uU3BvdExpZ2h0LmlubmVyQW5nbGUgPSAoKGxpZ2h0LnNwb3QgJiYgbGlnaHQuc3BvdC5pbm5lckNvbmVBbmdsZSkgfHwgMCkgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTGlnaHQgPSBiYWJ5bG9uU3BvdExpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2V4dGVuc2lvbkNvbnRleHR9OiBJbnZhbGlkIGxpZ2h0IHR5cGUgKCR7bGlnaHQudHlwZX0pYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJhYnlsb25MaWdodC5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fbG9hZGVyLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGlnaHQuX2JhYnlsb25MaWdodCA9IGJhYnlsb25MaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTGlnaHQuZmFsbG9mZlR5cGUgPSBMaWdodC5GQUxMT0ZGX0dMVEY7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTGlnaHQuZGlmZnVzZSA9IGxpZ2h0LmNvbG9yID8gQ29sb3IzLkZyb21BcnJheShsaWdodC5jb2xvcikgOiBDb2xvcjMuV2hpdGUoKTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25MaWdodC5pbnRlbnNpdHkgPSBsaWdodC5pbnRlbnNpdHkgPT0gdW5kZWZpbmVkID8gMSA6IGxpZ2h0LmludGVuc2l0eTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25MaWdodC5yYW5nZSA9IGxpZ2h0LnJhbmdlID09IHVuZGVmaW5lZCA/IE51bWJlci5NQVhfVkFMVUUgOiBsaWdodC5yYW5nZTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25MaWdodC5wYXJlbnQgPSBiYWJ5bG9uTWVzaDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIuX2JhYnlsb25MaWdodHMucHVzaChiYWJ5bG9uTGlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIEdMVEZMb2FkZXIuQWRkUG9pbnRlck1ldGFkYXRhKGJhYnlsb25MaWdodCwgZXh0ZW5zaW9uQ29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXNzaWduKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IEtIUl9saWdodHMobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbHNBbmlzb3Ryb3B5IH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5XCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHkpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHkgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGEgbnVtYmVyIHRoYXQgZGV0ZXJtaW5lcyB0aGUgb3JkZXIgdGhlIGV4dGVuc2lvbnMgYXJlIGFwcGxpZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcmRlciA9IDE5NTtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUtIUk1hdGVyaWFsc0FuaXNvdHJvcHk+KGNvbnRleHQsIG1hdGVyaWFsLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRJcmlkZXNjZW5jZVByb3BlcnRpZXNBc3luYyhleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24sIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRJcmlkZXNjZW5jZVByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByb3BlcnRpZXM6IElLSFJNYXRlcmlhbHNBbmlzb3Ryb3B5LCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmlzRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbmlzb3Ryb3B5LmludGVuc2l0eSA9IHByb3BlcnRpZXMuYW5pc290cm9weVN0cmVuZ3RoID8/IDA7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkuYW5nbGUgPSBwcm9wZXJ0aWVzLmFuaXNvdHJvcHlSb3RhdGlvbiA/PyAwO1xyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5hbmlzb3Ryb3B5VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2FuaXNvdHJvcHlUZXh0dXJlYCwgcHJvcGVydGllcy5hbmlzb3Ryb3B5VGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKEFuaXNvdHJvcHkgSW50ZW5zaXR5KWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFuaXNvdHJvcHkudGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19hbmlzb3Ryb3B5KGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbHNDbGVhcmNvYXQgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX2NsZWFyY29hdFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19jbGVhcmNvYXQvUkVBRE1FLm1kKVxyXG4gKiBbUGxheWdyb3VuZCBTYW1wbGVdKGh0dHBzOi8vd3d3LmJhYnlsb25qcy1wbGF5Z3JvdW5kLmNvbS9mcmFtZS5odG1sIzdGN1BONiM4KVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19jbGVhcmNvYXQgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGEgbnVtYmVyIHRoYXQgZGV0ZXJtaW5lcyB0aGUgb3JkZXIgdGhlIGV4dGVuc2lvbnMgYXJlIGFwcGxpZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcmRlciA9IDE5MDtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUtIUk1hdGVyaWFsc0NsZWFyY29hdD4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZENsZWFyQ29hdFByb3BlcnRpZXNBc3luYyhleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24sIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRDbGVhckNvYXRQcm9wZXJ0aWVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBwcm9wZXJ0aWVzOiBJS0hSTWF0ZXJpYWxzQ2xlYXJjb2F0LCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQuaXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSA9IGZhbHNlO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5jbGVhckNvYXQucmVtYXBGME9uSW50ZXJmYWNlQ2hhbmdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmNsZWFyY29hdEZhY3RvciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5pbnRlbnNpdHkgPSBwcm9wZXJ0aWVzLmNsZWFyY29hdEZhY3RvcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmludGVuc2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5jbGVhcmNvYXRUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vY2xlYXJjb2F0VGV4dHVyZWAsIHByb3BlcnRpZXMuY2xlYXJjb2F0VGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKENsZWFyQ29hdCBJbnRlbnNpdHkpYDtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmNsZWFyY29hdFJvdWdobmVzc0ZhY3RvciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5yb3VnaG5lc3MgPSBwcm9wZXJ0aWVzLmNsZWFyY29hdFJvdWdobmVzc0ZhY3RvcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LnJvdWdobmVzcyA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5jbGVhcmNvYXRSb3VnaG5lc3NUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIChwcm9wZXJ0aWVzLmNsZWFyY29hdFJvdWdobmVzc1RleHR1cmUgYXMgSVRleHR1cmVJbmZvKS5ub25Db2xvckRhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2NsZWFyY29hdFJvdWdobmVzc1RleHR1cmVgLCBwcm9wZXJ0aWVzLmNsZWFyY29hdFJvdWdobmVzc1RleHR1cmUsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5uYW1lID0gYCR7YmFieWxvbk1hdGVyaWFsLm5hbWV9IChDbGVhckNvYXQgUm91Z2huZXNzKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC50ZXh0dXJlUm91Z2huZXNzID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5jbGVhcmNvYXROb3JtYWxUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIChwcm9wZXJ0aWVzLmNsZWFyY29hdE5vcm1hbFRleHR1cmUgYXMgSVRleHR1cmVJbmZvKS5ub25Db2xvckRhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2NsZWFyY29hdE5vcm1hbFRleHR1cmVgLCBwcm9wZXJ0aWVzLmNsZWFyY29hdE5vcm1hbFRleHR1cmUsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5uYW1lID0gYCR7YmFieWxvbk1hdGVyaWFsLm5hbWV9IChDbGVhckNvYXQgTm9ybWFsKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmNsZWFyQ29hdC5idW1wVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmludmVydE5vcm1hbE1hcFggPSAhYmFieWxvbk1hdGVyaWFsLmdldFNjZW5lKCkudXNlUmlnaHRIYW5kZWRTeXN0ZW07XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5pbnZlcnROb3JtYWxNYXBZID0gYmFieWxvbk1hdGVyaWFsLmdldFNjZW5lKCkudXNlUmlnaHRIYW5kZWRTeXN0ZW07XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmNsZWFyY29hdE5vcm1hbFRleHR1cmUuc2NhbGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuY2xlYXJDb2F0LmJ1bXBUZXh0dXJlIS5sZXZlbCA9IHByb3BlcnRpZXMuY2xlYXJjb2F0Tm9ybWFsVGV4dHVyZS5zY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19jbGVhcmNvYXQobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbHNFbWlzc2l2ZVN0cmVuZ3RoIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aFwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aC9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxNzA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNFbWlzc2l2ZVN0cmVuZ3RoPihjb250ZXh0LCBtYXRlcmlhbCwgdGhpcy5uYW1lLCAoZXh0ZW5zaW9uQ29udGV4dCwgZXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIubG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZEVtaXNzaXZlUHJvcGVydGllcyhleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24sIGJhYnlsb25NYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRFbWlzc2l2ZVByb3BlcnRpZXMoY29udGV4dDogc3RyaW5nLCBwcm9wZXJ0aWVzOiBJS0hSTWF0ZXJpYWxzRW1pc3NpdmVTdHJlbmd0aCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06IE1hdGVyaWFsIHR5cGUgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuZW1pc3NpdmVTdHJlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5lbWlzc2l2ZUNvbG9yLnNjYWxlVG9SZWYocHJvcGVydGllcy5lbWlzc2l2ZVN0cmVuZ3RoLCBiYWJ5bG9uTWF0ZXJpYWwuZW1pc3NpdmVDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJS0hSTWF0ZXJpYWxzSW9yIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19pb3JcIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfaW9yL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfaW9yIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0IGlvciBWYWx1ZSBmcm9tIHRoZSBzcGVjLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfREVGQVVMVF9JT1IgPSAxLjU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxODA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNJb3I+KGNvbnRleHQsIG1hdGVyaWFsLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRJb3JQcm9wZXJ0aWVzQXN5bmMoZXh0ZW5zaW9uQ29udGV4dCwgZXh0ZW5zaW9uLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkSW9yUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJvcGVydGllczogSUtIUk1hdGVyaWFsc0lvciwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmICghKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06IE1hdGVyaWFsIHR5cGUgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuaW9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmluZGV4T2ZSZWZyYWN0aW9uID0gcHJvcGVydGllcy5pb3I7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmluZGV4T2ZSZWZyYWN0aW9uID0gS0hSX21hdGVyaWFsc19pb3IuX0RFRkFVTFRfSU9SO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX2lvcihsb2FkZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IElNYXRlcmlhbCB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUk1hdGVyaWFsc0lyaWRlc2NlbmNlIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZVwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZS9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX2lyaWRlc2NlbmNlIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxOTU7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNJcmlkZXNjZW5jZT4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZElyaWRlc2NlbmNlUHJvcGVydGllc0FzeW5jKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbiwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZElyaWRlc2NlbmNlUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJvcGVydGllczogSUtIUk1hdGVyaWFsc0lyaWRlc2NlbmNlLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS5pc0VuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuaXJpZGVzY2VuY2UuaW50ZW5zaXR5ID0gcHJvcGVydGllcy5pcmlkZXNjZW5jZUZhY3RvciA/PyAwO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5pcmlkZXNjZW5jZS5pbmRleE9mUmVmcmFjdGlvbiA9IHByb3BlcnRpZXMuaXJpZGVzY2VuY2VJb3IgPz8gKHByb3BlcnRpZXMgYXMgYW55KS5pcmlkZXNjZW5jZUlPUiA/PyAxLjM7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLm1pbmltdW1UaGlja25lc3MgPSBwcm9wZXJ0aWVzLmlyaWRlc2NlbmNlVGhpY2tuZXNzTWluaW11bSA/PyAxMDA7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLm1heGltdW1UaGlja25lc3MgPSBwcm9wZXJ0aWVzLmlyaWRlc2NlbmNlVGhpY2tuZXNzTWF4aW11bSA/PyA0MDA7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmlyaWRlc2NlbmNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2lyaWRlc2NlbmNlVGV4dHVyZWAsIHByb3BlcnRpZXMuaXJpZGVzY2VuY2VUZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoSXJpZGVzY2VuY2UgSW50ZW5zaXR5KWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmlyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2lyaWRlc2NlbmNlVGhpY2tuZXNzVGV4dHVyZWAsIHByb3BlcnRpZXMuaXJpZGVzY2VuY2VUaGlja25lc3NUZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoSXJpZGVzY2VuY2UgVGhpY2tuZXNzKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmlyaWRlc2NlbmNlLnRoaWNrbmVzc1RleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfaXJpZGVzY2VuY2UobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IElNYXRlcmlhbCB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUk1hdGVyaWFsc1BiclNwZWN1bGFyR2xvc3NpbmVzcyB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvQXJjaGl2ZWQvS0hSX21hdGVyaWFsc19wYnJTcGVjdWxhckdsb3NzaW5lc3MvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX21hdGVyaWFsc19wYnJTcGVjdWxhckdsb3NzaW5lc3MgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGEgbnVtYmVyIHRoYXQgZGV0ZXJtaW5lcyB0aGUgb3JkZXIgdGhlIGV4dGVuc2lvbnMgYXJlIGFwcGxpZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcmRlciA9IDIwMDtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUtIUk1hdGVyaWFsc1BiclNwZWN1bGFyR2xvc3NpbmVzcz4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbEJhc2VQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRTcGVjdWxhckdsb3NzaW5lc3NQcm9wZXJ0aWVzQXN5bmMoZXh0ZW5zaW9uQ29udGV4dCwgbWF0ZXJpYWwsIGV4dGVuc2lvbiwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxBbHBoYVByb3BlcnRpZXMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFNwZWN1bGFyR2xvc3NpbmVzc1Byb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIHByb3BlcnRpZXM6IElLSFJNYXRlcmlhbHNQYnJTcGVjdWxhckdsb3NzaW5lc3MsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljID0gbnVsbDtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwucm91Z2huZXNzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuZGlmZnVzZUZhY3Rvcikge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuZGlmZnVzZUZhY3Rvcik7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbHBoYSA9IHByb3BlcnRpZXMuZGlmZnVzZUZhY3RvclszXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvQ29sb3IgPSBDb2xvcjMuV2hpdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5yZWZsZWN0aXZpdHlDb2xvciA9IHByb3BlcnRpZXMuc3BlY3VsYXJGYWN0b3IgPyBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuc3BlY3VsYXJGYWN0b3IpIDogQ29sb3IzLldoaXRlKCk7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLm1pY3JvU3VyZmFjZSA9IHByb3BlcnRpZXMuZ2xvc3NpbmVzc0ZhY3RvciA9PSB1bmRlZmluZWQgPyAxIDogcHJvcGVydGllcy5nbG9zc2luZXNzRmFjdG9yO1xyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5kaWZmdXNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2RpZmZ1c2VUZXh0dXJlYCwgcHJvcGVydGllcy5kaWZmdXNlVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKERpZmZ1c2UpYDtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuc3BlY3VsYXJHbG9zc2luZXNzVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L3NwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmVgLCBwcm9wZXJ0aWVzLnNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmUsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5uYW1lID0gYCR7YmFieWxvbk1hdGVyaWFsLm5hbWV9IChTcGVjdWxhciBHbG9zc2luZXNzKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnJlZmxlY3Rpdml0eVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5yZWZsZWN0aXZpdHlUZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudXNlTWljcm9TdXJmYWNlRnJvbVJlZmxlY3Rpdml0eU1hcEFscGhhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUk1hdGVyaWFsc1NoZWVuIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19zaGVlblwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19zaGVlbi9SRUFETUUubWQpXHJcbiAqIFtQbGF5Z3JvdW5kIFNhbXBsZV0oaHR0cHM6Ly93d3cuYmFieWxvbmpzLXBsYXlncm91bmQuY29tL2ZyYW1lLmh0bWwjQk5JWlg2IzQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX3NoZWVuIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxOTA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNTaGVlbj4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZFNoZWVuUHJvcGVydGllc0FzeW5jKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbiwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFNoZWVuUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJvcGVydGllczogSUtIUk1hdGVyaWFsc1NoZWVuLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5zaGVlbi5pc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5zaGVlbi5pbnRlbnNpdHkgPSAxO1xyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5zaGVlbkNvbG9yRmFjdG9yICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4uY29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuc2hlZW5Db2xvckZhY3Rvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnNoZWVuLmNvbG9yID0gQ29sb3IzLkJsYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5zaGVlbkNvbG9yVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L3NoZWVuQ29sb3JUZXh0dXJlYCwgcHJvcGVydGllcy5zaGVlbkNvbG9yVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKFNoZWVuIENvbG9yKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLnNoZWVuUm91Z2huZXNzRmFjdG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnJvdWdobmVzcyA9IHByb3BlcnRpZXMuc2hlZW5Sb3VnaG5lc3NGYWN0b3I7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnJvdWdobmVzcyA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5zaGVlblJvdWdobmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgKHByb3BlcnRpZXMuc2hlZW5Sb3VnaG5lc3NUZXh0dXJlIGFzIElUZXh0dXJlSW5mbykubm9uQ29sb3JEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2FkVGV4dHVyZUluZm9Bc3luYyhgJHtjb250ZXh0fS9zaGVlblJvdWdobmVzc1RleHR1cmVgLCBwcm9wZXJ0aWVzLnNoZWVuUm91Z2huZXNzVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKFNoZWVuIFJvdWdobmVzcylgO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5zaGVlbi50ZXh0dXJlUm91Z2huZXNzID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc2hlZW4uYWxiZWRvU2NhbGluZyA9IHRydWU7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLnNoZWVuLnVzZVJvdWdobmVzc0Zyb21NYWluVGV4dHVyZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfbWF0ZXJpYWxzX3NoZWVuKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgUEJSTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvUEJSL3Bick1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUk1hdGVyaWFsc1NwZWN1bGFyIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc19zcGVjdWxhclwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc19zcGVjdWxhci9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX3NwZWN1bGFyIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxOTA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNTcGVjdWxhcj4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZFNwZWN1bGFyUHJvcGVydGllc0FzeW5jKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbiwgYmFieWxvbk1hdGVyaWFsKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFNwZWN1bGFyUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJvcGVydGllczogSUtIUk1hdGVyaWFsc1NwZWN1bGFyLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLnNwZWN1bGFyRmFjdG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljRjBGYWN0b3IgPSBwcm9wZXJ0aWVzLnNwZWN1bGFyRmFjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuc3BlY3VsYXJDb2xvckZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpY1JlZmxlY3RhbmNlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuc3BlY3VsYXJDb2xvckZhY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5zcGVjdWxhclRleHR1cmUpIHtcclxuICAgICAgICAgICAgKHByb3BlcnRpZXMuc3BlY3VsYXJUZXh0dXJlIGFzIElUZXh0dXJlSW5mbykubm9uQ29sb3JEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2FkVGV4dHVyZUluZm9Bc3luYyhgJHtjb250ZXh0fS9zcGVjdWxhclRleHR1cmVgLCBwcm9wZXJ0aWVzLnNwZWN1bGFyVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKFNwZWN1bGFyIEYwIFN0cmVuZ3RoKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLm1ldGFsbGljUmVmbGVjdGFuY2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudXNlT25seU1ldGFsbGljRnJvbU1ldGFsbGljUmVmbGVjdGFuY2VUZXh0dXJlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJvcGVydGllcy5zcGVjdWxhckNvbG9yVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L3NwZWN1bGFyQ29sb3JUZXh0dXJlYCwgcHJvcGVydGllcy5zcGVjdWxhckNvbG9yVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKFNwZWN1bGFyIEYwIENvbG9yKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnJlZmxlY3RhbmNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc19zcGVjdWxhcihsb2FkZXIpKTtcclxuIiwiaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwsIElUZXh0dXJlSW5mbyB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUk1hdGVyaWFsc1RyYW5zbHVjZW5jeSB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tYXRlcmlhbHNfdHJhbnNsdWNlbmN5XCI7XHJcblxyXG4vKipcclxuICogW1Byb3Bvc2VkIFNwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9wdWxsLzE4MjUpXHJcbiAqICEhISBFeHBlcmltZW50YWwgRXh0ZW5zaW9uIFN1YmplY3QgdG8gQ2hhbmdlcyAhISFcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdHJhbnNsdWNlbmN5IGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxNzQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgbG9hZGVyLnBhcmVudC50cmFuc3BhcmVuY3lBc0NvdmVyYWdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUtIUk1hdGVyaWFsc1RyYW5zbHVjZW5jeT4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbEJhc2VQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRUcmFuc2x1Y2VudFByb3BlcnRpZXNBc3luYyhleHRlbnNpb25Db250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsLCBleHRlbnNpb24pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkVHJhbnNsdWNlbnRQcm9wZXJ0aWVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsLCBleHRlbnNpb246IElLSFJNYXRlcmlhbHNUcmFuc2x1Y2VuY3kpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGJyTWF0ZXJpYWwgPSBiYWJ5bG9uTWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWw7XHJcblxyXG4gICAgICAgIC8vIEVuYWJsZXMgXCJ0cmFuc2x1Y2VuY3lcIiB0ZXh0dXJlIHdoaWNoIHJlcHJlc2VudHMgZGlmZnVzZWx5LXRyYW5zbWl0dGVkIGxpZ2h0LlxyXG4gICAgICAgIHBick1hdGVyaWFsLnN1YlN1cmZhY2UuaXNUcmFuc2x1Y2VuY3lFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gU2luY2UgdGhpcyBleHRlbnNpb24gbW9kZWxzIHRoaW4tc3VyZmFjZSB0cmFuc21pc3Npb24gb25seSwgd2UgbXVzdCBtYWtlIHRoZVxyXG4gICAgICAgIC8vIGludGVybmFsIElPUiA9PSAxLjAgYW5kIHNldCB0aGUgdGhpY2tuZXNzIHRvIDAuXHJcbiAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS52b2x1bWVJbmRleE9mUmVmcmFjdGlvbiA9IDEuMDtcclxuICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLm1pbmltdW1UaGlja25lc3MgPSAwLjA7XHJcbiAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS5tYXhpbXVtVGhpY2tuZXNzID0gMC4wO1xyXG5cclxuICAgICAgICAvLyBBbGJlZG8gY29sb3VyIHdpbGwgdGludCB0cmFuc21pc3Npb24uXHJcbiAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS51c2VBbGJlZG9Ub1RpbnRUcmFuc2x1Y2VuY3kgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoZXh0ZW5zaW9uLnRyYW5zbHVjZW5jeUZhY3RvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBick1hdGVyaWFsLnN1YlN1cmZhY2UudHJhbnNsdWNlbmN5SW50ZW5zaXR5ID0gZXh0ZW5zaW9uLnRyYW5zbHVjZW5jeUZhY3RvcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnRyYW5zbHVjZW5jeUludGVuc2l0eSA9IDAuMDtcclxuICAgICAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS5pc1RyYW5zbHVjZW5jeUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbi50cmFuc2x1Y2VuY3lUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIChleHRlbnNpb24udHJhbnNsdWNlbmN5VGV4dHVyZSBhcyBJVGV4dHVyZUluZm8pLm5vbkNvbG9yRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vdHJhbnNsdWNlbmN5VGV4dHVyZWAsIGV4dGVuc2lvbi50cmFuc2x1Y2VuY3lUZXh0dXJlKS50aGVuKCh0ZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS50cmFuc2x1Y2VuY3lJbnRlbnNpdHlUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc190cmFuc2x1Y2VuY3kobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbHNUcmFuc21pc3Npb24gfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgUmVuZGVyVGFyZ2V0VGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9yZW5kZXJUYXJnZXRUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgT2JzZXJ2ZXIgfSBmcm9tIFwiY29yZS9NaXNjL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJjb3JlL01pc2Mvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tIFwiY29yZS9FbmdpbmVzL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBDb2xvcjQgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcblxyXG5pbnRlcmZhY2UgSVRyYW5zbWlzc2lvbkhlbHBlckhvbGRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBfdHJhbnNtaXNzaW9uSGVscGVyOiBUcmFuc21pc3Npb25IZWxwZXIgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJVHJhbnNtaXNzaW9uSGVscGVyT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzaXplIG9mIHRoZSByZW5kZXIgYnVmZmVycyAoZGVmYXVsdDogMTAyNClcclxuICAgICAqL1xyXG4gICAgcmVuZGVyU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG51bWJlciBvZiBzYW1wbGVzIHRvIHVzZSB3aGVuIGdlbmVyYXRpbmcgdGhlIHJlbmRlciB0YXJnZXQgdGV4dHVyZSBmb3Igb3BhcXVlIG1lc2hlcyAoZGVmYXVsdDogNClcclxuICAgICAqL1xyXG4gICAgc2FtcGxlczogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2NhbGUgdG8gYXBwbHkgd2hlbiBzZWxlY3RpbmcgdGhlIExPRCBsZXZlbCB0byBzYW1wbGUgdGhlIHJlZnJhY3Rpb24gdGV4dHVyZSAoZGVmYXVsdDogMSlcclxuICAgICAqL1xyXG4gICAgbG9kR2VuZXJhdGlvblNjYWxlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPZmZzZXQgdG8gYXBwbHkgd2hlbiBzZWxlY3RpbmcgdGhlIExPRCBsZXZlbCB0byBzYW1wbGUgdGhlIHJlZnJhY3Rpb24gdGV4dHVyZSAoZGVmYXVsdDogLTQpXHJcbiAgICAgKi9cclxuICAgIGxvZEdlbmVyYXRpb25PZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgdGhlIHJlZnJhY3Rpb24gcmVuZGVyIHRhcmdldCB0ZXh0dXJlIChkZWZhdWx0OiBURVhUVVJFVFlQRV9IQUxGX0ZMT0FUKVxyXG4gICAgICovXHJcbiAgICByZW5kZXJUYXJnZXRUZXh0dXJlVHlwZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbWlwbWFwcyBmb3IgdGhlIHJlZnJhY3Rpb24gcmVuZGVyIHRhcmdldCB0ZXh0dXJlIG11c3QgYmUgZ2VuZXJhdGVkIChkZWZhdWx0OiB0cnVlKVxyXG4gICAgICovXHJcbiAgICBnZW5lcmF0ZU1pcG1hcHM6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhciBjb2xvciBvZiB0aGUgb3BhcXVlIHRleHR1cmUuIElmIG5vdCBwcm92aWRlZCwgdXNlIHRoZSBzY2VuZSBjbGVhciBjb2xvciAod2hpY2ggd2lsbCBiZSBjb252ZXJ0ZWQgdG8gbGluZWFyIHNwYWNlKS5cclxuICAgICAqIElmIHByb3ZpZGVkLCBzaG91bGQgYmUgaW4gbGluZWFyIHNwYWNlXHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ29sb3I/OiBDb2xvcjQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIGNsYXNzIHRvIGhhbmRsZSBzZXR0aW5nIHVwIHRoZSByZW5kZXJpbmcgb2Ygb3BhcXVlIG9iamVjdHMgdG8gYmUgc2hvd24gdGhyb3VnaCB0cmFuc21pc3NpdmUgb2JqZWN0cy5cclxuICovXHJcbmNsYXNzIFRyYW5zbWlzc2lvbkhlbHBlciB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIGhlbHBlci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0dldERlZmF1bHRPcHRpb25zKCk6IElUcmFuc21pc3Npb25IZWxwZXJPcHRpb25zIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZW5kZXJTaXplOiAxMDI0LFxyXG4gICAgICAgICAgICBzYW1wbGVzOiA0LFxyXG4gICAgICAgICAgICBsb2RHZW5lcmF0aW9uU2NhbGU6IDEsXHJcbiAgICAgICAgICAgIGxvZEdlbmVyYXRpb25PZmZzZXQ6IC00LFxyXG4gICAgICAgICAgICByZW5kZXJUYXJnZXRUZXh0dXJlVHlwZTogQ29uc3RhbnRzLlRFWFRVUkVUWVBFX0hBTEZfRkxPQVQsXHJcbiAgICAgICAgICAgIGdlbmVyYXRlTWlwbWFwczogdHJ1ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmVzIHRoZSBjcmVhdGlvbiBvcHRpb25zLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zY2VuZTogU2NlbmUgJiBJVHJhbnNtaXNzaW9uSGVscGVySG9sZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX29wdGlvbnM6IElUcmFuc21pc3Npb25IZWxwZXJPcHRpb25zO1xyXG5cclxuICAgIHByaXZhdGUgX29wYXF1ZVJlbmRlclRhcmdldDogTnVsbGFibGU8UmVuZGVyVGFyZ2V0VGV4dHVyZT4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfb3BhcXVlTWVzaGVzQ2FjaGU6IEFic3RyYWN0TWVzaFtdID0gW107XHJcbiAgICBwcml2YXRlIF90cmFuc3BhcmVudE1lc2hlc0NhY2hlOiBBYnN0cmFjdE1lc2hbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfbWF0ZXJpYWxPYnNlcnZlcnM6IHsgW2lkOiBzdHJpbmddOiBOdWxsYWJsZTxPYnNlcnZlcjxBYnN0cmFjdE1lc2g+PiB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG9ic2VydmFibGUgd2lsbCBiZSBub3RpZmllZCB3aXRoIGFueSBlcnJvciBkdXJpbmcgdGhlIGNyZWF0aW9uIG9mIHRoZSBlbnZpcm9ubWVudCxcclxuICAgICAqIG1haW5seSB0ZXh0dXJlIGNyZWF0aW9uIGVycm9ycy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXJyb3JPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPHsgbWVzc2FnZT86IHN0cmluZzsgZXhjZXB0aW9uPzogYW55IH0+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIERlZmluZXMgdGhlIG9wdGlvbnMgd2Ugd2FudCB0byBjdXN0b21pemUgdGhlIGhlbHBlclxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBhZGQgdGhlIG1hdGVyaWFsIHRvXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFBhcnRpYWw8SVRyYW5zbWlzc2lvbkhlbHBlck9wdGlvbnM+LCBzY2VuZTogU2NlbmUpIHtcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAuLi5UcmFuc21pc3Npb25IZWxwZXIuX0dldERlZmF1bHRPcHRpb25zKCksXHJcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zY2VuZSA9IHNjZW5lIGFzIGFueTtcclxuICAgICAgICB0aGlzLl9zY2VuZS5fdHJhbnNtaXNzaW9uSGVscGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5vbkVycm9yT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5fc2NlbmUub25EaXNwb3NlT2JzZXJ2YWJsZS5hZGRPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhcnNlU2NlbmUoKTtcclxuICAgICAgICB0aGlzLl9zZXR1cFJlbmRlclRhcmdldHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGJhY2tncm91bmQgYWNjb3JkaW5nIHRvIHRoZSBuZXcgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogUGFydGlhbDxJVHJhbnNtaXNzaW9uSGVscGVyT3B0aW9ucz4pIHtcclxuICAgICAgICAvLyBGaXJzdCBjaGVjayBpZiBhbnkgb3B0aW9ucyBhcmUgYWN0dWFsbHkgYmVpbmcgY2hhbmdlZC4gSWYgbm90LCBleGl0LlxyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpLmZpbHRlcigoa2V5OiBzdHJpbmcpID0+ICh0aGlzLl9vcHRpb25zIGFzIGFueSlba2V5XSAhPT0gKG9wdGlvbnMgYXMgYW55KVtrZXldKTtcclxuICAgICAgICBpZiAoIW5ld1ZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV3T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5fb3B0aW9ucyxcclxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBvbGRPcHRpb25zID0gdGhpcy5fb3B0aW9ucztcclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gbmV3T3B0aW9ucztcclxuXHJcbiAgICAgICAgLy8gSWYgc2l6ZSBjaGFuZ2VzLCByZWNyZWF0ZSBldmVyeXRoaW5nXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnJlbmRlclNpemUgIT09IG9sZE9wdGlvbnMucmVuZGVyU2l6ZSB8fFxyXG4gICAgICAgICAgICBuZXdPcHRpb25zLnJlbmRlclRhcmdldFRleHR1cmVUeXBlICE9PSBvbGRPcHRpb25zLnJlbmRlclRhcmdldFRleHR1cmVUeXBlIHx8XHJcbiAgICAgICAgICAgIG5ld09wdGlvbnMuZ2VuZXJhdGVNaXBtYXBzICE9PSBvbGRPcHRpb25zLmdlbmVyYXRlTWlwbWFwcyB8fFxyXG4gICAgICAgICAgICAhdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwUmVuZGVyVGFyZ2V0cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldC5zYW1wbGVzID0gbmV3T3B0aW9ucy5zYW1wbGVzO1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQubG9kR2VuZXJhdGlvblNjYWxlID0gbmV3T3B0aW9ucy5sb2RHZW5lcmF0aW9uU2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldC5sb2RHZW5lcmF0aW9uT2Zmc2V0ID0gbmV3T3B0aW9ucy5sb2RHZW5lcmF0aW9uT2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG9wYXF1ZSByZW5kZXIgdGFyZ2V0IHRleHR1cmUgb3IgbnVsbCBpZiBub3QgYXZhaWxhYmxlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0T3BhcXVlVGFyZ2V0KCk6IE51bGxhYmxlPFRleHR1cmU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3VsZFJlbmRlckFzVHJhbnNtaXNzaW9uKG1hdGVyaWFsOiBOdWxsYWJsZTxNYXRlcmlhbD4pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwgJiYgbWF0ZXJpYWwuc3ViU3VyZmFjZS5pc1JlZnJhY3Rpb25FbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkTWVzaChtZXNoOiBBYnN0cmFjdE1lc2gpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbE9ic2VydmVyc1ttZXNoLnVuaXF1ZUlkXSA9IG1lc2gub25NYXRlcmlhbENoYW5nZWRPYnNlcnZhYmxlLmFkZCh0aGlzLl9vbk1lc2hNYXRlcmlhbENoYW5nZWQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gZGVmZXIgdGhlIHByb2Nlc3NpbmcgYmVjYXVzZSBfYWRkTWVzaCBtYXkgYmUgY2FsbGVkIGFzIHBhcnQgYXMgYW4gaW5zdGFuY2UgbWVzaCBjcmVhdGlvbiwgaW4gd2hpY2ggY2FzZSBzb21lXHJcbiAgICAgICAgLy8gaW50ZXJuYWwgcHJvcGVydGllcyBhcmUgbm90IHNldHVwIHlldCwgbGlrZSBfc291cmNlTWVzaCAobmVlZGVkIHdoZW4gZG9pbmcgbWVzaC5tYXRlcmlhbCBiZWxvdylcclxuICAgICAgICBUb29scy5TZXRJbW1lZGlhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2hvdWxkUmVuZGVyQXNUcmFuc21pc3Npb24obWVzaC5tYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgICAgIChtZXNoLm1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5yZWZyYWN0aW9uVGV4dHVyZSA9IHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cmFuc3BhcmVudE1lc2hlc0NhY2hlLmluZGV4T2YobWVzaCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbnRNZXNoZXNDYWNoZS5wdXNoKG1lc2gpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wYXF1ZU1lc2hlc0NhY2hlLmluZGV4T2YobWVzaCkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BhcXVlTWVzaGVzQ2FjaGUucHVzaChtZXNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3JlbW92ZU1lc2gobWVzaDogQWJzdHJhY3RNZXNoKTogdm9pZCB7XHJcbiAgICAgICAgbWVzaC5vbk1hdGVyaWFsQ2hhbmdlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX21hdGVyaWFsT2JzZXJ2ZXJzW21lc2gudW5pcXVlSWRdKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbWF0ZXJpYWxPYnNlcnZlcnNbbWVzaC51bmlxdWVJZF07XHJcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuX3RyYW5zcGFyZW50TWVzaGVzQ2FjaGUuaW5kZXhPZihtZXNoKTtcclxuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFuc3BhcmVudE1lc2hlc0NhY2hlLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZHggPSB0aGlzLl9vcGFxdWVNZXNoZXNDYWNoZS5pbmRleE9mKG1lc2gpO1xyXG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wYXF1ZU1lc2hlc0NhY2hlLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9wYXJzZVNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjZW5lLm1lc2hlcy5mb3JFYWNoKHRoaXMuX2FkZE1lc2guYmluZCh0aGlzKSk7XHJcbiAgICAgICAgLy8gTGlzdGVuIGZvciB3aGVuIGEgbWVzaCBpcyBhZGRlZCB0byB0aGUgc2NlbmUgYW5kIGFkZCBpdCB0byBvdXIgY2FjaGUgbGlzdHMuXHJcbiAgICAgICAgdGhpcy5fc2NlbmUub25OZXdNZXNoQWRkZWRPYnNlcnZhYmxlLmFkZCh0aGlzLl9hZGRNZXNoLmJpbmQodGhpcykpO1xyXG4gICAgICAgIC8vIExpc3RlbiBmb3Igd2hlbiBhIG1lc2ggaXMgcmVtb3ZlZCBmcm9tIHRvIHRoZSBzY2VuZSBhbmQgcmVtb3ZlIGl0IGZyb20gb3VyIGNhY2hlIGxpc3RzLlxyXG4gICAgICAgIHRoaXMuX3NjZW5lLm9uTWVzaFJlbW92ZWRPYnNlcnZhYmxlLmFkZCh0aGlzLl9yZW1vdmVNZXNoLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdoZW4gb25lIG9mIHRoZSBtZXNoZXMgaW4gdGhlIHNjZW5lIGhhcyBpdHMgbWF0ZXJpYWwgY2hhbmdlZCwgbWFrZSBzdXJlIHRoYXQgaXQncyBpbiB0aGUgY29ycmVjdCBjYWNoZSBsaXN0LlxyXG4gICAgcHJpdmF0ZSBfb25NZXNoTWF0ZXJpYWxDaGFuZ2VkKG1lc2g6IEFic3RyYWN0TWVzaCkge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zcGFyZW50SWR4ID0gdGhpcy5fdHJhbnNwYXJlbnRNZXNoZXNDYWNoZS5pbmRleE9mKG1lc2gpO1xyXG4gICAgICAgIGNvbnN0IG9wYXF1ZUlkeCA9IHRoaXMuX29wYXF1ZU1lc2hlc0NhY2hlLmluZGV4T2YobWVzaCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBtYXRlcmlhbCBpcyB0cmFuc3BhcmVudCwgbWFrZSBzdXJlIHRoYXQgaXQncyBhZGRlZCB0byB0aGUgdHJhbnNwYXJlbnQgbGlzdCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBvcGFxdWUgbGlzdFxyXG4gICAgICAgIGNvbnN0IHVzZVRyYW5zbWlzc2lvbiA9IHRoaXMuX3Nob3VsZFJlbmRlckFzVHJhbnNtaXNzaW9uKG1lc2gubWF0ZXJpYWwpO1xyXG4gICAgICAgIGlmICh1c2VUcmFuc21pc3Npb24pIHtcclxuICAgICAgICAgICAgaWYgKG1lc2gubWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5tYXRlcmlhbC5zdWJTdXJmYWNlLnJlZnJhY3Rpb25UZXh0dXJlID0gdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcGFxdWVJZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGFxdWVNZXNoZXNDYWNoZS5zcGxpY2Uob3BhcXVlSWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW50TWVzaGVzQ2FjaGUucHVzaChtZXNoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc3BhcmVudElkeCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcGFyZW50TWVzaGVzQ2FjaGUucHVzaChtZXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgbWF0ZXJpYWwgaXMgb3BhcXVlLCBtYWtlIHN1cmUgdGhhdCBpdCdzIGFkZGVkIHRvIHRoZSBvcGFxdWUgbGlzdCBhbmQgcmVtb3ZlZCBmcm9tIHRoZSB0cmFuc3BhcmVudCBsaXN0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50SWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNwYXJlbnRNZXNoZXNDYWNoZS5zcGxpY2UodHJhbnNwYXJlbnRJZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3BhcXVlTWVzaGVzQ2FjaGUucHVzaChtZXNoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGFxdWVJZHggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGFxdWVNZXNoZXNDYWNoZS5wdXNoKG1lc2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgb3BhcXVlIHJlbmRlciB0YXJnZXQgaGFzIG5vdCBiZWVuIGRpc3Bvc2VkIGFuZCBjYW4gc3RpbGwgYmUgdXNlZC5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfaXNSZW5kZXJUYXJnZXRWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0Py5nZXRJbnRlcm5hbFRleHR1cmUoKSAhPT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogU2V0dXAgdGhlIHJlbmRlciB0YXJnZXRzIGFjY29yZGluZyB0byB0aGUgc3BlY2lmaWVkIG9wdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfc2V0dXBSZW5kZXJUYXJnZXRzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0LmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0ID0gbmV3IFJlbmRlclRhcmdldFRleHR1cmUoXHJcbiAgICAgICAgICAgIFwib3BhcXVlU2NlbmVUZXh0dXJlXCIsXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMucmVuZGVyU2l6ZSxcclxuICAgICAgICAgICAgdGhpcy5fc2NlbmUsXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuZ2VuZXJhdGVNaXBtYXBzLFxyXG4gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMucmVuZGVyVGFyZ2V0VGV4dHVyZVR5cGVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldC5pZ25vcmVDYW1lcmFWaWV3cG9ydCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0LnJlbmRlckxpc3QgPSB0aGlzLl9vcGFxdWVNZXNoZXNDYWNoZTtcclxuICAgICAgICB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQuY2xlYXJDb2xvciA9IHRoaXMuX29wdGlvbnMuY2xlYXJDb2xvcj8uY2xvbmUoKSA/PyB0aGlzLl9zY2VuZS5jbGVhckNvbG9yLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0LmdhbW1hU3BhY2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQubG9kR2VuZXJhdGlvblNjYWxlID0gdGhpcy5fb3B0aW9ucy5sb2RHZW5lcmF0aW9uU2NhbGU7XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0LmxvZEdlbmVyYXRpb25PZmZzZXQgPSB0aGlzLl9vcHRpb25zLmxvZEdlbmVyYXRpb25PZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0LnNhbXBsZXMgPSB0aGlzLl9vcHRpb25zLnNhbXBsZXM7XHJcblxyXG4gICAgICAgIGxldCBzY2VuZUltYWdlUHJvY2Vzc2luZ2FwcGx5QnlQb3N0UHJvY2VzczogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgbGV0IHNhdmVTY2VuZUVudkludGVuc2l0eTogbnVtYmVyO1xyXG4gICAgICAgIHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldC5vbkJlZm9yZUJpbmRPYnNlcnZhYmxlLmFkZCgob3BhcXVlUmVuZGVyVGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHNhdmVTY2VuZUVudkludGVuc2l0eSA9IHRoaXMuX3NjZW5lLmVudmlyb25tZW50SW50ZW5zaXR5O1xyXG4gICAgICAgICAgICB0aGlzLl9zY2VuZS5lbnZpcm9ubWVudEludGVuc2l0eSA9IDEuMDtcclxuICAgICAgICAgICAgc2NlbmVJbWFnZVByb2Nlc3NpbmdhcHBseUJ5UG9zdFByb2Nlc3MgPSB0aGlzLl9zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmFwcGx5QnlQb3N0UHJvY2VzcztcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLmNsZWFyQ29sb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NjZW5lLmNsZWFyQ29sb3IudG9MaW5lYXJTcGFjZVRvUmVmKG9wYXF1ZVJlbmRlclRhcmdldC5jbGVhckNvbG9yLCB0aGlzLl9zY2VuZS5nZXRFbmdpbmUoKS51c2VFeGFjdFNyZ2JDb252ZXJzaW9ucyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcGFxdWVSZW5kZXJUYXJnZXQuY2xlYXJDb2xvci5jb3B5RnJvbSh0aGlzLl9vcHRpb25zLmNsZWFyQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHdlIGRvIG5vdCB1c2UgdGhlIGFwcGx5QnlQb3N0UHJvY2VzcyBzZXR0ZXIgdG8gYXZvaWQgZmxhZ2dpbmcgYWxsIHRoZSBtYXRlcmlhbHMgYXMgXCJpbWFnZSBwcm9jZXNzaW5nIGRpcnR5XCIhXHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uX2FwcGx5QnlQb3N0UHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlUmVuZGVyVGFyZ2V0Lm9uQWZ0ZXJVbmJpbmRPYnNlcnZhYmxlLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lLmVudmlyb25tZW50SW50ZW5zaXR5ID0gc2F2ZVNjZW5lRW52SW50ZW5zaXR5O1xyXG4gICAgICAgICAgICB0aGlzLl9zY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLl9hcHBseUJ5UG9zdFByb2Nlc3MgPSBzY2VuZUltYWdlUHJvY2Vzc2luZ2FwcGx5QnlQb3N0UHJvY2VzcztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdHJhbnNwYXJlbnRNZXNoZXNDYWNoZS5mb3JFYWNoKChtZXNoOiBBYnN0cmFjdE1lc2gpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFJlbmRlckFzVHJhbnNtaXNzaW9uKG1lc2gubWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAobWVzaC5tYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkucmVmcmFjdGlvblRleHR1cmUgPSB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgYWxsIHRoZSBlbGVtZW50cyBjcmVhdGVkIGJ5IHRoZSBIZWxwZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NjZW5lLl90cmFuc21pc3Npb25IZWxwZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX29wYXF1ZVJlbmRlclRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFxdWVSZW5kZXJUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90cmFuc3BhcmVudE1lc2hlc0NhY2hlID0gW107XHJcbiAgICAgICAgdGhpcy5fb3BhcXVlTWVzaGVzQ2FjaGUgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc190cmFuc21pc3Npb25cIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdHJhbnNtaXNzaW9uIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxNzU7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgbG9hZGVyLnBhcmVudC50cmFuc3BhcmVuY3lBc0NvdmVyYWdlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SUtIUk1hdGVyaWFsc1RyYW5zbWlzc2lvbj4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbEJhc2VQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRUcmFuc3BhcmVudFByb3BlcnRpZXNBc3luYyhleHRlbnNpb25Db250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsLCBleHRlbnNpb24pKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHt9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkVHJhbnNwYXJlbnRQcm9wZXJ0aWVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsLCBleHRlbnNpb246IElLSFJNYXRlcmlhbHNUcmFuc21pc3Npb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGJyTWF0ZXJpYWwgPSBiYWJ5bG9uTWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWw7XHJcblxyXG4gICAgICAgIC8vIEVuYWJsZXMgXCJyZWZyYWN0aW9uXCIgdGV4dHVyZSB3aGljaCByZXByZXNlbnRzIHRyYW5zbWl0dGVkIGxpZ2h0LlxyXG4gICAgICAgIHBick1hdGVyaWFsLnN1YlN1cmZhY2UuaXNSZWZyYWN0aW9uRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgZXh0ZW5zaW9uIG1vZGVscyB0aGluLXN1cmZhY2UgdHJhbnNtaXNzaW9uIG9ubHksIHdlIG11c3QgbWFrZSBJT1IgPSAxLjBcclxuICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnZvbHVtZUluZGV4T2ZSZWZyYWN0aW9uID0gMS4wO1xyXG5cclxuICAgICAgICAvLyBBbGJlZG8gY29sb3VyIHdpbGwgdGludCB0cmFuc21pc3Npb24uXHJcbiAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS51c2VBbGJlZG9Ub1RpbnRSZWZyYWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbi50cmFuc21pc3Npb25GYWN0b3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnJlZnJhY3Rpb25JbnRlbnNpdHkgPSBleHRlbnNpb24udHJhbnNtaXNzaW9uRmFjdG9yO1xyXG4gICAgICAgICAgICBjb25zdCBzY2VuZSA9IHBick1hdGVyaWFsLmdldFNjZW5lKCkgYXMgdW5rbm93biBhcyBJVHJhbnNtaXNzaW9uSGVscGVySG9sZGVyO1xyXG4gICAgICAgICAgICBpZiAocGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS5yZWZyYWN0aW9uSW50ZW5zaXR5ICYmICFzY2VuZS5fdHJhbnNtaXNzaW9uSGVscGVyKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgVHJhbnNtaXNzaW9uSGVscGVyKHt9LCBwYnJNYXRlcmlhbC5nZXRTY2VuZSgpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnJlZnJhY3Rpb25JbnRlbnNpdHkgJiYgIXNjZW5lLl90cmFuc21pc3Npb25IZWxwZXI/Ll9pc1JlbmRlclRhcmdldFZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZW5kZXIgdGFyZ2V0IGlzIG5vdCB2YWxpZCwgcmVjcmVhdGUgaXQuXHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fdHJhbnNtaXNzaW9uSGVscGVyPy5fc2V0dXBSZW5kZXJUYXJnZXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnJlZnJhY3Rpb25JbnRlbnNpdHkgPSAwLjA7XHJcbiAgICAgICAgICAgIHBick1hdGVyaWFsLnN1YlN1cmZhY2UuaXNSZWZyYWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLm1pbmltdW1UaGlja25lc3MgPSAwLjA7XHJcbiAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS5tYXhpbXVtVGhpY2tuZXNzID0gMC4wO1xyXG4gICAgICAgIGlmIChleHRlbnNpb24udHJhbnNtaXNzaW9uVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAoZXh0ZW5zaW9uLnRyYW5zbWlzc2lvblRleHR1cmUgYXMgSVRleHR1cmVJbmZvKS5ub25Db2xvckRhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L3RyYW5zbWlzc2lvblRleHR1cmVgLCBleHRlbnNpb24udHJhbnNtaXNzaW9uVGV4dHVyZSwgdW5kZWZpbmVkKS50aGVuKCh0ZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGJyTWF0ZXJpYWwuc3ViU3VyZmFjZS5yZWZyYWN0aW9uSW50ZW5zaXR5VGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICBwYnJNYXRlcmlhbC5zdWJTdXJmYWNlLnVzZUdsdGZTdHlsZVRleHR1cmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24obG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IElNYXRlcmlhbCB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX3VubGl0XCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfbWF0ZXJpYWxzX3VubGl0L1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdW5saXQgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGEgbnVtYmVyIHRoYXQgZGV0ZXJtaW5lcyB0aGUgb3JkZXIgdGhlIGV4dGVuc2lvbnMgYXJlIGFwcGxpZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcmRlciA9IDIxMDtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZFVubGl0UHJvcGVydGllc0FzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRVbmxpdFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudW5saXQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3M7XHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yKTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbHBoYSA9IHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yWzNdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFsYmVkb0NvbG9yID0gQ29sb3IzLldoaXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmJhc2VDb2xvclRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L2Jhc2VDb2xvclRleHR1cmVgLCBwcm9wZXJ0aWVzLmJhc2VDb2xvclRleHR1cmUsICh0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoQmFzZSBDb2xvcilgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRlcmlhbC5kb3VibGVTaWRlZCkge1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC50d29TaWRlZExpZ2h0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxBbHBoYVByb3BlcnRpZXMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IEtIUl9tYXRlcmlhbHNfdW5saXQobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciwgQXJyYXlJdGVtIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgTm9kZSB9IGZyb20gXCJjb3JlL25vZGVcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgSU5vZGUsIElNZXNoUHJpbWl0aXZlLCBJTWVzaCB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbFZhcmlhbnRzX01hcHBpbmcsIElLSFJNYXRlcmlhbFZhcmlhbnRzX1ZhcmlhbnQsIElLSFJNYXRlcmlhbFZhcmlhbnRzX1ZhcmlhbnRzIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX21hdGVyaWFsc192YXJpYW50c1wiO1xyXG5cclxuaW50ZXJmYWNlIElWYXJpYW50c01hcCB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBBcnJheTx7IG1lc2g6IEFic3RyYWN0TWVzaDsgbWF0ZXJpYWw6IE51bGxhYmxlPE1hdGVyaWFsPiB9PjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElFeHRlbnNpb25NZXRhZGF0YSB7XHJcbiAgICBsYXN0U2VsZWN0ZWQ6IE51bGxhYmxlPHN0cmluZyB8IEFycmF5PHN0cmluZz4+O1xyXG4gICAgb3JpZ2luYWw6IEFycmF5PHsgbWVzaDogQWJzdHJhY3RNZXNoOyBtYXRlcmlhbDogTnVsbGFibGU8TWF0ZXJpYWw+IH0+O1xyXG4gICAgdmFyaWFudHM6IElWYXJpYW50c01hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc192YXJpYW50cy9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBLSFJfbWF0ZXJpYWxzX3ZhcmlhbnRzIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICBwcml2YXRlIF92YXJpYW50cz86IEFycmF5PElLSFJNYXRlcmlhbFZhcmlhbnRzX1ZhcmlhbnQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBsaXN0IG9mIGF2YWlsYWJsZSB2YXJpYW50IG5hbWVzIGZvciB0aGlzIGFzc2V0LlxyXG4gICAgICogQHBhcmFtIHJvb3RNZXNoIFRoZSBnbFRGIHJvb3QgbWVzaFxyXG4gICAgICogQHJldHVybnMgdGhlIGxpc3Qgb2YgYWxsIHRoZSB2YXJpYW50IG5hbWVzIGZvciB0aGlzIG1vZGVsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QXZhaWxhYmxlVmFyaWFudHMocm9vdE1lc2g6IE1lc2gpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uTWV0YWRhdGEgPSB0aGlzLl9HZXRFeHRlbnNpb25NZXRhZGF0YShyb290TWVzaCk7XHJcbiAgICAgICAgaWYgKCFleHRlbnNpb25NZXRhZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZXh0ZW5zaW9uTWV0YWRhdGEudmFyaWFudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbGlzdCBvZiBhdmFpbGFibGUgdmFyaWFudCBuYW1lcyBmb3IgdGhpcyBhc3NldC5cclxuICAgICAqIEBwYXJhbSByb290TWVzaCBUaGUgZ2xURiByb290IG1lc2hcclxuICAgICAqIEByZXR1cm5zIHRoZSBsaXN0IG9mIGFsbCB0aGUgdmFyaWFudCBuYW1lcyBmb3IgdGhpcyBtb2RlbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXZhaWxhYmxlVmFyaWFudHMocm9vdE1lc2g6IE1lc2gpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIEtIUl9tYXRlcmlhbHNfdmFyaWFudHMuR2V0QXZhaWxhYmxlVmFyaWFudHMocm9vdE1lc2gpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEgdmFyaWFudCBnaXZlbiBhIHZhcmlhbnQgbmFtZSBvciBhIGxpc3Qgb2YgdmFyaWFudCBuYW1lcy5cclxuICAgICAqIEBwYXJhbSByb290TWVzaCBUaGUgZ2xURiByb290IG1lc2hcclxuICAgICAqIEBwYXJhbSB2YXJpYW50TmFtZSBUaGUgdmFyaWFudCBuYW1lKHMpIHRvIHNlbGVjdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZWxlY3RWYXJpYW50KHJvb3RNZXNoOiBNZXNoLCB2YXJpYW50TmFtZTogc3RyaW5nIHwgc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb25NZXRhZGF0YSA9IHRoaXMuX0dldEV4dGVuc2lvbk1ldGFkYXRhKHJvb3RNZXNoKTtcclxuICAgICAgICBpZiAoIWV4dGVuc2lvbk1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHNlbGVjdCB2YXJpYW50IG9uIGEgZ2xURiBtZXNoIHRoYXQgZG9lcyBub3QgaGF2ZSB0aGUgJHtOQU1FfSBleHRlbnNpb25gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdCA9ICh2YXJpYW50TmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVudHJpZXMgPSBleHRlbnNpb25NZXRhZGF0YS52YXJpYW50c1t2YXJpYW50TmFtZV07XHJcbiAgICAgICAgICAgIGlmIChlbnRyaWVzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5tZXNoLm1hdGVyaWFsID0gZW50cnkubWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodmFyaWFudE5hbWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdmFyaWFudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdCh2YXJpYW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHRlbnNpb25NZXRhZGF0YS5sYXN0U2VsZWN0ZWQgPSB2YXJpYW50TmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCBhIHZhcmlhbnQgZ2l2ZW4gYSB2YXJpYW50IG5hbWUgb3IgYSBsaXN0IG9mIHZhcmlhbnQgbmFtZXMuXHJcbiAgICAgKiBAcGFyYW0gcm9vdE1lc2ggVGhlIGdsVEYgcm9vdCBtZXNoXHJcbiAgICAgKiBAcGFyYW0gdmFyaWFudE5hbWUgVGhlIHZhcmlhbnQgbmFtZShzKSB0byBzZWxlY3QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RWYXJpYW50KHJvb3RNZXNoOiBNZXNoLCB2YXJpYW50TmFtZTogc3RyaW5nIHwgc3RyaW5nW10pOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gS0hSX21hdGVyaWFsc192YXJpYW50cy5TZWxlY3RWYXJpYW50KHJvb3RNZXNoLCB2YXJpYW50TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNldCBiYWNrIHRvIHRoZSBvcmlnaW5hbCBiZWZvcmUgc2VsZWN0aW5nIGEgdmFyaWFudC5cclxuICAgICAqIEBwYXJhbSByb290TWVzaCBUaGUgZ2xURiByb290IG1lc2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXNldChyb290TWVzaDogTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbk1ldGFkYXRhID0gdGhpcy5fR2V0RXh0ZW5zaW9uTWV0YWRhdGEocm9vdE1lc2gpO1xyXG4gICAgICAgIGlmICghZXh0ZW5zaW9uTWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVzZXQgb24gYSBnbFRGIG1lc2ggdGhhdCBkb2VzIG5vdCBoYXZlIHRoZSAke05BTUV9IGV4dGVuc2lvbmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBleHRlbnNpb25NZXRhZGF0YS5vcmlnaW5hbCkge1xyXG4gICAgICAgICAgICBlbnRyeS5tZXNoLm1hdGVyaWFsID0gZW50cnkubWF0ZXJpYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHRlbnNpb25NZXRhZGF0YS5sYXN0U2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzZXQgYmFjayB0byB0aGUgb3JpZ2luYWwgYmVmb3JlIHNlbGVjdGluZyBhIHZhcmlhbnQuXHJcbiAgICAgKiBAcGFyYW0gcm9vdE1lc2ggVGhlIGdsVEYgcm9vdCBtZXNoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXNldChyb290TWVzaDogTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiBLSFJfbWF0ZXJpYWxzX3ZhcmlhbnRzLlJlc2V0KHJvb3RNZXNoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxhc3Qgc2VsZWN0ZWQgdmFyaWFudCBuYW1lKHMpIG9yIG51bGwgaWYgb3JpZ2luYWwuXHJcbiAgICAgKiBAcGFyYW0gcm9vdE1lc2ggVGhlIGdsVEYgcm9vdCBtZXNoXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgc2VsZWN0ZWQgdmFyaWFudCBuYW1lKHMpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldExhc3RTZWxlY3RlZFZhcmlhbnQocm9vdE1lc2g6IE1lc2gpOiBOdWxsYWJsZTxzdHJpbmcgfCBzdHJpbmdbXT4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbk1ldGFkYXRhID0gdGhpcy5fR2V0RXh0ZW5zaW9uTWV0YWRhdGEocm9vdE1lc2gpO1xyXG4gICAgICAgIGlmICghZXh0ZW5zaW9uTWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZ2V0IHRoZSBsYXN0IHNlbGVjdGVkIHZhcmlhbnQgb24gYSBnbFRGIG1lc2ggdGhhdCBkb2VzIG5vdCBoYXZlIHRoZSAke05BTUV9IGV4dGVuc2lvbmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbk1ldGFkYXRhLmxhc3RTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxhc3Qgc2VsZWN0ZWQgdmFyaWFudCBuYW1lKHMpIG9yIG51bGwgaWYgb3JpZ2luYWwuXHJcbiAgICAgKiBAcGFyYW0gcm9vdE1lc2ggVGhlIGdsVEYgcm9vdCBtZXNoXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgc2VsZWN0ZWQgdmFyaWFudCBuYW1lKHMpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TGFzdFNlbGVjdGVkVmFyaWFudChyb290TWVzaDogTWVzaCk6IE51bGxhYmxlPHN0cmluZyB8IHN0cmluZ1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIEtIUl9tYXRlcmlhbHNfdmFyaWFudHMuR2V0TGFzdFNlbGVjdGVkVmFyaWFudChyb290TWVzaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0dldEV4dGVuc2lvbk1ldGFkYXRhKHJvb3RNZXNoOiBOdWxsYWJsZTxNZXNoPik6IE51bGxhYmxlPElFeHRlbnNpb25NZXRhZGF0YT4ge1xyXG4gICAgICAgIHJldHVybiByb290TWVzaD8uX2ludGVybmFsTWV0YWRhdGE/LmdsdGY/LltOQU1FXSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBvbkxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHRoaXMuX2xvYWRlci5nbHRmLmV4dGVuc2lvbnM7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbnMgJiYgZXh0ZW5zaW9uc1t0aGlzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbnNbdGhpcy5uYW1lXSBhcyBJS0hSTWF0ZXJpYWxWYXJpYW50c19WYXJpYW50cztcclxuICAgICAgICAgICAgdGhpcy5fdmFyaWFudHMgPSBleHRlbnNpb24udmFyaWFudHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZE1lc2hQcmltaXRpdmVBc3luYyhcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIG5vZGU6IElOb2RlLFxyXG4gICAgICAgIG1lc2g6IElNZXNoLFxyXG4gICAgICAgIHByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUsXHJcbiAgICAgICAgYXNzaWduOiAoYmFieWxvbk1lc2g6IEFic3RyYWN0TWVzaCkgPT4gdm9pZFxyXG4gICAgKTogTnVsbGFibGU8UHJvbWlzZTxBYnN0cmFjdE1lc2g+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbFZhcmlhbnRzX01hcHBpbmcsIEFic3RyYWN0TWVzaD4oY29udGV4dCwgcHJpbWl0aXZlLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLl9sb2FkTWVzaFByaW1pdGl2ZUFzeW5jKGNvbnRleHQsIG5hbWUsIG5vZGUsIG1lc2gsIHByaW1pdGl2ZSwgKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduKGJhYnlsb25NZXNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uRHJhd01vZGUgPSBHTFRGTG9hZGVyLl9HZXREcmF3TW9kZShjb250ZXh0LCBwcmltaXRpdmUubW9kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb290ID0gdGhpcy5fbG9hZGVyLnJvb3RCYWJ5bG9uTWVzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSByb290ID8gKHJvb3QuX2ludGVybmFsTWV0YWRhdGEgPSByb290Ll9pbnRlcm5hbE1ldGFkYXRhIHx8IHt9KSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnbHRmID0gKG1ldGFkYXRhLmdsdGYgPSBtZXRhZGF0YS5nbHRmIHx8IHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uTWV0YWRhdGE6IElFeHRlbnNpb25NZXRhZGF0YSA9IChnbHRmW05BTUVdID0gZ2x0ZltOQU1FXSB8fCB7IGxhc3RTZWxlY3RlZDogbnVsbCwgb3JpZ2luYWw6IFtdLCB2YXJpYW50czoge30gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgb3JpZ2luYWwgbWF0ZXJpYWwuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbk1ldGFkYXRhLm9yaWdpbmFsLnB1c2goeyBtZXNoOiBiYWJ5bG9uTWVzaCwgbWF0ZXJpYWw6IGJhYnlsb25NZXNoLm1hdGVyaWFsIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIGVhY2ggbWFwcGluZywgbG9vayBhdCB0aGUgdmFyaWFudHMgYW5kIG1ha2UgYSBuZXcgZW50cnkgZm9yIHRoZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG1hcHBpbmdJbmRleCA9IDA7IG1hcHBpbmdJbmRleCA8IGV4dGVuc2lvbi5tYXBwaW5ncy5sZW5ndGg7ICsrbWFwcGluZ0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXBwaW5nID0gZXh0ZW5zaW9uLm1hcHBpbmdzW21hcHBpbmdJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IEFycmF5SXRlbS5HZXQoYCR7ZXh0ZW5zaW9uQ29udGV4dH0vbWFwcGluZ3MvJHttYXBwaW5nSW5kZXh9L21hdGVyaWFsYCwgdGhpcy5fbG9hZGVyLmdsdGYubWF0ZXJpYWxzLCBtYXBwaW5nLm1hdGVyaWFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLl9sb2FkTWF0ZXJpYWxBc3luYyhgIy9tYXRlcmlhbHMvJHttYXBwaW5nLm1hdGVyaWFsfWAsIG1hdGVyaWFsLCBiYWJ5bG9uTWVzaCwgYmFieWxvbkRyYXdNb2RlLCAoYmFieWxvbk1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG1hcHBpbmdWYXJpYW50SW5kZXggPSAwOyBtYXBwaW5nVmFyaWFudEluZGV4IDwgbWFwcGluZy52YXJpYW50cy5sZW5ndGg7ICsrbWFwcGluZ1ZhcmlhbnRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFyaWFudEluZGV4ID0gbWFwcGluZy52YXJpYW50c1ttYXBwaW5nVmFyaWFudEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhcmlhbnQgPSBBcnJheUl0ZW0uR2V0KGAvZXh0ZW5zaW9ucy8ke05BTUV9L3ZhcmlhbnRzLyR7dmFyaWFudEluZGV4fWAsIHRoaXMuX3ZhcmlhbnRzLCB2YXJpYW50SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uTWV0YWRhdGEudmFyaWFudHNbdmFyaWFudC5uYW1lXSA9IGV4dGVuc2lvbk1ldGFkYXRhLnZhcmlhbnRzW3ZhcmlhbnQubmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25NZXRhZGF0YS52YXJpYW50c1t2YXJpYW50Lm5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2g6IGJhYnlsb25NZXNoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBiYWJ5bG9uTWF0ZXJpYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSB0YXJnZXQgd2hlbiBvcmlnaW5hbCBtZXNoIGlzIGNsb25lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2gub25DbG9uZWRPYnNlcnZhYmxlLmFkZCgobmV3T25lOiBOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TWVzaCA9IG5ld09uZSBhcyBNZXNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXRhZGF0YTogTnVsbGFibGU8SUV4dGVuc2lvbk1ldGFkYXRhPiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Jvb3Q6IE51bGxhYmxlPE5vZGU+ID0gbmV3TWVzaDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmluZCByb290IHRvIGdldCBtZWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb3QgPSBuZXdSb290IS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3Um9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhID0gS0hSX21hdGVyaWFsc192YXJpYW50cy5fR2V0RXh0ZW5zaW9uTWV0YWRhdGEobmV3Um9vdCBhcyBNZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChtZXRhZGF0YSA9PT0gbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY2xvbmUgdGhlIG1ldGFkYXRhIG9uIHRoZSByb290IChmaXJzdCB0aW1lIG9ubHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvb3QgJiYgbWV0YWRhdGEgPT09IEtIUl9tYXRlcmlhbHNfdmFyaWFudHMuX0dldEV4dGVuc2lvbk1ldGFkYXRhKHJvb3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvcHkgbWFpbiBtZXRhZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJvb3QuX2ludGVybmFsTWV0YWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Jvb3QuX2ludGVybmFsTWV0YWRhdGFba2V5XSA9IHJvb3QuX2ludGVybmFsTWV0YWRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29weSB0aGUgZ2x0ZiBtZXRhZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhLmdsdGYgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcm9vdC5faW50ZXJuYWxNZXRhZGF0YS5nbHRmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhLmdsdGZba2V5XSA9IHJvb3QuX2ludGVybmFsTWV0YWRhdGEuZ2x0ZltrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEdXBsaWNhdGUgdGhlIGV4dGVuc2lvbiBzcGVjaWZpYyBtZXRhZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhLmdsdGZbTkFNRV0gPSB7IGxhc3RTZWxlY3RlZDogbnVsbCwgb3JpZ2luYWw6IFtdLCB2YXJpYW50czoge30gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcmlnaW5hbCBvZiBtZXRhZGF0YS5vcmlnaW5hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vdC5faW50ZXJuYWxNZXRhZGF0YS5nbHRmW05BTUVdLm9yaWdpbmFsLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2g6IG9yaWdpbmFsLm1lc2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWw6IG9yaWdpbmFsLm1hdGVyaWFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbWV0YWRhdGEudmFyaWFudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWV0YWRhdGEudmFyaWFudHMsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhLmdsdGZbTkFNRV0udmFyaWFudHNba2V5XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdmFyaWFudEVudHJ5IG9mIG1ldGFkYXRhLnZhcmlhbnRzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Um9vdC5faW50ZXJuYWxNZXRhZGF0YS5nbHRmW05BTUVdLnZhcmlhbnRzW2tleV0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNoOiB2YXJpYW50RW50cnkubWVzaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsOiB2YXJpYW50RW50cnkubWF0ZXJpYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEgPSBuZXdSb290Ll9pbnRlcm5hbE1ldGFkYXRhLmdsdGZbTkFNRV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWxvY2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFyZ2V0IG9mIG1ldGFkYXRhIS5vcmlnaW5hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lm1lc2ggPT09IGJhYnlsb25NZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQubWVzaCA9IG5ld01lc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YXJnZXQgb2YgbWV0YWRhdGEhLnZhcmlhbnRzW3ZhcmlhbnQubmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5tZXNoID09PSBiYWJ5bG9uTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Lm1lc2ggPSBuZXdNZXNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoW2JhYnlsb25NZXNoXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25NZXNoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc192YXJpYW50cyhsb2FkZXIpKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgSU1hdGVyaWFsLCBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJNYXRlcmlhbHNWb2x1bWUgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfbWF0ZXJpYWxzX3ZvbHVtZVwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21hdGVyaWFsc192b2x1bWUvUkVBRE1FLm1kKVxyXG4gKiBAc2luY2UgNS4wLjBcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tYXRlcmlhbHNfdm9sdW1lIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxNzM7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byBkaXNhYmxlIGluc3RhbmNlIHVzYWdlIGJlY2F1c2UgdGhlIGF0dGVudWF0aW9uIGZhY3RvciBkZXBlbmRzIG9uIHRoZSBub2RlIHNjYWxlIG9mIGVhY2ggaW5kaXZpZHVhbCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5fZGlzYWJsZUluc3RhbmNlZE1lc2grKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIuX2Rpc2FibGVJbnN0YW5jZWRNZXNoLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJNYXRlcmlhbHNWb2x1bWU+KGNvbnRleHQsIG1hdGVyaWFsLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRlci5sb2FkTWF0ZXJpYWxCYXNlUHJvcGVydGllc0FzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9sb2FkZXIubG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9sb2FkVm9sdW1lUHJvcGVydGllc0FzeW5jKGV4dGVuc2lvbkNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwsIGV4dGVuc2lvbikpO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRWb2x1bWVQcm9wZXJ0aWVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsLCBleHRlbnNpb246IElLSFJNYXRlcmlhbHNWb2x1bWUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRyYW5zcGFyZW5jeSBpc24ndCBlbmFibGVkIGFscmVhZHksIHRoaXMgZXh0ZW5zaW9uIHNob3VsZG4ndCBkbyBhbnl0aGluZy5cclxuICAgICAgICAvLyBpLmUuIGl0IHJlcXVpcmVzIGVpdGhlciB0aGUgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24gb3IgS0hSX21hdGVyaWFsc190cmFuc2x1Y2VuY3kgZXh0ZW5zaW9ucy5cclxuICAgICAgICBpZiAoKCFiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS5pc1JlZnJhY3Rpb25FbmFibGVkICYmICFiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS5pc1RyYW5zbHVjZW5jeUVuYWJsZWQpIHx8ICFleHRlbnNpb24udGhpY2tuZXNzRmFjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElPUiBpbiB0aGlzIGV4dGVuc2lvbiBvbmx5IGFmZmVjdHMgaW50ZXJpb3IuXHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2Uudm9sdW1lSW5kZXhPZlJlZnJhY3Rpb24gPSBiYWJ5bG9uTWF0ZXJpYWwuaW5kZXhPZlJlZnJhY3Rpb247XHJcbiAgICAgICAgY29uc3QgYXR0ZW51YXRpb25EaXN0YW5jZSA9IGV4dGVuc2lvbi5hdHRlbnVhdGlvbkRpc3RhbmNlICE9PSB1bmRlZmluZWQgPyBleHRlbnNpb24uYXR0ZW51YXRpb25EaXN0YW5jZSA6IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UudGludENvbG9yQXREaXN0YW5jZSA9IGF0dGVudWF0aW9uRGlzdGFuY2U7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbi5hdHRlbnVhdGlvbkNvbG9yICE9PSB1bmRlZmluZWQgJiYgZXh0ZW5zaW9uLmF0dGVudWF0aW9uQ29sb3IubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UudGludENvbG9yLmNvcHlGcm9tRmxvYXRzKGV4dGVuc2lvbi5hdHRlbnVhdGlvbkNvbG9yWzBdLCBleHRlbnNpb24uYXR0ZW51YXRpb25Db2xvclsxXSwgZXh0ZW5zaW9uLmF0dGVudWF0aW9uQ29sb3JbMl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLnN1YlN1cmZhY2UubWluaW11bVRoaWNrbmVzcyA9IDAuMDtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS5tYXhpbXVtVGhpY2tuZXNzID0gZXh0ZW5zaW9uLnRoaWNrbmVzc0ZhY3RvcjtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS51c2VUaGlja25lc3NBc0RlcHRoID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZXh0ZW5zaW9uLnRoaWNrbmVzc1RleHR1cmUpIHtcclxuICAgICAgICAgICAgKGV4dGVuc2lvbi50aGlja25lc3NUZXh0dXJlIGFzIElUZXh0dXJlSW5mbykubm9uQ29sb3JEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5sb2FkVGV4dHVyZUluZm9Bc3luYyhgJHtjb250ZXh0fS90aGlja25lc3NUZXh0dXJlYCwgZXh0ZW5zaW9uLnRoaWNrbmVzc1RleHR1cmUpLnRoZW4oKHRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc3ViU3VyZmFjZS50aGlja25lc3NUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5zdWJTdXJmYWNlLnVzZUdsdGZTdHlsZVRleHR1cmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21hdGVyaWFsc192b2x1bWUobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIktIUl9tZXNoX3F1YW50aXphdGlvblwiO1xyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL0tocm9ub3MvS0hSX21lc2hfcXVhbnRpemF0aW9uL1JFQURNRS5tZClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIEtIUl9tZXNoX3F1YW50aXphdGlvbiBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSBsb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge31cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX21lc2hfcXVhbnRpemF0aW9uKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciwgQXJyYXlJdGVtIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJVGV4dHVyZSB9IGZyb20gXCIuLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJUZXh0dXJlQmFzaXNVIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX3RleHR1cmVfYmFzaXN1XCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfdGV4dHVyZV9iYXNpc3UvUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX3RleHR1cmVfYmFzaXN1IGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLiAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC4gKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gbG9hZGVyLmlzRXh0ZW5zaW9uVXNlZChOQU1FKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZFRleHR1cmVBc3luYyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmU6IElUZXh0dXJlLCBhc3NpZ246IChiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPEJhc2VUZXh0dXJlPj4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGTG9hZGVyLkxvYWRFeHRlbnNpb25Bc3luYzxJS0hSVGV4dHVyZUJhc2lzVSwgQmFzZVRleHR1cmU+KGNvbnRleHQsIHRleHR1cmUsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVyID0gdGV4dHVyZS5zYW1wbGVyID09IHVuZGVmaW5lZCA/IEdMVEZMb2FkZXIuRGVmYXVsdFNhbXBsZXIgOiBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L3NhbXBsZXJgLCB0aGlzLl9sb2FkZXIuZ2x0Zi5zYW1wbGVycywgdGV4dHVyZS5zYW1wbGVyKTtcclxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheUl0ZW0uR2V0KGAke2V4dGVuc2lvbkNvbnRleHR9L3NvdXJjZWAsIHRoaXMuX2xvYWRlci5nbHRmLmltYWdlcywgZXh0ZW5zaW9uLnNvdXJjZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuX2NyZWF0ZVRleHR1cmVBc3luYyhcclxuICAgICAgICAgICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAoYmFieWxvblRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhc3NpZ24oYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuX3RleHR1cmVJbmZvLm5vbkNvbG9yRGF0YSA/IHsgdXNlUkdCQUlmQVNUQ0JDN05vdEF2YWlsYWJsZVdoZW5VQVNUQzogdHJ1ZSB9IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgIXRleHR1cmUuX3RleHR1cmVJbmZvLm5vbkNvbG9yRGF0YVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfdGV4dHVyZV9iYXNpc3UobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJVGV4dHVyZUluZm8gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElLSFJUZXh0dXJlVHJhbnNmb3JtIH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiS0hSX3RleHR1cmVfdHJhbnNmb3JtXCI7XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi9ibG9iL21haW4vZXh0ZW5zaW9ucy8yLjAvS2hyb25vcy9LSFJfdGV4dHVyZV90cmFuc2Zvcm0vUkVBRE1FLm1kKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX3RleHR1cmVfdHJhbnNmb3JtIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5fbG9hZGVyLmlzRXh0ZW5zaW9uVXNlZChOQU1FKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkVGV4dHVyZUluZm9Bc3luYyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmVJbmZvOiBJVGV4dHVyZUluZm8sIGFzc2lnbjogKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCk6IE51bGxhYmxlPFByb21pc2U8QmFzZVRleHR1cmU+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElLSFJUZXh0dXJlVHJhbnNmb3JtLCBCYXNlVGV4dHVyZT4oY29udGV4dCwgdGV4dHVyZUluZm8sIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGNvbnRleHQsIHRleHR1cmVJbmZvLCAoYmFieWxvblRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKGJhYnlsb25UZXh0dXJlIGluc3RhbmNlb2YgVGV4dHVyZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZXh0ZW5zaW9uQ29udGV4dH06IFRleHR1cmUgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5vZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZS51T2Zmc2V0ID0gZXh0ZW5zaW9uLm9mZnNldFswXTtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZS52T2Zmc2V0ID0gZXh0ZW5zaW9uLm9mZnNldFsxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcm90YXRlIGFyb3VuZCB0aGUgb3JpZ2luLlxyXG4gICAgICAgICAgICAgICAgYmFieWxvblRleHR1cmUudVJvdGF0aW9uQ2VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25UZXh0dXJlLnZSb3RhdGlvbkNlbnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi5yb3RhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UZXh0dXJlLndBbmcgPSAtZXh0ZW5zaW9uLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24uc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZS51U2NhbGUgPSBleHRlbnNpb24uc2NhbGVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblRleHR1cmUudlNjYWxlID0gZXh0ZW5zaW9uLnNjYWxlWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24udGV4Q29vcmQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblRleHR1cmUuY29vcmRpbmF0ZXNJbmRleCA9IGV4dGVuc2lvbi50ZXhDb29yZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBhc3NpZ24oYmFieWxvblRleHR1cmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgS0hSX3RleHR1cmVfdHJhbnNmb3JtKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHsgR0xURkxvYWRlciB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUtIUlhtcEpzb25MZF9HbHRmLCBJS0hSWG1wSnNvbkxkX05vZGUgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJLSFJfeG1wX2pzb25fbGRcIjtcclxuXHJcbi8qKlxyXG4gKiBbU3BlY2lmaWNhdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL0tocm9ub3NHcm91cC9nbFRGL2Jsb2IvbWFpbi9leHRlbnNpb25zLzIuMC9LaHJvbm9zL0tIUl94bXBfanNvbl9sZC9SRUFETUUubWQpXHJcbiAqIEBzaW5jZSA1LjAuMFxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY2xhc3MgS0hSX3htcF9qc29uX2xkIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhIG51bWJlciB0aGF0IGRldGVybWluZXMgdGhlIG9yZGVyIHRoZSBleHRlbnNpb25zIGFyZSBhcHBsaWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3JkZXIgPSAxMDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRlcjogR0xURkxvYWRlcikge1xyXG4gICAgICAgIHRoaXMuX2xvYWRlciA9IGxvYWRlcjtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLl9sb2FkZXIuaXNFeHRlbnNpb25Vc2VkKE5BTUUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICAgICh0aGlzLl9sb2FkZXIgYXMgYW55KSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdGhlIGxvYWRlciBzdGF0ZSBjaGFuZ2VzIHRvIExPQURJTkcuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRlci5yb290QmFieWxvbk1lc2ggPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeG1wX2dsdGYgPSB0aGlzLl9sb2FkZXIuZ2x0Zi5leHRlbnNpb25zPy5LSFJfeG1wX2pzb25fbGQgYXMgSUtIUlhtcEpzb25MZF9HbHRmO1xyXG4gICAgICAgIGNvbnN0IHhtcF9ub2RlID0gdGhpcy5fbG9hZGVyLmdsdGYuYXNzZXQ/LmV4dGVuc2lvbnM/LktIUl94bXBfanNvbl9sZCBhcyBJS0hSWG1wSnNvbkxkX05vZGU7XHJcbiAgICAgICAgaWYgKHhtcF9nbHRmICYmIHhtcF9ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9ICt4bXBfbm9kZS5wYWNrZXQ7XHJcbiAgICAgICAgICAgIGlmICh4bXBfZ2x0Zi5wYWNrZXRzICYmIHBhY2tldCA8IHhtcF9nbHRmLnBhY2tldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIucm9vdEJhYnlsb25NZXNoLm1ldGFkYXRhID0gdGhpcy5fbG9hZGVyLnJvb3RCYWJ5bG9uTWVzaC5tZXRhZGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5yb290QmFieWxvbk1lc2gubWV0YWRhdGEueG1wID0geG1wX2dsdGYucGFja2V0c1twYWNrZXRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBLSFJfeG1wX2pzb25fbGQobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uR3JvdXAgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGlvbkdyb3VwXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25FdmVudFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgeyBTb3VuZCB9IGZyb20gXCJjb3JlL0F1ZGlvL3NvdW5kXCI7XHJcbmltcG9ydCB7IFdlaWdodGVkU291bmQgfSBmcm9tIFwiY29yZS9BdWRpby93ZWlnaHRlZHNvdW5kXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IElBcnJheUl0ZW0sIElTY2VuZSwgSU5vZGUsIElBbmltYXRpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIsIEFycmF5SXRlbSB9IGZyb20gXCIuLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSU1TRlRBdWRpb0VtaXR0ZXJfQ2xpcCwgSU1TRlRBdWRpb0VtaXR0ZXJfRW1pdHRlciwgSU1TRlRBdWRpb0VtaXR0ZXJfRW1pdHRlcnNSZWZlcmVuY2UsIElNU0ZUQXVkaW9FbWl0dGVyX0FuaW1hdGlvbkV2ZW50IH0gZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBJTVNGVEF1ZGlvRW1pdHRlcl9BbmltYXRpb25FdmVudEFjdGlvbiB9IGZyb20gXCJiYWJ5bG9uanMtZ2x0ZjJpbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IE5BTUUgPSBcIk1TRlRfYXVkaW9fZW1pdHRlclwiO1xyXG5cclxuaW50ZXJmYWNlIElMb2FkZXJDbGlwIGV4dGVuZHMgSU1TRlRBdWRpb0VtaXR0ZXJfQ2xpcCwgSUFycmF5SXRlbSB7XHJcbiAgICBfb2JqZWN0VVJMPzogUHJvbWlzZTxzdHJpbmc+O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUxvYWRlckVtaXR0ZXIgZXh0ZW5kcyBJTVNGVEF1ZGlvRW1pdHRlcl9FbWl0dGVyLCBJQXJyYXlJdGVtIHtcclxuICAgIF9iYWJ5bG9uRGF0YT86IHtcclxuICAgICAgICBzb3VuZD86IFdlaWdodGVkU291bmQ7XHJcbiAgICAgICAgbG9hZGVkOiBQcm9taXNlPHZvaWQ+O1xyXG4gICAgfTtcclxuICAgIF9iYWJ5bG9uU291bmRzOiBTb3VuZFtdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU1TRlRBdWRpb0VtaXR0ZXIge1xyXG4gICAgY2xpcHM6IElMb2FkZXJDbGlwW107XHJcbiAgICBlbWl0dGVyczogSUxvYWRlckVtaXR0ZXJbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElMb2FkZXJBbmltYXRpb25FdmVudCBleHRlbmRzIElNU0ZUQXVkaW9FbWl0dGVyX0FuaW1hdGlvbkV2ZW50LCBJQXJyYXlJdGVtIHt9XHJcblxyXG5pbnRlcmZhY2UgSUxvYWRlckFuaW1hdGlvbkV2ZW50cyB7XHJcbiAgICBldmVudHM6IElMb2FkZXJBbmltYXRpb25FdmVudFtdO1xyXG59XHJcblxyXG4vKipcclxuICogW1NwZWNpZmljYXRpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9uYWphZG9qby9nbFRGL2Jsb2IvTVNGVF9hdWRpb19lbWl0dGVyL2V4dGVuc2lvbnMvMi4wL1ZlbmRvci9NU0ZUX2F1ZGlvX2VtaXR0ZXIvUkVBRE1FLm1kKVxyXG4gKiAhISEgRXhwZXJpbWVudGFsIEV4dGVuc2lvbiBTdWJqZWN0IHRvIENoYW5nZXMgISEhXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBNU0ZUX2F1ZGlvX2VtaXR0ZXIgaW1wbGVtZW50cyBJR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoaXMgZXh0ZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IE5BTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhpcyBleHRlbnNpb24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG4gICAgcHJpdmF0ZSBfY2xpcHM6IEFycmF5PElMb2FkZXJDbGlwPjtcclxuICAgIHByaXZhdGUgX2VtaXR0ZXJzOiBBcnJheTxJTG9hZGVyRW1pdHRlcj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fY2xpcHMgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX2VtaXR0ZXJzIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBvbkxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IHRoaXMuX2xvYWRlci5nbHRmLmV4dGVuc2lvbnM7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvbnMgJiYgZXh0ZW5zaW9uc1t0aGlzLm5hbWVdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGV4dGVuc2lvbnNbdGhpcy5uYW1lXSBhcyBJTVNGVEF1ZGlvRW1pdHRlcjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NsaXBzID0gZXh0ZW5zaW9uLmNsaXBzO1xyXG4gICAgICAgICAgICB0aGlzLl9lbWl0dGVycyA9IGV4dGVuc2lvbi5lbWl0dGVycztcclxuXHJcbiAgICAgICAgICAgIEFycmF5SXRlbS5Bc3NpZ24odGhpcy5fY2xpcHMpO1xyXG4gICAgICAgICAgICBBcnJheUl0ZW0uQXNzaWduKHRoaXMuX2VtaXR0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRTY2VuZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgc2NlbmU6IElTY2VuZSk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0ZW5zaW9uQXN5bmM8SU1TRlRBdWRpb0VtaXR0ZXJfRW1pdHRlcnNSZWZlcmVuY2U+KGNvbnRleHQsIHNjZW5lLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9sb2FkZXIubG9hZFNjZW5lQXN5bmMoY29udGV4dCwgc2NlbmUpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW1pdHRlckluZGV4IG9mIGV4dGVuc2lvbi5lbWl0dGVycykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IEFycmF5SXRlbS5HZXQoYCR7ZXh0ZW5zaW9uQ29udGV4dH0vZW1pdHRlcnNgLCB0aGlzLl9lbWl0dGVycywgZW1pdHRlckluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLnJlZkRpc3RhbmNlICE9IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIubWF4RGlzdGFuY2UgIT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5yb2xsb2ZmRmFjdG9yICE9IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZGlzdGFuY2VNb2RlbCAhPSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmlubmVyQW5nbGUgIT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5vdXRlckFuZ2xlICE9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2V4dGVuc2lvbkNvbnRleHR9OiBEaXJlY3Rpb24gb3IgRGlzdGFuY2UgcHJvcGVydGllcyBhcmUgbm90IGFsbG93ZWQgb24gZW1pdHRlcnMgYXR0YWNoZWQgdG8gYSBzY2VuZWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZEVtaXR0ZXJBc3luYyhgJHtleHRlbnNpb25Db250ZXh0fS9lbWl0dGVycy8ke2VtaXR0ZXIuaW5kZXh9YCwgZW1pdHRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIGFzc2lnbjogKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPj4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGTG9hZGVyLkxvYWRFeHRlbnNpb25Bc3luYzxJTVNGVEF1ZGlvRW1pdHRlcl9FbWl0dGVyc1JlZmVyZW5jZSwgVHJhbnNmb3JtTm9kZT4oY29udGV4dCwgbm9kZSwgdGhpcy5uYW1lLCAoZXh0ZW5zaW9uQ29udGV4dCwgZXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXJcclxuICAgICAgICAgICAgICAgIC5sb2FkTm9kZUFzeW5jKGV4dGVuc2lvbkNvbnRleHQsIG5vZGUsIChiYWJ5bG9uTWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZW1pdHRlckluZGV4IG9mIGV4dGVuc2lvbi5lbWl0dGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gQXJyYXlJdGVtLkdldChgJHtleHRlbnNpb25Db250ZXh0fS9lbWl0dGVyc2AsIHRoaXMuX2VtaXR0ZXJzLCBlbWl0dGVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEVtaXR0ZXJBc3luYyhgJHtleHRlbnNpb25Db250ZXh0fS9lbWl0dGVycy8ke2VtaXR0ZXIuaW5kZXh9YCwgZW1pdHRlcikudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzb3VuZCBvZiBlbWl0dGVyLl9iYWJ5bG9uU291bmRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kLmF0dGFjaFRvTWVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbWl0dGVyLmlubmVyQW5nbGUgIT0gdW5kZWZpbmVkIHx8IGVtaXR0ZXIub3V0ZXJBbmdsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kLnNldExvY2FsRGlyZWN0aW9uVG9NZXNoKFZlY3RvcjMuRm9yd2FyZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kLnNldERpcmVjdGlvbmFsQ29uZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyICogVG9vbHMuVG9EZWdyZWVzKGVtaXR0ZXIuaW5uZXJBbmdsZSA9PSB1bmRlZmluZWQgPyBNYXRoLlBJIDogZW1pdHRlci5pbm5lckFuZ2xlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyICogVG9vbHMuVG9EZWdyZWVzKGVtaXR0ZXIub3V0ZXJBbmdsZSA9PSB1bmRlZmluZWQgPyBNYXRoLlBJIDogZW1pdHRlci5vdXRlckFuZ2xlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbihiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25NZXNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBbmltYXRpb25Bc3luYyhjb250ZXh0OiBzdHJpbmcsIGFuaW1hdGlvbjogSUFuaW1hdGlvbik6IE51bGxhYmxlPFByb21pc2U8QW5pbWF0aW9uR3JvdXA+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElMb2FkZXJBbmltYXRpb25FdmVudHMsIEFuaW1hdGlvbkdyb3VwPihjb250ZXh0LCBhbmltYXRpb24sIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRBbmltYXRpb25Bc3luYyhjb250ZXh0LCBhbmltYXRpb24pLnRoZW4oKGJhYnlsb25BbmltYXRpb25Hcm91cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICAgICAgICAgIEFycmF5SXRlbS5Bc3NpZ24oZXh0ZW5zaW9uLmV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV4dGVuc2lvbi5ldmVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWRBbmltYXRpb25FdmVudEFzeW5jKGAke2V4dGVuc2lvbkNvbnRleHR9L2V2ZW50cy8ke2V2ZW50LmluZGV4fWAsIGNvbnRleHQsIGFuaW1hdGlvbiwgZXZlbnQsIGJhYnlsb25BbmltYXRpb25Hcm91cCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25BbmltYXRpb25Hcm91cDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQ2xpcEFzeW5jKGNvbnRleHQ6IHN0cmluZywgY2xpcDogSUxvYWRlckNsaXApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGlmIChjbGlwLl9vYmplY3RVUkwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNsaXAuX29iamVjdFVSTDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPEFycmF5QnVmZmVyVmlldz47XHJcbiAgICAgICAgaWYgKGNsaXAudXJpKSB7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLl9sb2FkZXIubG9hZFVyaUFzeW5jKGNvbnRleHQsIGNsaXAsIGNsaXAudXJpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXJWaWV3ID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9idWZmZXJWaWV3YCwgdGhpcy5fbG9hZGVyLmdsdGYuYnVmZmVyVmlld3MsIGNsaXAuYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLl9sb2FkZXIubG9hZEJ1ZmZlclZpZXdBc3luYyhgL2J1ZmZlclZpZXdzLyR7YnVmZmVyVmlldy5pbmRleH1gLCBidWZmZXJWaWV3KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsaXAuX29iamVjdFVSTCA9IHByb21pc2UudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogY2xpcC5taW1lVHlwZSB9KSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjbGlwLl9vYmplY3RVUkw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEVtaXR0ZXJBc3luYyhjb250ZXh0OiBzdHJpbmcsIGVtaXR0ZXI6IElMb2FkZXJFbWl0dGVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZW1pdHRlci5fYmFieWxvblNvdW5kcyA9IGVtaXR0ZXIuX2JhYnlsb25Tb3VuZHMgfHwgW107XHJcbiAgICAgICAgaWYgKCFlbWl0dGVyLl9iYWJ5bG9uRGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBjbGlwUHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZW1pdHRlci5uYW1lIHx8IGBlbWl0dGVyJHtlbWl0dGVyLmluZGV4fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZvbHVtZTogZW1pdHRlci52b2x1bWUgPT0gdW5kZWZpbmVkID8gMSA6IGVtaXR0ZXIudm9sdW1lLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbWl0dGVyLmNsaXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGlwQ29udGV4dCA9IGAvZXh0ZW5zaW9ucy8ke3RoaXMubmFtZX0vY2xpcHNgO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xpcCA9IEFycmF5SXRlbS5HZXQoY2xpcENvbnRleHQsIHRoaXMuX2NsaXBzLCBlbWl0dGVyLmNsaXBzW2ldLmNsaXApO1xyXG4gICAgICAgICAgICAgICAgY2xpcFByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZENsaXBBc3luYyhgJHtjbGlwQ29udGV4dH0vJHtlbWl0dGVyLmNsaXBzW2ldLmNsaXB9YCwgY2xpcCkudGhlbigob2JqZWN0VVJMOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291bmQgPSAoZW1pdHRlci5fYmFieWxvblNvdW5kc1tpXSA9IG5ldyBTb3VuZChuYW1lLCBvYmplY3RVUkwsIHRoaXMuX2xvYWRlci5iYWJ5bG9uU2NlbmUsIG51bGwsIG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291bmQucmVmRGlzdGFuY2UgPSBlbWl0dGVyLnJlZkRpc3RhbmNlIHx8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kLm1heERpc3RhbmNlID0gZW1pdHRlci5tYXhEaXN0YW5jZSB8fCAyNTY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdW5kLnJvbGxvZmZGYWN0b3IgPSBlbWl0dGVyLnJvbGxvZmZGYWN0b3IgfHwgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291bmQuZGlzdGFuY2VNb2RlbCA9IGVtaXR0ZXIuZGlzdGFuY2VNb2RlbCB8fCBcImV4cG9uZW50aWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBQcm9taXNlLmFsbChjbGlwUHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2VpZ2h0cyA9IGVtaXR0ZXIuY2xpcHMubWFwKChjbGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsaXAud2VpZ2h0IHx8IDE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdlaWdodGVkU291bmQgPSBuZXcgV2VpZ2h0ZWRTb3VuZChlbWl0dGVyLmxvb3AgfHwgZmFsc2UsIGVtaXR0ZXIuX2JhYnlsb25Tb3VuZHMsIHdlaWdodHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVtaXR0ZXIuaW5uZXJBbmdsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlaWdodGVkU291bmQuZGlyZWN0aW9uYWxDb25lSW5uZXJBbmdsZSA9IDIgKiBUb29scy5Ub0RlZ3JlZXMoZW1pdHRlci5pbm5lckFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChlbWl0dGVyLm91dGVyQW5nbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHRlZFNvdW5kLmRpcmVjdGlvbmFsQ29uZU91dGVyQW5nbGUgPSAyICogVG9vbHMuVG9EZWdyZWVzKGVtaXR0ZXIub3V0ZXJBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZW1pdHRlci52b2x1bWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHRlZFNvdW5kLnZvbHVtZSA9IGVtaXR0ZXIudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5fYmFieWxvbkRhdGEhLnNvdW5kID0gd2VpZ2h0ZWRTb3VuZDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbWl0dGVyLl9iYWJ5bG9uRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZDogcHJvbWlzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbWl0dGVyLl9iYWJ5bG9uRGF0YS5sb2FkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RXZlbnRBY3Rpb24oXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIHNvdW5kOiBXZWlnaHRlZFNvdW5kLFxyXG4gICAgICAgIGFjdGlvbjogSU1TRlRBdWRpb0VtaXR0ZXJfQW5pbWF0aW9uRXZlbnRBY3Rpb24sXHJcbiAgICAgICAgdGltZTogbnVtYmVyLFxyXG4gICAgICAgIHN0YXJ0T2Zmc2V0PzogbnVtYmVyXHJcbiAgICApOiAoY3VycmVudEZyYW1lOiBudW1iZXIpID0+IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSU1TRlRBdWRpb0VtaXR0ZXJfQW5pbWF0aW9uRXZlbnRBY3Rpb24ucGxheToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjdXJyZW50RnJhbWU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lT2Zmc2V0ID0gKHN0YXJ0T2Zmc2V0IHx8IDApICsgKGN1cnJlbnRGcmFtZSAtIHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdW5kLnBsYXkoZnJhbWVPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIElNU0ZUQXVkaW9FbWl0dGVyX0FuaW1hdGlvbkV2ZW50QWN0aW9uLnN0b3A6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291bmQuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIElNU0ZUQXVkaW9FbWl0dGVyX0FuaW1hdGlvbkV2ZW50QWN0aW9uLnBhdXNlOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdW5kLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogVW5zdXBwb3J0ZWQgYWN0aW9uICR7YWN0aW9ufWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRBbmltYXRpb25FdmVudEFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBhbmltYXRpb25Db250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBJQW5pbWF0aW9uLFxyXG4gICAgICAgIGV2ZW50OiBJTG9hZGVyQW5pbWF0aW9uRXZlbnQsXHJcbiAgICAgICAgYmFieWxvbkFuaW1hdGlvbkdyb3VwOiBBbmltYXRpb25Hcm91cFxyXG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGJhYnlsb25BbmltYXRpb25Hcm91cC50YXJnZXRlZEFuaW1hdGlvbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBiYWJ5bG9uQW5pbWF0aW9uID0gYmFieWxvbkFuaW1hdGlvbkdyb3VwLnRhcmdldGVkQW5pbWF0aW9uc1swXTtcclxuICAgICAgICBjb25zdCBlbWl0dGVySW5kZXggPSBldmVudC5lbWl0dGVyO1xyXG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBBcnJheUl0ZW0uR2V0KGAvZXh0ZW5zaW9ucy8ke3RoaXMubmFtZX0vZW1pdHRlcnNgLCB0aGlzLl9lbWl0dGVycywgZW1pdHRlckluZGV4KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEVtaXR0ZXJBc3luYyhjb250ZXh0LCBlbWl0dGVyKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc291bmQgPSBlbWl0dGVyLl9iYWJ5bG9uRGF0YSEuc291bmQ7XHJcbiAgICAgICAgICAgIGlmIChzb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbkFuaW1hdGlvbkV2ZW50ID0gbmV3IEFuaW1hdGlvbkV2ZW50KGV2ZW50LnRpbWUsIHRoaXMuX2dldEV2ZW50QWN0aW9uKGNvbnRleHQsIHNvdW5kLCBldmVudC5hY3Rpb24sIGV2ZW50LnRpbWUsIGV2ZW50LnN0YXJ0T2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQW5pbWF0aW9uLmFuaW1hdGlvbi5hZGRFdmVudChiYWJ5bG9uQW5pbWF0aW9uRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIGFsbCBzdGFydGVkIGF1ZGlvIHN0b3BzIHdoZW4gdGhpcyBhbmltYXRpb24gaXMgdGVybWluYXRlZC5cclxuICAgICAgICAgICAgICAgIGJhYnlsb25BbmltYXRpb25Hcm91cC5vbkFuaW1hdGlvbkdyb3VwRW5kT2JzZXJ2YWJsZS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdW5kLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbkFuaW1hdGlvbkdyb3VwLm9uQW5pbWF0aW9uR3JvdXBQYXVzZU9ic2VydmFibGUuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VuZC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgTVNGVF9hdWRpb19lbWl0dGVyKGxvYWRlcikpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJjb3JlL01pc2Mvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBEZWZlcnJlZCB9IGZyb20gXCJjb3JlL01pc2MvZGVmZXJyZWRcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgSU5vZGUsIElNYXRlcmlhbCwgSUJ1ZmZlciwgSVNjZW5lIH0gZnJvbSBcIi4uL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB0eXBlIHsgSUdMVEZMb2FkZXJFeHRlbnNpb24gfSBmcm9tIFwiLi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5pbXBvcnQgeyBHTFRGTG9hZGVyLCBBcnJheUl0ZW0gfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElQcm9wZXJ0eSwgSU1TRlRMT0QgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBOQU1FID0gXCJNU0ZUX2xvZFwiO1xyXG5cclxuaW50ZXJmYWNlIElCdWZmZXJJbmZvIHtcclxuICAgIHN0YXJ0OiBudW1iZXI7XHJcbiAgICBlbmQ6IG51bWJlcjtcclxuICAgIGxvYWRlZDogRGVmZXJyZWQ8QXJyYXlCdWZmZXJWaWV3PjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFtTcGVjaWZpY2F0aW9uXShodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvYmxvYi9tYWluL2V4dGVuc2lvbnMvMi4wL1ZlbmRvci9NU0ZUX2xvZC9SRUFETUUubWQpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBNU0ZUX2xvZCBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBleHRlbnNpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGlzIGV4dGVuc2lvbiBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYSBudW1iZXIgdGhhdCBkZXRlcm1pbmVzIHRoZSBvcmRlciB0aGUgZXh0ZW5zaW9ucyBhcmUgYXBwbGllZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9yZGVyID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWF4aW11bSBudW1iZXIgb2YgTE9EcyB0byBsb2FkLCBzdGFydGluZyBmcm9tIHRoZSBsb3dlc3QgTE9ELlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWF4TE9Ec1RvTG9hZCA9IDEwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiBhbGwgbm9kZSBMT0RzIG9mIG9uZSBsZXZlbCBhcmUgbG9hZGVkLlxyXG4gICAgICogVGhlIGV2ZW50IGRhdGEgaXMgdGhlIGluZGV4IG9mIHRoZSBsb2FkZWQgTE9EIHN0YXJ0aW5nIGZyb20gemVyby5cclxuICAgICAqIERpc3Bvc2UgdGhlIGxvYWRlciB0byBjYW5jZWwgdGhlIGxvYWRpbmcgb2YgdGhlIG5leHQgbGV2ZWwgb2YgTE9Ecy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uTm9kZUxPRHNMb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8bnVtYmVyPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiBhbGwgbWF0ZXJpYWwgTE9EcyBvZiBvbmUgbGV2ZWwgYXJlIGxvYWRlZC5cclxuICAgICAqIFRoZSBldmVudCBkYXRhIGlzIHRoZSBpbmRleCBvZiB0aGUgbG9hZGVkIExPRCBzdGFydGluZyBmcm9tIHplcm8uXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBsb2FkZXIgdG8gY2FuY2VsIHRoZSBsb2FkaW5nIG9mIHRoZSBuZXh0IGxldmVsIG9mIExPRHMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbk1hdGVyaWFsTE9Ec0xvYWRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxudW1iZXI+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBHTFRGTG9hZGVyO1xyXG5cclxuICAgIHByaXZhdGUgX2J1ZmZlckxPRHMgPSBuZXcgQXJyYXk8SUJ1ZmZlckluZm8+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbm9kZUluZGV4TE9EOiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX25vZGVTaWduYWxMT0RzID0gbmV3IEFycmF5PERlZmVycmVkPHZvaWQ+PigpO1xyXG4gICAgcHJpdmF0ZSBfbm9kZVByb21pc2VMT0RzID0gbmV3IEFycmF5PEFycmF5PFByb21pc2U8YW55Pj4+KCk7XHJcbiAgICBwcml2YXRlIF9ub2RlQnVmZmVyTE9EcyA9IG5ldyBBcnJheTxJQnVmZmVySW5mbz4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9tYXRlcmlhbEluZGV4TE9EOiBOdWxsYWJsZTxudW1iZXI+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsU2lnbmFsTE9EcyA9IG5ldyBBcnJheTxEZWZlcnJlZDx2b2lkPj4oKTtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsUHJvbWlzZUxPRHMgPSBuZXcgQXJyYXk8QXJyYXk8UHJvbWlzZTxhbnk+Pj4oKTtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsQnVmZmVyTE9EcyA9IG5ldyBBcnJheTxJQnVmZmVySW5mbz4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5fbG9hZGVyLmlzRXh0ZW5zaW9uVXNlZChOQU1FKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9ub2RlSW5kZXhMT0QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX25vZGVTaWduYWxMT0RzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbm9kZVByb21pc2VMT0RzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbm9kZUJ1ZmZlckxPRHMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxJbmRleExPRCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxTaWduYWxMT0RzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxQcm9taXNlTE9Ecy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsQnVmZmVyTE9Ecy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm9uTWF0ZXJpYWxMT0RzTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25Ob2RlTE9Ec0xvYWRlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb25SZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleExPRCA9IDA7IGluZGV4TE9EIDwgdGhpcy5fbm9kZVByb21pc2VMT0RzLmxlbmd0aDsgaW5kZXhMT0QrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gUHJvbWlzZS5hbGwodGhpcy5fbm9kZVByb21pc2VMT0RzW2luZGV4TE9EXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhMT0QgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZXIuZW5kUGVyZm9ybWFuY2VDb3VudGVyKGBOb2RlIExPRCAke2luZGV4TE9EfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2coYExvYWRlZCBub2RlIExPRCAke2luZGV4TE9EfWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlTE9Ec0xvYWRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGluZGV4TE9EKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhMT0QgIT09IHRoaXMuX25vZGVQcm9taXNlTE9Ecy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLnN0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKGBOb2RlIExPRCAke2luZGV4TE9EICsgMX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkQnVmZmVyTE9EKHRoaXMuX25vZGVCdWZmZXJMT0RzLCBpbmRleExPRCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ub2RlU2lnbmFsTE9Ec1tpbmRleExPRF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZVNpZ25hbExPRHNbaW5kZXhMT0RdLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLl9jb21wbGV0ZVByb21pc2VzLnB1c2gocHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleExPRCA9IDA7IGluZGV4TE9EIDwgdGhpcy5fbWF0ZXJpYWxQcm9taXNlTE9Ecy5sZW5ndGg7IGluZGV4TE9EKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IFByb21pc2UuYWxsKHRoaXMuX21hdGVyaWFsUHJvbWlzZUxPRHNbaW5kZXhMT0RdKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5lbmRQZXJmb3JtYW5jZUNvdW50ZXIoYE1hdGVyaWFsIExPRCAke2luZGV4TE9EfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2coYExvYWRlZCBtYXRlcmlhbCBMT0QgJHtpbmRleExPRH1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxMT0RzTG9hZGVkT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnMoaW5kZXhMT0QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCAhPT0gdGhpcy5fbWF0ZXJpYWxQcm9taXNlTE9Ecy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVyLnN0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKGBNYXRlcmlhbCBMT0QgJHtpbmRleExPRCArIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEJ1ZmZlckxPRCh0aGlzLl9tYXRlcmlhbEJ1ZmZlckxPRHMsIGluZGV4TE9EICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hdGVyaWFsU2lnbmFsTE9Ec1tpbmRleExPRF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxTaWduYWxMT0RzW2luZGV4TE9EXS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5fY29tcGxldGVQcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFNjZW5lQXN5bmMoY29udGV4dDogc3RyaW5nLCBzY2VuZTogSVNjZW5lKTogTnVsbGFibGU8UHJvbWlzZTx2b2lkPj4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9sb2FkZXIubG9hZFNjZW5lQXN5bmMoY29udGV4dCwgc2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRCdWZmZXJMT0QodGhpcy5fYnVmZmVyTE9EcywgMCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWROb2RlQXN5bmMoY29udGV4dDogc3RyaW5nLCBub2RlOiBJTm9kZSwgYXNzaWduOiAoYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPFRyYW5zZm9ybU5vZGU+PiB7XHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElNU0ZUTE9ELCBUcmFuc2Zvcm1Ob2RlPihjb250ZXh0LCBub2RlLCB0aGlzLm5hbWUsIChleHRlbnNpb25Db250ZXh0LCBleHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgbGV0IGZpcnN0UHJvbWlzZTogUHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGVMT0RzID0gdGhpcy5fZ2V0TE9EcyhleHRlbnNpb25Db250ZXh0LCBub2RlLCB0aGlzLl9sb2FkZXIuZ2x0Zi5ub2RlcywgZXh0ZW5zaW9uLmlkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2dPcGVuKGAke2V4dGVuc2lvbkNvbnRleHR9YCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleExPRCA9IDA7IGluZGV4TE9EIDwgbm9kZUxPRHMubGVuZ3RoOyBpbmRleExPRCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlTE9EID0gbm9kZUxPRHNbaW5kZXhMT0RdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVJbmRleExPRCA9IGluZGV4TE9EO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vZGVTaWduYWxMT0RzW2luZGV4TE9EXSA9IHRoaXMuX25vZGVTaWduYWxMT0RzW2luZGV4TE9EXSB8fCBuZXcgRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhc3NpZ25XcmFwID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduKGJhYnlsb25UcmFuc2Zvcm1Ob2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZS5zZXRFbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2xvYWRlci5sb2FkTm9kZUFzeW5jKGAvbm9kZXMvJHtub2RlTE9ELmluZGV4fWAsIG5vZGVMT0QsIGFzc2lnbldyYXApLnRoZW4oKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4TE9EICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHNob3VsZCBub3QgcmVseSBvbiBfYmFieWxvblRyYW5zZm9ybU5vZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNOb2RlTE9EID0gbm9kZUxPRHNbaW5kZXhMT0QgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzTm9kZUxPRC5fYmFieWxvblRyYW5zZm9ybU5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VUcmFuc2Zvcm1Ob2RlKHByZXZpb3VzTm9kZUxPRC5fYmFieWxvblRyYW5zZm9ybU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHByZXZpb3VzTm9kZUxPRC5fYmFieWxvblRyYW5zZm9ybU5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoLnNldEVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25NZXNoO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZVByb21pc2VMT0RzW2luZGV4TE9EXSA9IHRoaXMuX25vZGVQcm9taXNlTE9Ec1tpbmRleExPRF0gfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4TE9EID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RQcm9taXNlID0gcHJvbWlzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZUluZGV4TE9EID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub2RlUHJvbWlzZUxPRHNbaW5kZXhMT0RdLnB1c2gocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2dDbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlyc3RQcm9taXNlITtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRNYXRlcmlhbEFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBtYXRlcmlhbDogSU1hdGVyaWFsLFxyXG4gICAgICAgIGJhYnlsb25NZXNoOiBOdWxsYWJsZTxNZXNoPixcclxuICAgICAgICBiYWJ5bG9uRHJhd01vZGU6IG51bWJlcixcclxuICAgICAgICBhc3NpZ246IChiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkXHJcbiAgICApOiBOdWxsYWJsZTxQcm9taXNlPE1hdGVyaWFsPj4ge1xyXG4gICAgICAgIC8vIERvbid0IGxvYWQgbWF0ZXJpYWwgTE9EcyBpZiBhbHJlYWR5IGxvYWRpbmcgYSBub2RlIExPRC5cclxuICAgICAgICBpZiAodGhpcy5fbm9kZUluZGV4TE9EKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuTG9hZEV4dGVuc2lvbkFzeW5jPElNU0ZUTE9ELCBNYXRlcmlhbD4oY29udGV4dCwgbWF0ZXJpYWwsIHRoaXMubmFtZSwgKGV4dGVuc2lvbkNvbnRleHQsIGV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmlyc3RQcm9taXNlOiBQcm9taXNlPE1hdGVyaWFsPjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsTE9EcyA9IHRoaXMuX2dldExPRHMoZXh0ZW5zaW9uQ29udGV4dCwgbWF0ZXJpYWwsIHRoaXMuX2xvYWRlci5nbHRmLm1hdGVyaWFscywgZXh0ZW5zaW9uLmlkcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2dPcGVuKGAke2V4dGVuc2lvbkNvbnRleHR9YCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleExPRCA9IDA7IGluZGV4TE9EIDwgbWF0ZXJpYWxMT0RzLmxlbmd0aDsgaW5kZXhMT0QrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxMT0QgPSBtYXRlcmlhbExPRHNbaW5kZXhMT0RdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsSW5kZXhMT0QgPSBpbmRleExPRDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fbG9hZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLl9sb2FkTWF0ZXJpYWxBc3luYyhgL21hdGVyaWFscy8ke21hdGVyaWFsTE9ELmluZGV4fWAsIG1hdGVyaWFsTE9ELCBiYWJ5bG9uTWVzaCwgYmFieWxvbkRyYXdNb2RlLCAoYmFieWxvbk1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduKGJhYnlsb25NYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChiYWJ5bG9uTWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4TE9EICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ24oYmFieWxvbk1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBzaG91bGQgbm90IHJlbHkgb24gX2RhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzRGF0YUxPRCA9IG1hdGVyaWFsTE9Ec1tpbmRleExPRCAtIDFdLl9kYXRhITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0RhdGFMT0RbYmFieWxvbkRyYXdNb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3Bvc2VNYXRlcmlhbHMoW3ByZXZpb3VzRGF0YUxPRFtiYWJ5bG9uRHJhd01vZGVdLmJhYnlsb25NYXRlcmlhbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmV2aW91c0RhdGFMT0RbYmFieWxvbkRyYXdNb2RlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25NYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbFByb21pc2VMT0RzW2luZGV4TE9EXSA9IHRoaXMuX21hdGVyaWFsUHJvbWlzZUxPRHNbaW5kZXhMT0RdIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleExPRCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0UHJvbWlzZSA9IHByb21pc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsSW5kZXhMT0QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsUHJvbWlzZUxPRHNbaW5kZXhMT0RdLnB1c2gocHJvbWlzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2dDbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmlyc3RQcm9taXNlITtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRVcmlBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByb3BlcnR5OiBJUHJvcGVydHksIHVyaTogc3RyaW5nKTogTnVsbGFibGU8UHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+PiB7XHJcbiAgICAgICAgLy8gRGVmZXIgdGhlIGxvYWRpbmcgb2YgdXJpcyBpZiBsb2FkaW5nIGEgbm9kZSBvciBtYXRlcmlhbCBMT0QuXHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGVJbmRleExPRCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIubG9nKGBkZWZlcnJlZGApO1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c0luZGV4TE9EID0gdGhpcy5fbm9kZUluZGV4TE9EIC0gMTtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZVNpZ25hbExPRHNbcHJldmlvdXNJbmRleExPRF0gPSB0aGlzLl9ub2RlU2lnbmFsTE9Ec1twcmV2aW91c0luZGV4TE9EXSB8fCBuZXcgRGVmZXJyZWQ8dm9pZD4oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVTaWduYWxMT0RzW3RoaXMuX25vZGVJbmRleExPRCAtIDFdLnByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRVcmlBc3luYyhjb250ZXh0LCBwcm9wZXJ0eSwgdXJpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXRlcmlhbEluZGV4TE9EICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2coYGRlZmVycmVkYCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzSW5kZXhMT0QgPSB0aGlzLl9tYXRlcmlhbEluZGV4TE9EIC0gMTtcclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxTaWduYWxMT0RzW3ByZXZpb3VzSW5kZXhMT0RdID0gdGhpcy5fbWF0ZXJpYWxTaWduYWxMT0RzW3ByZXZpb3VzSW5kZXhMT0RdIHx8IG5ldyBEZWZlcnJlZDx2b2lkPigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxTaWduYWxMT0RzW3ByZXZpb3VzSW5kZXhMT0RdLnByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRVcmlBc3luYyhjb250ZXh0LCBwcm9wZXJ0eSwgdXJpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEJ1ZmZlckFzeW5jKGNvbnRleHQ6IHN0cmluZywgYnVmZmVyOiBJQnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IE51bGxhYmxlPFByb21pc2U8QXJyYXlCdWZmZXJWaWV3Pj4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkZXIucGFyZW50LnVzZVJhbmdlUmVxdWVzdHMgJiYgIWJ1ZmZlci51cmkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2FkZXIuYmluKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06IFVyaSBpcyBtaXNzaW5nIG9yIHRoZSBiaW5hcnkgZ2xURiBpcyBtaXNzaW5nIGl0cyBiaW5hcnkgY2h1bmtgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbG9hZEFzeW5jID0gKGJ1ZmZlckxPRHM6IEFycmF5PElCdWZmZXJJbmZvPiwgaW5kZXhMT0Q6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBieXRlT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBieXRlTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmZXJMT0QgPSBidWZmZXJMT0RzW2luZGV4TE9EXTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmZXJMT0QpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJMT0Quc3RhcnQgPSBNYXRoLm1pbihidWZmZXJMT0Quc3RhcnQsIHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJMT0QuZW5kID0gTWF0aC5tYXgoYnVmZmVyTE9ELmVuZCwgZW5kKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyTE9EID0geyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBsb2FkZWQ6IG5ldyBEZWZlcnJlZCgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyTE9Ec1tpbmRleExPRF0gPSBidWZmZXJMT0Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlckxPRC5sb2FkZWQucHJvbWlzZS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQgKyBieXRlT2Zmc2V0IC0gYnVmZmVyTE9ELnN0YXJ0LCBieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmxvZyhgZGVmZXJyZWRgKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ub2RlSW5kZXhMT0QgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkQXN5bmModGhpcy5fbm9kZUJ1ZmZlckxPRHMsIHRoaXMuX25vZGVJbmRleExPRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbWF0ZXJpYWxJbmRleExPRCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRBc3luYyh0aGlzLl9tYXRlcmlhbEJ1ZmZlckxPRHMsIHRoaXMuX21hdGVyaWFsSW5kZXhMT0QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRBc3luYyh0aGlzLl9idWZmZXJMT0RzLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEJ1ZmZlckxPRChidWZmZXJMT0RzOiBBcnJheTxJQnVmZmVySW5mbz4sIGluZGV4TE9EOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBidWZmZXJMT0QgPSBidWZmZXJMT0RzW2luZGV4TE9EXTtcclxuICAgICAgICBpZiAoYnVmZmVyTE9EKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5sb2coYExvYWRpbmcgYnVmZmVyIHJhbmdlIFske2J1ZmZlckxPRC5zdGFydH0tJHtidWZmZXJMT0QuZW5kfV1gKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmJpbiEucmVhZEFzeW5jKGJ1ZmZlckxPRC5zdGFydCwgYnVmZmVyTE9ELmVuZCAtIGJ1ZmZlckxPRC5zdGFydCArIDEpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlckxPRC5sb2FkZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXJMT0QubG9hZGVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBhcnJheSBvZiBMT0QgcHJvcGVydGllcyBmcm9tIGxvd2VzdCB0byBoaWdoZXN0LlxyXG4gICAgICogQHBhcmFtIGNvbnRleHRcclxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gaWRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldExPRHM8VD4oY29udGV4dDogc3RyaW5nLCBwcm9wZXJ0eTogVCwgYXJyYXk6IEFycmF5TGlrZTxUPiB8IHVuZGVmaW5lZCwgaWRzOiBudW1iZXJbXSk6IFRbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF4TE9Ec1RvTG9hZCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1heExPRHNUb0xvYWQgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyb1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBuZXcgQXJyYXk8VD4oKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGlkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9pZHMvJHtpZHNbaV19YCwgYXJyYXksIGlkc1tpXSkpO1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy5sZW5ndGggPT09IHRoaXMubWF4TE9Ec1RvTG9hZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaChwcm9wZXJ0eSk7XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzcG9zZVRyYW5zZm9ybU5vZGUoYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uTWF0ZXJpYWxzID0gbmV3IEFycmF5PE1hdGVyaWFsPigpO1xyXG4gICAgICAgIGNvbnN0IGJhYnlsb25NYXRlcmlhbCA9IChiYWJ5bG9uVHJhbnNmb3JtTm9kZSBhcyBNZXNoKS5tYXRlcmlhbDtcclxuICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbHMucHVzaChiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25NZXNoIG9mIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLmdldENoaWxkTWVzaGVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25NZXNoLm1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWxzLnB1c2goYmFieWxvbk1lc2gubWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYWJ5bG9uVHJhbnNmb3JtTm9kZS5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhYnlsb25NYXRlcmlhbHNUb0Rpc3Bvc2UgPSBiYWJ5bG9uTWF0ZXJpYWxzLmZpbHRlcigoYmFieWxvbk1hdGVyaWFsKSA9PiB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLm1lc2hlcy5ldmVyeSgobWVzaCkgPT4gbWVzaC5tYXRlcmlhbCAhPSBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICB0aGlzLl9kaXNwb3NlTWF0ZXJpYWxzKGJhYnlsb25NYXRlcmlhbHNUb0Rpc3Bvc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rpc3Bvc2VNYXRlcmlhbHMoYmFieWxvbk1hdGVyaWFsczogTWF0ZXJpYWxbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJhYnlsb25UZXh0dXJlczogeyBbdW5pcXVlSWQ6IG51bWJlcl06IEJhc2VUZXh0dXJlIH0gPSB7fTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTWF0ZXJpYWwgb2YgYmFieWxvbk1hdGVyaWFscykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25UZXh0dXJlIG9mIGJhYnlsb25NYXRlcmlhbC5nZXRBY3RpdmVUZXh0dXJlcygpKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZXNbYmFieWxvblRleHR1cmUudW5pcXVlSWRdID0gYmFieWxvblRleHR1cmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHVuaXF1ZUlkIGluIGJhYnlsb25UZXh0dXJlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25NYXRlcmlhbCBvZiB0aGlzLl9sb2FkZXIuYmFieWxvblNjZW5lLm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhYnlsb25NYXRlcmlhbC5oYXNUZXh0dXJlKGJhYnlsb25UZXh0dXJlc1t1bmlxdWVJZF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGJhYnlsb25UZXh0dXJlc1t1bmlxdWVJZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgdW5pcXVlSWQgaW4gYmFieWxvblRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25UZXh0dXJlc1t1bmlxdWVJZF0uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihOQU1FLCAobG9hZGVyKSA9PiBuZXcgTVNGVF9sb2QobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiTVNGVF9taW5lY3JhZnRNZXNoXCI7XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNsYXNzIE1TRlRfbWluZWNyYWZ0TWVzaCBpbXBsZW1lbnRzIElHTFRGTG9hZGVyRXh0ZW5zaW9uIHtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gTkFNRTtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkZXI6IEdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOiBHTFRGTG9hZGVyKSB7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gbG9hZGVyO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMuX2xvYWRlci5pc0V4dGVuc2lvblVzZWQoTkFNRSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgKHRoaXMuX2xvYWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gR0xURkxvYWRlci5Mb2FkRXh0cmFBc3luYzxib29sZWFuPihjb250ZXh0LCBtYXRlcmlhbCwgdGhpcy5uYW1lLCAoZXh0cmFDb250ZXh0LCBleHRyYSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXh0cmEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKGJhYnlsb25NYXRlcmlhbCBpbnN0YW5jZW9mIFBCUk1hdGVyaWFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtleHRyYUNvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fbG9hZGVyLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1hdGVyaWFsLm5lZWRBbHBoYUJsZW5kaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuZm9yY2VEZXB0aFdyaXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuc2VwYXJhdGVDdWxsaW5nUGFzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGJhYnlsb25NYXRlcmlhbC5mb3JjZURlcHRoV3JpdGU7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudHdvU2lkZWRMaWdodGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGTG9hZGVyLlJlZ2lzdGVyRXh0ZW5zaW9uKE5BTUUsIChsb2FkZXIpID0+IG5ldyBNU0ZUX21pbmVjcmFmdE1lc2gobG9hZGVyKSk7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJTWF0ZXJpYWwgfSBmcm9tIFwiLi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuLi9nbFRGTG9hZGVyRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7IEdMVEZMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkxvYWRlclwiO1xyXG5cclxuY29uc3QgTkFNRSA9IFwiTVNGVF9zUkdCRmFjdG9yc1wiO1xyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjbGFzcyBNU0ZUX3NSR0JGYWN0b3JzIGltcGxlbWVudHMgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSBOQU1FO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6IEdMVEZMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9sb2FkZXIgPSBsb2FkZXI7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5fbG9hZGVyLmlzRXh0ZW5zaW9uVXNlZChOQU1FKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcclxuICAgICAgICAodGhpcy5fbG9hZGVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBsb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogTnVsbGFibGU8UHJvbWlzZTx2b2lkPj4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGTG9hZGVyLkxvYWRFeHRyYUFzeW5jPGJvb2xlYW4+KGNvbnRleHQsIG1hdGVyaWFsLCB0aGlzLm5hbWUsIChleHRyYUNvbnRleHQsIGV4dHJhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChleHRyYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2V4dHJhQ29udGV4dH06IE1hdGVyaWFsIHR5cGUgbm90IHN1cHBvcnRlZGApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9sb2FkZXIubG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZUV4YWN0U3JnYkNvbnZlcnNpb25zID0gYmFieWxvbk1hdGVyaWFsLmdldFNjZW5lKCkuZ2V0RW5naW5lKCkudXNlRXhhY3RTcmdiQ29udmVyc2lvbnM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25NYXRlcmlhbC5hbGJlZG9UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFsYmVkb0NvbG9yLnRvTGluZWFyU3BhY2VUb1JlZihiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvQ29sb3IsIHVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWJhYnlsb25NYXRlcmlhbC5yZWZsZWN0aXZpdHlUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnJlZmxlY3Rpdml0eUNvbG9yLnRvTGluZWFyU3BhY2VUb1JlZihiYWJ5bG9uTWF0ZXJpYWwucmVmbGVjdGl2aXR5Q29sb3IsIHVzZUV4YWN0U3JnYkNvbnZlcnNpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdMVEZMb2FkZXIuUmVnaXN0ZXJFeHRlbnNpb24oTkFNRSwgKGxvYWRlcikgPT4gbmV3IE1TRlRfc1JHQkZhY3RvcnMobG9hZGVyKSk7XHJcbiIsImV4cG9ydCAqIGZyb20gXCIuL0VYVF9saWdodHNfaW1hZ2VfYmFzZWRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRVhUX21lc2hfZ3B1X2luc3RhbmNpbmdcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRVhUX21lc2hvcHRfY29tcHJlc3Npb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vRVhUX3RleHR1cmVfd2VicFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfZHJhY29fbWVzaF9jb21wcmVzc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbGlnaHRzX3B1bmN0dWFsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfdW5saXRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19jbGVhcmNvYXRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19pcmlkZXNjZW5jZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX2FuaXNvdHJvcHlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3NoZWVuXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl9tYXRlcmlhbHNfc3BlY3VsYXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc19pb3JcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX21hdGVyaWFsc192YXJpYW50c1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3RyYW5zbHVjZW5jeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWF0ZXJpYWxzX3ZvbHVtZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfbWVzaF9xdWFudGl6YXRpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX3RleHR1cmVfYmFzaXN1XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0tIUl90ZXh0dXJlX3RyYW5zZm9ybVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9LSFJfeG1wX2pzb25fbGRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vS0hSX2FuaW1hdGlvbl9wb2ludGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL01TRlRfYXVkaW9fZW1pdHRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9NU0ZUX2xvZFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9NU0ZUX21pbmVjcmFmdE1lc2hcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vTVNGVF9zUkdCRmFjdG9yc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9FeHRyYXNBc01ldGFkYXRhXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgSW5kaWNlc0FycmF5LCBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IERlZmVycmVkIH0gZnJvbSBcImNvcmUvTWlzYy9kZWZlcnJlZFwiO1xyXG5pbXBvcnQgeyBRdWF0ZXJuaW9uLCBWZWN0b3IzLCBNYXRyaXgsIFRtcFZlY3RvcnMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgeyBDYW1lcmEgfSBmcm9tIFwiY29yZS9DYW1lcmFzL2NhbWVyYVwiO1xyXG5pbXBvcnQgeyBGcmVlQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9mcmVlQ2FtZXJhXCI7XHJcbmltcG9ydCB0eXBlIHsgQW5pbWF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBJQW5pbWF0YWJsZSB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0YWJsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHR5cGUgeyBJQW5pbWF0aW9uS2V5IH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25LZXlcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uS2V5SW50ZXJwb2xhdGlvbiB9IGZyb20gXCJjb3JlL0FuaW1hdGlvbnMvYW5pbWF0aW9uS2V5XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkdyb3VwIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25Hcm91cFwiO1xyXG5pbXBvcnQgeyBCb25lIH0gZnJvbSBcImNvcmUvQm9uZXMvYm9uZVwiO1xyXG5pbXBvcnQgeyBTa2VsZXRvbiB9IGZyb20gXCJjb3JlL0JvbmVzL3NrZWxldG9uXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEJhc2VUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL2Jhc2VUZXh0dXJlXCI7XHJcbmltcG9ydCB0eXBlIHsgSVRleHR1cmVDcmVhdGlvbk9wdGlvbnMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgVHJhbnNmb3JtTm9kZSB9IGZyb20gXCJjb3JlL01lc2hlcy90cmFuc2Zvcm1Ob2RlXCI7XHJcbmltcG9ydCB7IEJ1ZmZlciwgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHsgR2VvbWV0cnkgfSBmcm9tIFwiY29yZS9NZXNoZXMvZ2VvbWV0cnlcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgSW5zdGFuY2VkTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9pbnN0YW5jZWRNZXNoXCI7XHJcbmltcG9ydCB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBNb3JwaFRhcmdldCB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0XCI7XHJcbmltcG9ydCB7IE1vcnBoVGFyZ2V0TWFuYWdlciB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0TWFuYWdlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlckFzeW5jUmVzdWx0LCBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50IH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBJUHJvcGVydHkgfSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aCxcclxuICAgIEFuaW1hdGlvblNhbXBsZXJJbnRlcnBvbGF0aW9uLFxyXG4gICAgQWNjZXNzb3JUeXBlLFxyXG4gICAgQ2FtZXJhVHlwZSxcclxuICAgIEFjY2Vzc29yQ29tcG9uZW50VHlwZSxcclxuICAgIE1hdGVyaWFsQWxwaGFNb2RlLFxyXG4gICAgVGV4dHVyZU1pbkZpbHRlcixcclxuICAgIFRleHR1cmVXcmFwTW9kZSxcclxuICAgIFRleHR1cmVNYWdGaWx0ZXIsXHJcbiAgICBNZXNoUHJpbWl0aXZlTW9kZSxcclxufSBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICAgIElHTFRGLFxyXG4gICAgSVNhbXBsZXIsXHJcbiAgICBJTm9kZSxcclxuICAgIElTY2VuZSxcclxuICAgIElNZXNoLFxyXG4gICAgSUFjY2Vzc29yLFxyXG4gICAgSVNraW4sXHJcbiAgICBJQ2FtZXJhLFxyXG4gICAgSUFuaW1hdGlvbixcclxuICAgIElCdWZmZXIsXHJcbiAgICBJQnVmZmVyVmlldyxcclxuICAgIElNYXRlcmlhbFBick1ldGFsbGljUm91Z2huZXNzLFxyXG4gICAgSU1hdGVyaWFsLFxyXG4gICAgSVRleHR1cmVJbmZvLFxyXG4gICAgSVRleHR1cmUsXHJcbiAgICBJSW1hZ2UsXHJcbiAgICBJTWVzaFByaW1pdGl2ZSxcclxuICAgIElBcnJheUl0ZW0sXHJcbiAgICBfSVNhbXBsZXJEYXRhLFxyXG4gICAgSUFuaW1hdGlvbkNoYW5uZWwsXHJcbiAgICBJQW5pbWF0aW9uU2FtcGxlcixcclxuICAgIF9JQW5pbWF0aW9uU2FtcGxlckRhdGEsXHJcbn0gZnJvbSBcIi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckV4dGVuc2lvbiB9IGZyb20gXCIuL2dsVEZMb2FkZXJFeHRlbnNpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlciwgSUdMVEZMb2FkZXJEYXRhIH0gZnJvbSBcIi4uL2dsVEZGaWxlTG9hZGVyXCI7XHJcbmltcG9ydCB7IEdMVEZGaWxlTG9hZGVyLCBHTFRGTG9hZGVyU3RhdGUsIEdMVEZMb2FkZXJDb29yZGluYXRlU3lzdGVtTW9kZSwgR0xURkxvYWRlckFuaW1hdGlvblN0YXJ0TW9kZSB9IGZyb20gXCIuLi9nbFRGRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IElEYXRhQnVmZmVyIH0gZnJvbSBcImNvcmUvTWlzYy9kYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IERlY29kZUJhc2U2NFVybFRvQmluYXJ5LCBJc0Jhc2U2NERhdGFVcmwsIExvYWRGaWxlRXJyb3IgfSBmcm9tIFwiY29yZS9NaXNjL2ZpbGVUb29sc1wiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiY29yZS9NaXNjL2xvZ2dlclwiO1xyXG5pbXBvcnQgdHlwZSB7IExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL2xpZ2h0XCI7XHJcbmltcG9ydCB7IEJvdW5kaW5nSW5mbyB9IGZyb20gXCJjb3JlL0N1bGxpbmcvYm91bmRpbmdJbmZvXCI7XHJcbmltcG9ydCB0eXBlIHsgQXNzZXRDb250YWluZXIgfSBmcm9tIFwiY29yZS9hc3NldENvbnRhaW5lclwiO1xyXG5pbXBvcnQgdHlwZSB7IEFuaW1hdGlvblByb3BlcnR5SW5mbyB9IGZyb20gXCIuL2dsVEZMb2FkZXJBbmltYXRpb25cIjtcclxuaW1wb3J0IHsgbm9kZUFuaW1hdGlvbkRhdGEgfSBmcm9tIFwiLi9nbFRGTG9hZGVyQW5pbWF0aW9uXCI7XHJcblxyXG5pbnRlcmZhY2UgVHlwZWRBcnJheUxpa2UgZXh0ZW5kcyBBcnJheUJ1ZmZlclZpZXcge1xyXG4gICAgcmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBbbjogbnVtYmVyXTogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVHlwZWRBcnJheUNvbnN0cnVjdG9yIHtcclxuICAgIG5ldyAobGVuZ3RoOiBudW1iZXIpOiBUeXBlZEFycmF5TGlrZTtcclxuICAgIG5ldyAoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIGJ5dGVPZmZzZXQ6IG51bWJlciwgbGVuZ3RoPzogbnVtYmVyKTogVHlwZWRBcnJheUxpa2U7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJTG9hZGVyUHJvcGVydHkgZXh0ZW5kcyBJUHJvcGVydHkge1xyXG4gICAgX2FjdGl2ZUxvYWRlckV4dGVuc2lvbkZ1bmN0aW9uczoge1xyXG4gICAgICAgIFtpZDogc3RyaW5nXTogYm9vbGVhbjtcclxuICAgIH07XHJcbn1cclxuXHJcbmludGVyZmFjZSBJUmVnaXN0ZXJlZEV4dGVuc2lvbiB7XHJcbiAgICBmYWN0b3J5OiAobG9hZGVyOiBHTFRGTG9hZGVyKSA9PiBJR0xURkxvYWRlckV4dGVuc2lvbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElXaXRoTWV0YWRhdGEge1xyXG4gICAgbWV0YWRhdGE6IGFueTtcclxuICAgIF9pbnRlcm5hbE1ldGFkYXRhOiBhbnk7XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODIxODIwOVxyXG5mdW5jdGlvbiBtZXJnZURlZXAoLi4ub2JqZWN0czogYW55W10pOiBhbnkge1xyXG4gICAgY29uc3QgaXNPYmplY3QgPSAob2JqOiBhbnkpID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xyXG5cclxuICAgIHJldHVybiBvYmplY3RzLnJlZHVjZSgocHJldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcFZhbCA9IHByZXZba2V5XTtcclxuICAgICAgICAgICAgY29uc3Qgb1ZhbCA9IG9ialtrZXldO1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocFZhbCkgJiYgQXJyYXkuaXNBcnJheShvVmFsKSkge1xyXG4gICAgICAgICAgICAgICAgcHJldltrZXldID0gcFZhbC5jb25jYXQoLi4ub1ZhbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocFZhbCkgJiYgaXNPYmplY3Qob1ZhbCkpIHtcclxuICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG1lcmdlRGVlcChwVmFsLCBvVmFsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZXZba2V5XSA9IG9WYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBhcnJheXMgd2hlbiBsb2FkaW5nIHRoZSBnbFRGIGFzc2V0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXJyYXlJdGVtIHtcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBpdGVtIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGFycmF5IFRoZSBhcnJheSB0byBnZXQgdGhlIGl0ZW0gZnJvbVxyXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byB0aGUgYXJyYXlcclxuICAgICAqIEByZXR1cm5zIFRoZSBhcnJheSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0PFQ+KGNvbnRleHQ6IHN0cmluZywgYXJyYXk6IEFycmF5TGlrZTxUPiB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCk6IFQge1xyXG4gICAgICAgIGlmICghYXJyYXkgfHwgaW5kZXggPT0gdW5kZWZpbmVkIHx8ICFhcnJheVtpbmRleF0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBGYWlsZWQgdG8gZmluZCBpbmRleCAoJHtpbmRleH0pYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXlbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBpdGVtIGZyb20gdGhlIGdpdmVuIGFycmF5IG9yIHJldHVybnMgbnVsbCBpZiBub3QgYXZhaWxhYmxlLlxyXG4gICAgICogQHBhcmFtIGFycmF5IFRoZSBhcnJheSB0byBnZXQgdGhlIGl0ZW0gZnJvbVxyXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCB0byB0aGUgYXJyYXlcclxuICAgICAqIEByZXR1cm5zIFRoZSBhcnJheSBpdGVtIG9yIG51bGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBUcnlHZXQ8VD4oYXJyYXk6IEFycmF5TGlrZTxUPiB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCk6IE51bGxhYmxlPFQ+IHtcclxuICAgICAgICBpZiAoIWFycmF5IHx8IGluZGV4ID09IHVuZGVmaW5lZCB8fCAhYXJyYXlbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycmF5W2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzc2lnbiBhbiBgaW5kZXhgIGZpZWxkIHRvIGVhY2ggaXRlbSBvZiB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkgVGhlIGFycmF5IG9mIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQXNzaWduKGFycmF5PzogSUFycmF5SXRlbVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFycmF5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2luZGV4XS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFuaW1hdGlvblRhcmdldEluZm8ge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgdGFyZ2V0OiBhbnk7XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHJvcGVydGllczogQXJyYXk8QW5pbWF0aW9uUHJvcGVydHlJbmZvPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBnbFRGIDIuMCBsb2FkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGTG9hZGVyIGltcGxlbWVudHMgSUdMVEZMb2FkZXIge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IF9jb21wbGV0ZVByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgX2Fzc2V0Q29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4gPSBudWxsO1xyXG5cclxuICAgIC8qKiBTdG9yYWdlICovXHJcbiAgICBwdWJsaWMgX2JhYnlsb25MaWdodHM6IExpZ2h0W10gPSBbXTtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgX2Rpc2FibGVJbnN0YW5jZWRNZXNoID0gMDtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wYXJlbnQ6IEdMVEZGaWxlTG9hZGVyO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZXh0ZW5zaW9ucyA9IG5ldyBBcnJheTxJR0xURkxvYWRlckV4dGVuc2lvbj4oKTtcclxuICAgIHByaXZhdGUgX2Rpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9yb290VXJsOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2ZpbGVOYW1lOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3VuaXF1ZVJvb3RVcmw6IE51bGxhYmxlPHN0cmluZz4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZ2x0ZjogSUdMVEY7XHJcbiAgICBwcml2YXRlIF9iaW46IE51bGxhYmxlPElEYXRhQnVmZmVyPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9iYWJ5bG9uU2NlbmU6IFNjZW5lO1xyXG4gICAgcHJpdmF0ZSBfcm9vdEJhYnlsb25NZXNoOiBOdWxsYWJsZTxNZXNoPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0QmFieWxvbk1hdGVyaWFsRGF0YTogeyBbZHJhd01vZGU6IG51bWJlcl06IE1hdGVyaWFsIH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Bvc3RTY2VuZUxvYWRBY3Rpb25zID0gbmV3IEFycmF5PCgpID0+IHZvaWQ+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1JlZ2lzdGVyZWRFeHRlbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBJUmVnaXN0ZXJlZEV4dGVuc2lvbiB9ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBnbFRGIHNhbXBsZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRGVmYXVsdFNhbXBsZXI6IElTYW1wbGVyID0geyBpbmRleDogLTEgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyBhIGxvYWRlciBleHRlbnNpb24uXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbG9hZGVyIGV4dGVuc2lvbi5cclxuICAgICAqIEBwYXJhbSBmYWN0b3J5IFRoZSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyB0aGUgbG9hZGVyIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSZWdpc3RlckV4dGVuc2lvbihuYW1lOiBzdHJpbmcsIGZhY3Rvcnk6IChsb2FkZXI6IEdMVEZMb2FkZXIpID0+IElHTFRGTG9hZGVyRXh0ZW5zaW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdMVEZMb2FkZXIuVW5yZWdpc3RlckV4dGVuc2lvbihuYW1lKSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuV2FybihgRXh0ZW5zaW9uIHdpdGggdGhlIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHTFRGTG9hZGVyLl9SZWdpc3RlcmVkRXh0ZW5zaW9uc1tuYW1lXSA9IHtcclxuICAgICAgICAgICAgZmFjdG9yeTogZmFjdG9yeSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5yZWdpc3RlcnMgYSBsb2FkZXIgZXh0ZW5zaW9uLlxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGxvYWRlciBleHRlbnNpb24uXHJcbiAgICAgKiBAcmV0dXJucyBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBleHRlbnNpb24gaGFzIGJlZW4gdW5yZWdpc3RlcmVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVW5yZWdpc3RlckV4dGVuc2lvbihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIUdMVEZMb2FkZXIuX1JlZ2lzdGVyZWRFeHRlbnNpb25zW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBHTFRGTG9hZGVyLl9SZWdpc3RlcmVkRXh0ZW5zaW9uc1tuYW1lXTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBnbFRGIEpTT04uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZ2x0ZigpOiBJR0xURiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9nbHRmKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdsVEYgSlNPTiBpcyBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dsdGY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgQklOIGNodW5rIG9mIGEgYmluYXJ5IGdsVEYuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYmluKCk6IE51bGxhYmxlPElEYXRhQnVmZmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JpbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwYXJlbnQgZmlsZSBsb2FkZXIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IEdMVEZGaWxlTG9hZGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEJhYnlsb24gc2NlbmUgd2hlbiBsb2FkaW5nIHRoZSBhc3NldC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBiYWJ5bG9uU2NlbmUoKTogU2NlbmUge1xyXG4gICAgICAgIGlmICghdGhpcy5fYmFieWxvblNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNjZW5lIGlzIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFieWxvblNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJvb3QgQmFieWxvbiBtZXNoIHdoZW4gbG9hZGluZyB0aGUgYXNzZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcm9vdEJhYnlsb25NZXNoKCk6IE51bGxhYmxlPE1lc2g+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEJhYnlsb25NZXNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogR0xURkZpbGVMb2FkZXIpIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29tcGxldGVQcm9taXNlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9leHRlbnNpb25zLmZvckVhY2goKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLmRpc3Bvc2UgJiYgZXh0ZW5zaW9uLmRpc3Bvc2UoKSk7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAodGhpcy5fZ2x0ZiBhcyBOdWxsYWJsZTxJR0xURj4pID0gbnVsbDsgLy8gVE9ET1xyXG4gICAgICAgIHRoaXMuX2JpbiA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuX2JhYnlsb25TY2VuZSBhcyBOdWxsYWJsZTxTY2VuZT4pID0gbnVsbDsgLy8gVE9ET1xyXG4gICAgICAgIHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdEJhYnlsb25NYXRlcmlhbERhdGEgPSB7fTtcclxuICAgICAgICB0aGlzLl9wb3N0U2NlbmVMb2FkQWN0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9wYXJlbnQuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBvcnRNZXNoQXN5bmMoXHJcbiAgICAgICAgbWVzaGVzTmFtZXM6IGFueSxcclxuICAgICAgICBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgY29udGFpbmVyOiBOdWxsYWJsZTxBc3NldENvbnRhaW5lcj4sXHJcbiAgICAgICAgZGF0YTogSUdMVEZMb2FkZXJEYXRhLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLFxyXG4gICAgICAgIGZpbGVOYW1lID0gXCJcIlxyXG4gICAgKTogUHJvbWlzZTxJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkRGF0YShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlczogTnVsbGFibGU8QXJyYXk8bnVtYmVyPj4gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lc2hlc05hbWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dsdGYubm9kZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5fZ2x0Zi5ub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFwW25vZGUubmFtZV0gPSBub2RlLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gbWVzaGVzTmFtZXMgaW5zdGFuY2VvZiBBcnJheSA/IG1lc2hlc05hbWVzIDogW21lc2hlc05hbWVzXTtcclxuICAgICAgICAgICAgICAgIG5vZGVzID0gbmFtZXMubWFwKChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVNYXBbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmaW5kIG5vZGUgJyR7bmFtZX0nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEFzeW5jKHJvb3RVcmwsIGZpbGVOYW1lLCBub2RlcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNoZXM6IHRoaXMuX2dldE1lc2hlcygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlU3lzdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgc2tlbGV0b25zOiB0aGlzLl9nZXRTa2VsZXRvbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Hcm91cHM6IHRoaXMuX2dldEFuaW1hdGlvbkdyb3VwcygpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0czogdGhpcy5fYmFieWxvbkxpZ2h0cyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1Ob2RlczogdGhpcy5fZ2V0VHJhbnNmb3JtTm9kZXMoKSxcclxuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyaWVzOiB0aGlzLl9nZXRHZW9tZXRyaWVzKCksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzeW5jKHNjZW5lOiBTY2VuZSwgZGF0YTogSUdMVEZMb2FkZXJEYXRhLCByb290VXJsOiBzdHJpbmcsIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsIGZpbGVOYW1lID0gXCJcIik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEFzeW5jKHJvb3RVcmwsIGZpbGVOYW1lLCBudWxsLCAoKSA9PiB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRBc3luYzxUPihyb290VXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIG5vZGVzOiBOdWxsYWJsZTxBcnJheTxudW1iZXI+PiwgcmVzdWx0RnVuYzogKCkgPT4gVCk6IFByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290VXJsID0gcm9vdFVybDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VuaXF1ZVJvb3RVcmwgPSAhcm9vdFVybC5zdGFydHNXaXRoKFwiZmlsZTpcIikgJiYgZmlsZU5hbWUgPyByb290VXJsIDogYCR7cm9vdFVybH0ke0RhdGUubm93KCl9L2A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxlTmFtZSA9IGZpbGVOYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRFeHRlbnNpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0V4dGVuc2lvbnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2FkaW5nVG9SZWFkeUNvdW50ZXJOYW1lID0gYCR7R0xURkxvYWRlclN0YXRlW0dMVEZMb2FkZXJTdGF0ZS5MT0FESU5HXX0gPT4gJHtHTFRGTG9hZGVyU3RhdGVbR0xURkxvYWRlclN0YXRlLlJFQURZXX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZGluZ1RvQ29tcGxldGVDb3VudGVyTmFtZSA9IGAke0dMVEZMb2FkZXJTdGF0ZVtHTFRGTG9hZGVyU3RhdGUuTE9BRElOR119ID0+ICR7R0xURkxvYWRlclN0YXRlW0dMVEZMb2FkZXJTdGF0ZS5DT01QTEVURV19YDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3N0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKGxvYWRpbmdUb1JlYWR5Q291bnRlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9zdGFydFBlcmZvcm1hbmNlQ291bnRlcihsb2FkaW5nVG9Db21wbGV0ZUNvdW50ZXJOYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3NldFN0YXRlKEdMVEZMb2FkZXJTdGF0ZS5MT0FESU5HKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbnNPbkxvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmxvY2sgdGhlIG1hcmtpbmcgb2YgbWF0ZXJpYWxzIGRpcnR5IHVudGlsIHRoZSBzY2VuZSBpcyBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRCbG9ja01hdGVyaWFsRGlydHlNZWNoYW5pc20gPSB0aGlzLl9iYWJ5bG9uU2NlbmUuYmxvY2tNYXRlcmlhbERpcnR5TWVjaGFuaXNtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLmJsb2NrTWF0ZXJpYWxEaXJ0eU1lY2hhbmlzbSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmVudC5sb2FkT25seU1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFNjZW5lQXN5bmMoXCIvbm9kZXNcIiwgeyBub2Rlczogbm9kZXMsIGluZGV4OiAtMSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9nbHRmLnNjZW5lICE9IHVuZGVmaW5lZCB8fCAodGhpcy5fZ2x0Zi5zY2VuZXMgJiYgdGhpcy5fZ2x0Zi5zY2VuZXNbMF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjZW5lID0gQXJyYXlJdGVtLkdldChgL3NjZW5lYCwgdGhpcy5fZ2x0Zi5zY2VuZXMsIHRoaXMuX2dsdGYuc2NlbmUgfHwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkU2NlbmVBc3luYyhgL3NjZW5lcy8ke3NjZW5lLmluZGV4fWAsIHNjZW5lKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXJlbnQuc2tpcE1hdGVyaWFscyAmJiB0aGlzLnBhcmVudC5sb2FkQWxsTWF0ZXJpYWxzICYmIHRoaXMuX2dsdGYubWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCB0aGlzLl9nbHRmLm1hdGVyaWFscy5sZW5ndGg7ICsrbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IHRoaXMuX2dsdGYubWF0ZXJpYWxzW21dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gXCIvbWF0ZXJpYWxzL1wiICsgbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbkRyYXdNb2RlID0gTWF0ZXJpYWwuVHJpYW5nbGVGaWxsTW9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZE1hdGVyaWFsQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIG51bGwsIGJhYnlsb25EcmF3TW9kZSwgKCkgPT4ge30pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSB0aGUgYmxvY2tpbmcgb2YgbWF0ZXJpYWwgZGlydHkuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuYmxvY2tNYXRlcmlhbERpcnR5TWVjaGFuaXNtID0gb2xkQmxvY2tNYXRlcmlhbERpcnR5TWVjaGFuaXNtO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQuY29tcGlsZU1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fY29tcGlsZU1hdGVyaWFsc0FzeW5jKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQuY29tcGlsZVNoYWRvd0dlbmVyYXRvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2NvbXBpbGVTaGFkb3dHZW5lcmF0b3JzQXN5bmMoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0UHJvbWlzZSA9IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm9vdEJhYnlsb25NZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaC5zZXRFbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uc09uUmVhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3NldFN0YXRlKEdMVEZMb2FkZXJTdGF0ZS5SRUFEWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QW5pbWF0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0RnVuYygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFByb21pc2UudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9lbmRQZXJmb3JtYW5jZUNvdW50ZXIobG9hZGluZ1RvUmVhZHlDb3VudGVyTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLlNldEltbWVkaWF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHRoaXMuX2NvbXBsZXRlUHJvbWlzZXMpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQuX2VuZFBlcmZvcm1hbmNlQ291bnRlcihsb2FkaW5nVG9Db21wbGV0ZUNvdW50ZXJOYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fc2V0U3RhdGUoR0xURkxvYWRlclN0YXRlLkNPTVBMRVRFKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnModW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Lm9uQ29tcGxldGVPYnNlcnZhYmxlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQub25FcnJvck9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Lm9uRXJyb3JPYnNlcnZhYmxlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNwb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5vbkVycm9yT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnMoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5vbkVycm9yT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZERhdGEoZGF0YTogSUdMVEZMb2FkZXJEYXRhKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZ2x0ZiA9IGRhdGEuanNvbiBhcyBJR0xURjtcclxuICAgICAgICB0aGlzLl9zZXR1cERhdGEoKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuYmluKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSB0aGlzLl9nbHRmLmJ1ZmZlcnM7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJzICYmIGJ1ZmZlcnNbMF0gJiYgIWJ1ZmZlcnNbMF0udXJpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiaW5hcnlCdWZmZXIgPSBidWZmZXJzWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpbmFyeUJ1ZmZlci5ieXRlTGVuZ3RoIDwgZGF0YS5iaW4uYnl0ZUxlbmd0aCAtIDMgfHwgYmluYXJ5QnVmZmVyLmJ5dGVMZW5ndGggPiBkYXRhLmJpbi5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYEJpbmFyeSBidWZmZXIgbGVuZ3RoICgke2JpbmFyeUJ1ZmZlci5ieXRlTGVuZ3RofSkgZnJvbSBKU09OIGRvZXMgbm90IG1hdGNoIGNodW5rIGxlbmd0aCAoJHtkYXRhLmJpbi5ieXRlTGVuZ3RofSlgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iaW4gPSBkYXRhLmJpbjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKFwiVW5leHBlY3RlZCBCSU4gY2h1bmtcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0dXBEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIEFycmF5SXRlbS5Bc3NpZ24odGhpcy5fZ2x0Zi5hY2Nlc3NvcnMpO1xyXG4gICAgICAgIEFycmF5SXRlbS5Bc3NpZ24odGhpcy5fZ2x0Zi5hbmltYXRpb25zKTtcclxuICAgICAgICBBcnJheUl0ZW0uQXNzaWduKHRoaXMuX2dsdGYuYnVmZmVycyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLmJ1ZmZlclZpZXdzKTtcclxuICAgICAgICBBcnJheUl0ZW0uQXNzaWduKHRoaXMuX2dsdGYuY2FtZXJhcyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLmltYWdlcyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLm1hdGVyaWFscyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLm1lc2hlcyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLm5vZGVzKTtcclxuICAgICAgICBBcnJheUl0ZW0uQXNzaWduKHRoaXMuX2dsdGYuc2FtcGxlcnMpO1xyXG4gICAgICAgIEFycmF5SXRlbS5Bc3NpZ24odGhpcy5fZ2x0Zi5zY2VuZXMpO1xyXG4gICAgICAgIEFycmF5SXRlbS5Bc3NpZ24odGhpcy5fZ2x0Zi5za2lucyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbih0aGlzLl9nbHRmLnRleHR1cmVzKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2dsdGYubm9kZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZVBhcmVudHM6IHsgW2luZGV4OiBudW1iZXJdOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5fZ2x0Zi5ub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVBhcmVudHNbaW5kZXhdID0gbm9kZS5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvb3ROb2RlID0gdGhpcy5fY3JlYXRlUm9vdE5vZGUoKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuX2dsdGYubm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEluZGV4ID0gbm9kZVBhcmVudHNbbm9kZS5pbmRleF07XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudEluZGV4ID09PSB1bmRlZmluZWQgPyByb290Tm9kZSA6IHRoaXMuX2dsdGYubm9kZXNbcGFyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRFeHRlbnNpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBHTFRGTG9hZGVyLl9SZWdpc3RlcmVkRXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBHTFRGTG9hZGVyLl9SZWdpc3RlcmVkRXh0ZW5zaW9uc1tuYW1lXS5mYWN0b3J5KHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLm5hbWUgIT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKGBUaGUgbmFtZSBvZiB0aGUgZ2xURiBsb2FkZXIgZXh0ZW5zaW9uIGluc3RhbmNlIGRvZXMgbm90IG1hdGNoIHRoZSByZWdpc3RlcmVkIG5hbWU6ICR7ZXh0ZW5zaW9uLm5hbWV9ICE9PSAke25hbWV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbnMucHVzaChleHRlbnNpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQub25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhleHRlbnNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZXh0ZW5zaW9ucy5zb3J0KChhLCBiKSA9PiAoYS5vcmRlciB8fCBOdW1iZXIuTUFYX1ZBTFVFKSAtIChiLm9yZGVyIHx8IE51bWJlci5NQVhfVkFMVUUpKTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQub25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hlY2tFeHRlbnNpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9nbHRmLmV4dGVuc2lvbnNSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5fZ2x0Zi5leHRlbnNpb25zUmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IHRoaXMuX2V4dGVuc2lvbnMuc29tZSgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ubmFtZSA9PT0gbmFtZSAmJiBleHRlbnNpb24uZW5hYmxlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWlyZSBleHRlbnNpb24gJHtuYW1lfSBpcyBub3QgYXZhaWxhYmxlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlUm9vdE5vZGUoKTogSU5vZGUge1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISF0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLl9yb290QmFieWxvbk1lc2ggPSBuZXcgTWVzaChcIl9fcm9vdF9fXCIsIHRoaXMuX2JhYnlsb25TY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fcm9vdEJhYnlsb25NZXNoLl9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaC5zZXRFbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgY29uc3Qgcm9vdE5vZGU6IElOb2RlID0ge1xyXG4gICAgICAgICAgICBfYmFieWxvblRyYW5zZm9ybU5vZGU6IHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaCxcclxuICAgICAgICAgICAgaW5kZXg6IC0xLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fcGFyZW50LmNvb3JkaW5hdGVTeXN0ZW1Nb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR0xURkxvYWRlckNvb3JkaW5hdGVTeXN0ZW1Nb2RlLkFVVE86IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYmFieWxvblNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdE5vZGUucm90YXRpb24gPSBbMCwgMSwgMCwgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdE5vZGUuc2NhbGUgPSBbMSwgMSwgLTFdO1xyXG4gICAgICAgICAgICAgICAgICAgIEdMVEZMb2FkZXIuX0xvYWRUcmFuc2Zvcm0ocm9vdE5vZGUsIHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEdMVEZMb2FkZXJDb29yZGluYXRlU3lzdGVtTW9kZS5GT1JDRV9SSUdIVF9IQU5ERUQ6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY29vcmRpbmF0ZSBzeXN0ZW0gbW9kZSAoJHt0aGlzLl9wYXJlbnQuY29vcmRpbmF0ZVN5c3RlbU1vZGV9KWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wYXJlbnQub25NZXNoTG9hZGVkT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnModGhpcy5fcm9vdEJhYnlsb25NZXNoKTtcclxuICAgICAgICByZXR1cm4gcm9vdE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIGdsVEYgc2NlbmUuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIGdsVEYgc2NlbmUgcHJvcGVydHlcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRTY2VuZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgc2NlbmU6IElTY2VuZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZFNjZW5lQXN5bmMoY29udGV4dCwgc2NlbmUpO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ09wZW4oYCR7Y29udGV4dH0gJHtzY2VuZS5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgIGlmIChzY2VuZS5ub2Rlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGluZGV4IG9mIHNjZW5lLm5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9ub2Rlcy8ke2luZGV4fWAsIHRoaXMuX2dsdGYubm9kZXMsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTm9kZUFzeW5jKGAvbm9kZXMvJHtub2RlLmluZGV4fWAsIG5vZGUsIChiYWJ5bG9uTWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5wYXJlbnQgPSB0aGlzLl9yb290QmFieWxvbk1lc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgYWN0aW9uIG9mIHRoaXMuX3Bvc3RTY2VuZUxvYWRBY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9sb2FkQW5pbWF0aW9uc0FzeW5jKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ0Nsb3NlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9yRWFjaFByaW1pdGl2ZShub2RlOiBJTm9kZSwgY2FsbGJhY2s6IChiYWJ5bG9uTWVzaDogQWJzdHJhY3RNZXNoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG5vZGUuX3ByaW1pdGl2ZUJhYnlsb25NZXNoZXMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uTWVzaCBvZiBub2RlLl9wcmltaXRpdmVCYWJ5bG9uTWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0R2VvbWV0cmllcygpOiBHZW9tZXRyeVtdIHtcclxuICAgICAgICBjb25zdCBnZW9tZXRyaWVzID0gbmV3IEFycmF5PEdlb21ldHJ5PigpO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuX2dsdGYubm9kZXM7XHJcbiAgICAgICAgaWYgKG5vZGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9yRWFjaFByaW1pdGl2ZShub2RlLCAoYmFieWxvbk1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZW9tZXRyeSA9IChiYWJ5bG9uTWVzaCBhcyBNZXNoKS5nZW9tZXRyeTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VvbWV0cnkgJiYgZ2VvbWV0cmllcy5pbmRleE9mKGdlb21ldHJ5KSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cmllcy5wdXNoKGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdlb21ldHJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0TWVzaGVzKCk6IEFic3RyYWN0TWVzaFtdIHtcclxuICAgICAgICBjb25zdCBtZXNoZXMgPSBuZXcgQXJyYXk8QWJzdHJhY3RNZXNoPigpO1xyXG5cclxuICAgICAgICAvLyBSb290IG1lc2ggaXMgYWx3YXlzIGZpcnN0LCBpZiBhdmFpbGFibGUuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaCkge1xyXG4gICAgICAgICAgICBtZXNoZXMucHVzaCh0aGlzLl9yb290QmFieWxvbk1lc2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLl9nbHRmLm5vZGVzO1xyXG4gICAgICAgIGlmIChub2Rlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvckVhY2hQcmltaXRpdmUobm9kZSwgKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaGVzLnB1c2goYmFieWxvbk1lc2gpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNoZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0VHJhbnNmb3JtTm9kZXMoKTogVHJhbnNmb3JtTm9kZVtdIHtcclxuICAgICAgICBjb25zdCB0cmFuc2Zvcm1Ob2RlcyA9IG5ldyBBcnJheTxUcmFuc2Zvcm1Ob2RlPigpO1xyXG5cclxuICAgICAgICBjb25zdCBub2RlcyA9IHRoaXMuX2dsdGYubm9kZXM7XHJcbiAgICAgICAgaWYgKG5vZGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlICYmIG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlLmdldENsYXNzTmFtZSgpID09PSBcIlRyYW5zZm9ybU5vZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU5vZGVzLnB1c2gobm9kZS5fYmFieWxvblRyYW5zZm9ybU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlRm9yU2tpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU5vZGVzLnB1c2gobm9kZS5fYmFieWxvblRyYW5zZm9ybU5vZGVGb3JTa2luKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybU5vZGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldFNrZWxldG9ucygpOiBTa2VsZXRvbltdIHtcclxuICAgICAgICBjb25zdCBza2VsZXRvbnMgPSBuZXcgQXJyYXk8U2tlbGV0b24+KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNraW5zID0gdGhpcy5fZ2x0Zi5za2lucztcclxuICAgICAgICBpZiAoc2tpbnMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBza2luIG9mIHNraW5zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbi5fZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrZWxldG9ucy5wdXNoKHNraW4uX2RhdGEuYmFieWxvblNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNrZWxldG9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRBbmltYXRpb25Hcm91cHMoKTogQW5pbWF0aW9uR3JvdXBbXSB7XHJcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uR3JvdXBzID0gbmV3IEFycmF5PEFuaW1hdGlvbkdyb3VwPigpO1xyXG5cclxuICAgICAgICBjb25zdCBhbmltYXRpb25zID0gdGhpcy5fZ2x0Zi5hbmltYXRpb25zO1xyXG4gICAgICAgIGlmIChhbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgYW5pbWF0aW9uIG9mIGFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24uX2JhYnlsb25BbmltYXRpb25Hcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkdyb3Vwcy5wdXNoKGFuaW1hdGlvbi5fYmFieWxvbkFuaW1hdGlvbkdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbkdyb3VwcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zdGFydEFuaW1hdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9wYXJlbnQuYW5pbWF0aW9uU3RhcnRNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR0xURkxvYWRlckFuaW1hdGlvblN0YXJ0TW9kZS5OT05FOiB7XHJcbiAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEdMVEZMb2FkZXJBbmltYXRpb25TdGFydE1vZGUuRklSU1Q6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25BbmltYXRpb25Hcm91cHMgPSB0aGlzLl9nZXRBbmltYXRpb25Hcm91cHMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uQW5pbWF0aW9uR3JvdXBzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25BbmltYXRpb25Hcm91cHNbMF0uc3RhcnQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEdMVEZMb2FkZXJBbmltYXRpb25TdGFydE1vZGUuQUxMOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWJ5bG9uQW5pbWF0aW9uR3JvdXBzID0gdGhpcy5fZ2V0QW5pbWF0aW9uR3JvdXBzKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25BbmltYXRpb25Hcm91cCBvZiBiYWJ5bG9uQW5pbWF0aW9uR3JvdXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbkFuaW1hdGlvbkdyb3VwLnN0YXJ0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkVycm9yKGBJbnZhbGlkIGFuaW1hdGlvbiBzdGFydCBtb2RlICgke3RoaXMuX3BhcmVudC5hbmltYXRpb25TdGFydE1vZGV9KWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBnbFRGIG5vZGUuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gbm9kZSBUaGUgZ2xURiBub2RlIHByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0gYXNzaWduIEEgZnVuY3Rpb24gY2FsbGVkIHN5bmNocm9ub3VzbHkgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2FkZWQgQmFieWxvbiBtZXNoIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWROb2RlQXN5bmMoY29udGV4dDogc3RyaW5nLCBub2RlOiBJTm9kZSwgYXNzaWduOiAoYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUpID0+IHZvaWQgPSAoKSA9PiB7fSk6IFByb21pc2U8VHJhbnNmb3JtTm9kZT4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZE5vZGVBc3luYyhjb250ZXh0LCBub2RlLCBhc3NpZ24pO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogSW52YWxpZCByZWN1cnNpdmUgbm9kZSBoaWVyYXJjaHlgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dPcGVuKGAke2NvbnRleHR9ICR7bm9kZS5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxvYWROb2RlID0gKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIEdMVEZMb2FkZXIuQWRkUG9pbnRlck1ldGFkYXRhKGJhYnlsb25UcmFuc2Zvcm1Ob2RlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgR0xURkxvYWRlci5fTG9hZFRyYW5zZm9ybShub2RlLCBiYWJ5bG9uVHJhbnNmb3JtTm9kZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5jYW1lcmEgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW1lcmEgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L2NhbWVyYWAsIHRoaXMuX2dsdGYuY2FtZXJhcywgbm9kZS5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRDYW1lcmFBc3luYyhgL2NhbWVyYXMvJHtjYW1lcmEuaW5kZXh9YCwgY2FtZXJhLCAoYmFieWxvbkNhbWVyYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uQ2FtZXJhLnBhcmVudCA9IGJhYnlsb25UcmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGROb2RlID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9jaGlsZHJlbi8ke2luZGV4fWAsIHRoaXMuX2dsdGYubm9kZXMsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWROb2RlQXN5bmMoYC9ub2Rlcy8ke2NoaWxkTm9kZS5pbmRleH1gLCBjaGlsZE5vZGUsIChjaGlsZEJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEJhYnlsb25NZXNoLnBhcmVudCA9IGJhYnlsb25UcmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFzc2lnbihiYWJ5bG9uVHJhbnNmb3JtTm9kZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUubWVzaCA9PSB1bmRlZmluZWQgfHwgbm9kZS5za2luICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlTmFtZSA9IG5vZGUubmFtZSB8fCBgbm9kZSR7bm9kZS5pbmRleH1gO1xyXG4gICAgICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybU5vZGUgPSBuZXcgVHJhbnNmb3JtTm9kZShub2RlTmFtZSwgdGhpcy5fYmFieWxvblNjZW5lKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtTm9kZS5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm1lc2ggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl9iYWJ5bG9uVHJhbnNmb3JtTm9kZSA9IHRyYW5zZm9ybU5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl9iYWJ5bG9uVHJhbnNmb3JtTm9kZUZvclNraW4gPSB0cmFuc2Zvcm1Ob2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvYWROb2RlKHRyYW5zZm9ybU5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUubWVzaCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuc2tpbiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L21lc2hgLCB0aGlzLl9nbHRmLm1lc2hlcywgbm9kZS5tZXNoKTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZE1lc2hBc3luYyhgL21lc2hlcy8ke21lc2guaW5kZXh9YCwgbm9kZSwgbWVzaCwgbG9hZE5vZGUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vS2hyb25vc0dyb3VwL2dsVEYvdHJlZS9tYXN0ZXIvc3BlY2lmaWNhdGlvbi8yLjAjc2tpbnMgKHNlY29uZCBpbXBsZW1lbnRhdGlvbiBub3RlKVxyXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBjb2RlIHBhdGggd2lsbCBwbGFjZSB0aGUgc2tpbm5lZCBtZXNoIGFzIGEgc2libGluZyBvZiB0aGUgc2tlbGV0b24gcm9vdCBub2RlIHdpdGhvdXQgbG9hZGluZyB0aGVcclxuICAgICAgICAgICAgICAgIC8vIHRyYW5zZm9ybSwgd2hpY2ggZWZmZWN0aXZlbHkgaWdub3JlcyB0aGUgdHJhbnNmb3JtIG9mIHRoZSBza2lubmVkIG1lc2gsIGFzIHBlciBzcGVjLlxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L21lc2hgLCB0aGlzLl9nbHRmLm1lc2hlcywgbm9kZS5tZXNoKTtcclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZE1lc2hBc3luYyhgL21lc2hlcy8ke21lc2guaW5kZXh9YCwgbm9kZSwgbWVzaCwgKGJhYnlsb25UcmFuc2Zvcm1Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25UcmFuc2Zvcm1Ob2RlRm9yU2tpbiA9IG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlRm9yU2tpbiE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNZXJnZSB0aGUgbWV0YWRhdGEgZnJvbSB0aGUgc2tpbiBub2RlIHRvIHRoZSBza2lubmVkIG1lc2ggaW4gY2FzZSBhIGxvYWRlciBleHRlbnNpb24gYWRkZWQgbWV0YWRhdGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLm1ldGFkYXRhID0gbWVyZ2VEZWVwKGJhYnlsb25UcmFuc2Zvcm1Ob2RlRm9yU2tpbi5tZXRhZGF0YSwgYmFieWxvblRyYW5zZm9ybU5vZGUubWV0YWRhdGEgfHwge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2tpbiA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vc2tpbmAsIHRoaXMuX2dsdGYuc2tpbnMsIG5vZGUuc2tpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkU2tpbkFzeW5jKGAvc2tpbnMvJHtza2luLmluZGV4fWAsIG5vZGUsIHNraW4sIChiYWJ5bG9uU2tlbGV0b24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JFYWNoUHJpbWl0aXZlKG5vZGUsIChiYWJ5bG9uTWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5za2VsZXRvbiA9IGJhYnlsb25Ta2VsZXRvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2FpdCB1bnRpbCBhbGwgdGhlIG5vZGVzIGFyZSBwYXJlbnRlZCBiZWZvcmUgcGFyZW50aW5nIHRoZSBza2lubmVkIG1lc2guXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zdFNjZW5lTG9hZEFjdGlvbnMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2luLnNrZWxldG9uICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGxhY2UgdGhlIHNraW5uZWQgbWVzaCBub2RlIGFzIGEgc2libGluZyBvZiB0aGUgc2tlbGV0b24gcm9vdCBub2RlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVuIHRoZSBwYXJlbnQgb2YgdGhlIHNrZWxldG9uIHJvb3QgaXMgdGhlIHNraW5uZWQgbWVzaC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBBcnJheUl0ZW0uR2V0KGAvc2tpbnMvJHtza2luLmluZGV4fS9za2VsZXRvbmAsIHRoaXMuX2dsdGYubm9kZXMsIHNraW4uc2tlbGV0b24pLnBhcmVudCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pbmRleCA9PT0gcGFyZW50Tm9kZS5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnBhcmVudCA9IGJhYnlsb25UcmFuc2Zvcm1Ob2RlRm9yU2tpbi5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnBhcmVudCA9IHBhcmVudE5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25UcmFuc2Zvcm1Ob2RlLnBhcmVudCA9IHRoaXMuX3Jvb3RCYWJ5bG9uTWVzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Lm9uU2tpbkxvYWRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKHsgbm9kZTogYmFieWxvblRyYW5zZm9ybU5vZGVGb3JTa2luLCBza2lubmVkTm9kZTogYmFieWxvblRyYW5zZm9ybU5vZGUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZ0Nsb3NlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvckVhY2hQcmltaXRpdmUobm9kZSwgKGJhYnlsb25NZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGJhYnlsb25NZXNoIGFzIE1lc2gpLmdlb21ldHJ5ICYmIChiYWJ5bG9uTWVzaCBhcyBNZXNoKS5nZW9tZXRyeSEudXNlQm91bmRpbmdJbmZvRnJvbUdlb21ldHJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2ltcGx5IGFwcGx5IHRoZSB3b3JsZCBtYXRyaWNlcyB0byB0aGUgYm91bmRpbmcgaW5mbyAtIHRoZSBleHRlbmRzIGFyZSBhbHJlYWR5IG9rXHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2guX3VwZGF0ZUJvdW5kaW5nSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5yZWZyZXNoQm91bmRpbmdJbmZvKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLl9iYWJ5bG9uVHJhbnNmb3JtTm9kZSE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZE1lc2hBc3luYyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElOb2RlLCBtZXNoOiBJTWVzaCwgYXNzaWduOiAoYmFieWxvblRyYW5zZm9ybU5vZGU6IFRyYW5zZm9ybU5vZGUpID0+IHZvaWQpOiBQcm9taXNlPFRyYW5zZm9ybU5vZGU+IHtcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVzID0gbWVzaC5wcmltaXRpdmVzO1xyXG4gICAgICAgIGlmICghcHJpbWl0aXZlcyB8fCAhcHJpbWl0aXZlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBQcmltaXRpdmVzIGFyZSBtaXNzaW5nYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocHJpbWl0aXZlc1swXS5pbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgQXJyYXlJdGVtLkFzc2lnbihwcmltaXRpdmVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dPcGVuKGAke2NvbnRleHR9ICR7bWVzaC5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBub2RlLm5hbWUgfHwgYG5vZGUke25vZGUuaW5kZXh9YDtcclxuXHJcbiAgICAgICAgaWYgKHByaW1pdGl2ZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByaW1pdGl2ZSA9IG1lc2gucHJpbWl0aXZlc1swXTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRNZXNoUHJpbWl0aXZlQXN5bmMoYCR7Y29udGV4dH0vcHJpbWl0aXZlcy8ke3ByaW1pdGl2ZS5pbmRleH1gLCBuYW1lLCBub2RlLCBtZXNoLCBwcmltaXRpdmUsIChiYWJ5bG9uTWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlID0gYmFieWxvbk1lc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5fcHJpbWl0aXZlQmFieWxvbk1lc2hlcyA9IFtiYWJ5bG9uTWVzaF07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISF0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgbm9kZS5fYmFieWxvblRyYW5zZm9ybU5vZGUgPSBuZXcgVHJhbnNmb3JtTm9kZShuYW1lLCB0aGlzLl9iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgICAgICBub2RlLl9iYWJ5bG9uVHJhbnNmb3JtTm9kZS5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuX3ByaW1pdGl2ZUJhYnlsb25NZXNoZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwcmltaXRpdmUgb2YgcHJpbWl0aXZlcykge1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTWVzaFByaW1pdGl2ZUFzeW5jKGAke2NvbnRleHR9L3ByaW1pdGl2ZXMvJHtwcmltaXRpdmUuaW5kZXh9YCwgYCR7bmFtZX1fcHJpbWl0aXZlJHtwcmltaXRpdmUuaW5kZXh9YCwgbm9kZSwgbWVzaCwgcHJpbWl0aXZlLCAoYmFieWxvbk1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2gucGFyZW50ID0gbm9kZS5fYmFieWxvblRyYW5zZm9ybU5vZGUhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLl9wcmltaXRpdmVCYWJ5bG9uTWVzaGVzIS5wdXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXNzaWduKG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlISk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlITtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbCBEZWZpbmUgdGhpcyBtZXRob2QgdG8gbW9kaWZ5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHdoZW4gbG9hZGluZyBkYXRhIGZvciBtZXNoIHByaW1pdGl2ZXMuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbWVzaCBuYW1lIHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBub2RlIFRoZSBnbFRGIG5vZGUgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIG1lc2ggVGhlIGdsVEYgbWVzaCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gcHJpbWl0aXZlIFRoZSBnbFRGIG1lc2ggcHJpbWl0aXZlIHByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0gYXNzaWduIEEgZnVuY3Rpb24gY2FsbGVkIHN5bmNocm9ub3VzbHkgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2FkZWQgbWVzaCB3aGVuIHRoZSBsb2FkIGlzIGNvbXBsZXRlIG9yIG51bGwgaWYgbm90IGhhbmRsZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkTWVzaFByaW1pdGl2ZUFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgbm9kZTogSU5vZGUsXHJcbiAgICAgICAgbWVzaDogSU1lc2gsXHJcbiAgICAgICAgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSxcclxuICAgICAgICBhc3NpZ246IChiYWJ5bG9uTWVzaDogQWJzdHJhY3RNZXNoKSA9PiB2b2lkXHJcbiAgICApOiBQcm9taXNlPEFic3RyYWN0TWVzaD4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZE1lc2hQcmltaXRpdmVBc3luYyhjb250ZXh0LCBuYW1lLCBub2RlLCBtZXNoLCBwcmltaXRpdmUsIGFzc2lnbik7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZ09wZW4oYCR7Y29udGV4dH1gKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hvdWxkSW5zdGFuY2UgPSB0aGlzLl9kaXNhYmxlSW5zdGFuY2VkTWVzaCA9PT0gMCAmJiB0aGlzLl9wYXJlbnQuY3JlYXRlSW5zdGFuY2VzICYmIG5vZGUuc2tpbiA9PSB1bmRlZmluZWQgJiYgIW1lc2gucHJpbWl0aXZlc1swXS50YXJnZXRzO1xyXG5cclxuICAgICAgICBsZXQgYmFieWxvbkFic3RyYWN0TWVzaDogQWJzdHJhY3RNZXNoO1xyXG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT47XHJcblxyXG4gICAgICAgIGlmIChzaG91bGRJbnN0YW5jZSAmJiBwcmltaXRpdmUuX2luc3RhbmNlRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGJhYnlsb25BYnN0cmFjdE1lc2ggPSBwcmltaXRpdmUuX2luc3RhbmNlRGF0YS5iYWJ5bG9uU291cmNlTWVzaC5jcmVhdGVJbnN0YW5jZShuYW1lKSBhcyBJbnN0YW5jZWRNZXNoO1xyXG4gICAgICAgICAgICBiYWJ5bG9uQWJzdHJhY3RNZXNoLl9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHByaW1pdGl2ZS5faW5zdGFuY2VEYXRhLnByb21pc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSAhIXRoaXMuX2Fzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IG5ldyBNZXNoKG5hbWUsIHRoaXMuX2JhYnlsb25TY2VuZSk7XHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoLl9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgYmFieWxvbk1lc2gub3ZlcnJpZGVNYXRlcmlhbFNpZGVPcmllbnRhdGlvbiA9IHRoaXMuX2JhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA/IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb24gOiBNYXRlcmlhbC5DbG9ja1dpc2VTaWRlT3JpZW50YXRpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVNb3JwaFRhcmdldHMoY29udGV4dCwgbm9kZSwgbWVzaCwgcHJpbWl0aXZlLCBiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkVmVydGV4RGF0YUFzeW5jKGNvbnRleHQsIHByaW1pdGl2ZSwgYmFieWxvbk1lc2gpLnRoZW4oKGJhYnlsb25HZW9tZXRyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkTW9ycGhUYXJnZXRzQXN5bmMoY29udGV4dCwgcHJpbWl0aXZlLCBiYWJ5bG9uTWVzaCwgYmFieWxvbkdlb21ldHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISF0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbkdlb21ldHJ5LmFwcGx5VG9NZXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbkdlb21ldHJ5Ll9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uRHJhd01vZGUgPSBHTFRGTG9hZGVyLl9HZXREcmF3TW9kZShjb250ZXh0LCBwcmltaXRpdmUubW9kZSk7XHJcbiAgICAgICAgICAgIGlmIChwcmltaXRpdmUubWF0ZXJpYWwgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmFieWxvbk1hdGVyaWFsID0gdGhpcy5fZGVmYXVsdEJhYnlsb25NYXRlcmlhbERhdGFbYmFieWxvbkRyYXdNb2RlXTtcclxuICAgICAgICAgICAgICAgIGlmICghYmFieWxvbk1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsID0gdGhpcy5fY3JlYXRlRGVmYXVsdE1hdGVyaWFsKFwiX19HTFRGTG9hZGVyLl9kZWZhdWx0XCIsIGJhYnlsb25EcmF3TW9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50Lm9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhiYWJ5bG9uTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRCYWJ5bG9uTWF0ZXJpYWxEYXRhW2JhYnlsb25EcmF3TW9kZV0gPSBiYWJ5bG9uTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5tYXRlcmlhbCA9IGJhYnlsb25NYXRlcmlhbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wYXJlbnQuc2tpcE1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L21hdGVyaWFsYCwgdGhpcy5fZ2x0Zi5tYXRlcmlhbHMsIHByaW1pdGl2ZS5tYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRNYXRlcmlhbEFzeW5jKGAvbWF0ZXJpYWxzLyR7bWF0ZXJpYWwuaW5kZXh9YCwgbWF0ZXJpYWwsIGJhYnlsb25NZXNoLCBiYWJ5bG9uRHJhd01vZGUsIChiYWJ5bG9uTWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2gubWF0ZXJpYWwgPSBiYWJ5bG9uTWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByb21pc2UgPSBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkSW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHByaW1pdGl2ZS5faW5zdGFuY2VEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25Tb3VyY2VNZXNoOiBiYWJ5bG9uTWVzaCxcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFieWxvbkFic3RyYWN0TWVzaCA9IGJhYnlsb25NZXNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR0xURkxvYWRlci5BZGRQb2ludGVyTWV0YWRhdGEoYmFieWxvbkFic3RyYWN0TWVzaCwgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5fcGFyZW50Lm9uTWVzaExvYWRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGJhYnlsb25BYnN0cmFjdE1lc2gpO1xyXG4gICAgICAgIGFzc2lnbihiYWJ5bG9uQWJzdHJhY3RNZXNoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dDbG9zZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25BYnN0cmFjdE1lc2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFZlcnRleERhdGFBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByaW1pdGl2ZTogSU1lc2hQcmltaXRpdmUsIGJhYnlsb25NZXNoOiBNZXNoKTogUHJvbWlzZTxHZW9tZXRyeT4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZFZlcnRleERhdGFBc3luYyhjb250ZXh0LCBwcmltaXRpdmUsIGJhYnlsb25NZXNoKTtcclxuICAgICAgICBpZiAoZXh0ZW5zaW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBwcmltaXRpdmUuYXR0cmlidXRlcztcclxuICAgICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBBdHRyaWJ1dGVzIGFyZSBtaXNzaW5nYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhYnlsb25HZW9tZXRyeSA9IG5ldyBHZW9tZXRyeShiYWJ5bG9uTWVzaC5uYW1lLCB0aGlzLl9iYWJ5bG9uU2NlbmUpO1xyXG5cclxuICAgICAgICBpZiAocHJpbWl0aXZlLmluZGljZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoLmlzVW5JbmRleGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBhY2Nlc3NvciA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vaW5kaWNlc2AsIHRoaXMuX2dsdGYuYWNjZXNzb3JzLCBwcmltaXRpdmUuaW5kaWNlcyk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkSW5kaWNlc0FjY2Vzc29yQXN5bmMoYC9hY2Nlc3NvcnMvJHthY2Nlc3Nvci5pbmRleH1gLCBhY2Nlc3NvcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25HZW9tZXRyeS5zZXRJbmRpY2VzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvYWRBdHRyaWJ1dGUgPSAobmFtZTogc3RyaW5nLCBraW5kOiBzdHJpbmcsIGNhbGxiYWNrPzogKGFjY2Vzc29yOiBJQWNjZXNzb3IpID0+IHZvaWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZXNbbmFtZV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoLl9kZWxheUluZm8gPSBiYWJ5bG9uTWVzaC5fZGVsYXlJbmZvIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoYmFieWxvbk1lc2guX2RlbGF5SW5mby5pbmRleE9mKGtpbmQpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guX2RlbGF5SW5mby5wdXNoKGtpbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY2Nlc3NvciA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vYXR0cmlidXRlcy8ke25hbWV9YCwgdGhpcy5fZ2x0Zi5hY2Nlc3NvcnMsIGF0dHJpYnV0ZXNbbmFtZV0pO1xyXG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFZlcnRleEFjY2Vzc29yQXN5bmMoYC9hY2Nlc3NvcnMvJHthY2Nlc3Nvci5pbmRleH1gLCBhY2Nlc3Nvciwga2luZCkudGhlbigoYmFieWxvblZlcnRleEJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uVmVydGV4QnVmZmVyLmdldEtpbmQoKSA9PT0gVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCAmJiAhdGhpcy5wYXJlbnQuYWx3YXlzQ29tcHV0ZUJvdW5kaW5nQm94ICYmICFiYWJ5bG9uTWVzaC5za2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjZXNzb3IubWluICYmIGFjY2Vzc29yLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWluID0gVG1wVmVjdG9ycy5WZWN0b3IzWzBdLmNvcHlGcm9tRmxvYXRzKC4uLihhY2Nlc3Nvci5taW4gYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBUbXBWZWN0b3JzLlZlY3RvcjNbMV0uY29weUZyb21GbG9hdHMoLi4uKGFjY2Vzc29yLm1heCBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY2Nlc3Nvci5ub3JtYWxpemVkICYmIGFjY2Vzc29yLmNvbXBvbmVudFR5cGUgIT09IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXZpZGVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjY2Vzc29yLmNvbXBvbmVudFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuQllURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdmlkZXIgPSAxMjcuMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5VTlNJR05FRF9CWVRFOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IDI1NS4wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlNIT1JUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGl2aWRlciA9IDMyNzY3LjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZpZGVyID0gNjU1MzUuMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbmVPdmVyRGl2aWRlciA9IDEgLyBkaXZpZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbi5zY2FsZUluUGxhY2Uob25lT3ZlckRpdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heC5zY2FsZUluUGxhY2Uob25lT3ZlckRpdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbkdlb21ldHJ5Ll9ib3VuZGluZ0luZm8gPSBuZXcgQm91bmRpbmdJbmZvKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25HZW9tZXRyeS51c2VCb3VuZGluZ0luZm9Gcm9tR2VvbWV0cnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25HZW9tZXRyeS5zZXRWZXJ0aWNlc0J1ZmZlcihiYWJ5bG9uVmVydGV4QnVmZmVyLCBhY2Nlc3Nvci5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtpbmQgPT0gVmVydGV4QnVmZmVyLk1hdHJpY2VzSW5kaWNlc0V4dHJhS2luZCkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2gubnVtQm9uZUluZmx1ZW5jZXJzID0gODtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhhY2Nlc3Nvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsb2FkQXR0cmlidXRlKFwiUE9TSVRJT05cIiwgVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIk5PUk1BTFwiLCBWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRBTkdFTlRcIiwgVmVydGV4QnVmZmVyLlRhbmdlbnRLaW5kKTtcclxuICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfMFwiLCBWZXJ0ZXhCdWZmZXIuVVZLaW5kKTtcclxuICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfMVwiLCBWZXJ0ZXhCdWZmZXIuVVYyS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRFWENPT1JEXzJcIiwgVmVydGV4QnVmZmVyLlVWM0tpbmQpO1xyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJURVhDT09SRF8zXCIsIFZlcnRleEJ1ZmZlci5VVjRLaW5kKTtcclxuICAgICAgICBsb2FkQXR0cmlidXRlKFwiVEVYQ09PUkRfNFwiLCBWZXJ0ZXhCdWZmZXIuVVY1S2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIlRFWENPT1JEXzVcIiwgVmVydGV4QnVmZmVyLlVWNktpbmQpO1xyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJKT0lOVFNfMFwiLCBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNJbmRpY2VzS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIldFSUdIVFNfMFwiLCBWZXJ0ZXhCdWZmZXIuTWF0cmljZXNXZWlnaHRzS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIkpPSU5UU18xXCIsIFZlcnRleEJ1ZmZlci5NYXRyaWNlc0luZGljZXNFeHRyYUtpbmQpO1xyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJXRUlHSFRTXzFcIiwgVmVydGV4QnVmZmVyLk1hdHJpY2VzV2VpZ2h0c0V4dHJhS2luZCk7XHJcbiAgICAgICAgbG9hZEF0dHJpYnV0ZShcIkNPTE9SXzBcIiwgVmVydGV4QnVmZmVyLkNvbG9yS2luZCwgKGFjY2Vzc29yKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhY2Nlc3Nvci50eXBlID09PSBBY2Nlc3NvclR5cGUuVkVDNCkge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1lc2guaGFzVmVydGV4QWxwaGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYWJ5bG9uR2VvbWV0cnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlTW9ycGhUYXJnZXRzKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIG1lc2g6IElNZXNoLCBwcmltaXRpdmU6IElNZXNoUHJpbWl0aXZlLCBiYWJ5bG9uTWVzaDogTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghcHJpbWl0aXZlLnRhcmdldHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuX251bU1vcnBoVGFyZ2V0cyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbm9kZS5fbnVtTW9ycGhUYXJnZXRzID0gcHJpbWl0aXZlLnRhcmdldHMubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJpbWl0aXZlLnRhcmdldHMubGVuZ3RoICE9PSBub2RlLl9udW1Nb3JwaFRhcmdldHMpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBQcmltaXRpdmVzIGRvIG5vdCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiB0YXJnZXRzYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXROYW1lcyA9IG1lc2guZXh0cmFzID8gbWVzaC5leHRyYXMudGFyZ2V0TmFtZXMgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgYmFieWxvbk1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyID0gbmV3IE1vcnBoVGFyZ2V0TWFuYWdlcih0aGlzLl9iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgIGJhYnlsb25NZXNoLm1vcnBoVGFyZ2V0TWFuYWdlci5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgYmFieWxvbk1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyLmFyZVVwZGF0ZXNGcm96ZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJpbWl0aXZlLnRhcmdldHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlaWdodCA9IG5vZGUud2VpZ2h0cyA/IG5vZGUud2VpZ2h0c1tpbmRleF0gOiBtZXNoLndlaWdodHMgPyBtZXNoLndlaWdodHNbaW5kZXhdIDogMDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHRhcmdldE5hbWVzID8gdGFyZ2V0TmFtZXNbaW5kZXhdIDogYG1vcnBoVGFyZ2V0JHtpbmRleH1gO1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWVzaC5tb3JwaFRhcmdldE1hbmFnZXIuYWRkVGFyZ2V0KG5ldyBNb3JwaFRhcmdldChuYW1lLCB3ZWlnaHQsIGJhYnlsb25NZXNoLmdldFNjZW5lKCkpKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogdGVsbCB0aGUgdGFyZ2V0IHdoZXRoZXIgaXQgaGFzIHBvc2l0aW9ucywgbm9ybWFscywgdGFuZ2VudHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZE1vcnBoVGFyZ2V0c0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgYmFieWxvbk1lc2g6IE1lc2gsIGJhYnlsb25HZW9tZXRyeTogR2VvbWV0cnkpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIXByaW1pdGl2ZS50YXJnZXRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW9ycGhUYXJnZXRNYW5hZ2VyID0gYmFieWxvbk1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyITtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbW9ycGhUYXJnZXRNYW5hZ2VyLm51bVRhcmdldHM7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgYmFieWxvbk1vcnBoVGFyZ2V0ID0gbW9ycGhUYXJnZXRNYW5hZ2VyLmdldFRhcmdldChpbmRleCk7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fbG9hZE1vcnBoVGFyZ2V0VmVydGV4RGF0YUFzeW5jKGAke2NvbnRleHR9L3RhcmdldHMvJHtpbmRleH1gLCBiYWJ5bG9uR2VvbWV0cnksIHByaW1pdGl2ZS50YXJnZXRzW2luZGV4XSwgYmFieWxvbk1vcnBoVGFyZ2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBtb3JwaFRhcmdldE1hbmFnZXIuYXJlVXBkYXRlc0Zyb3plbiA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRNb3JwaFRhcmdldFZlcnRleERhdGFBc3luYyhjb250ZXh0OiBzdHJpbmcsIGJhYnlsb25HZW9tZXRyeTogR2VvbWV0cnksIGF0dHJpYnV0ZXM6IHsgW25hbWU6IHN0cmluZ106IG51bWJlciB9LCBiYWJ5bG9uTW9ycGhUYXJnZXQ6IE1vcnBoVGFyZ2V0KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICBjb25zdCBsb2FkQXR0cmlidXRlID0gKGF0dHJpYnV0ZTogc3RyaW5nLCBraW5kOiBzdHJpbmcsIHNldERhdGE6IChiYWJ5bG9uVmVydGV4QnVmZmVyOiBWZXJ0ZXhCdWZmZXIsIGRhdGE6IEZsb2F0MzJBcnJheSkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uVmVydGV4QnVmZmVyID0gYmFieWxvbkdlb21ldHJ5LmdldFZlcnRleEJ1ZmZlcihraW5kKTtcclxuICAgICAgICAgICAgaWYgKCFiYWJ5bG9uVmVydGV4QnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc29yID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS8ke2F0dHJpYnV0ZX1gLCB0aGlzLl9nbHRmLmFjY2Vzc29ycywgYXR0cmlidXRlc1thdHRyaWJ1dGVdKTtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRGbG9hdEFjY2Vzc29yQXN5bmMoYC9hY2Nlc3NvcnMvJHthY2Nlc3Nvci5pbmRleH1gLCBhY2Nlc3NvcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldERhdGEoYmFieWxvblZlcnRleEJ1ZmZlciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJQT1NJVElPTlwiLCBWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kLCAoYmFieWxvblZlcnRleEJ1ZmZlciwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgYmFieWxvblZlcnRleEJ1ZmZlci5mb3JFYWNoKGRhdGEubGVuZ3RoLCAodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnNbaW5kZXhdID0gZGF0YVtpbmRleF0gKyB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBiYWJ5bG9uTW9ycGhUYXJnZXQuc2V0UG9zaXRpb25zKHBvc2l0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJOT1JNQUxcIiwgVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIChiYWJ5bG9uVmVydGV4QnVmZmVyLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgYmFieWxvblZlcnRleEJ1ZmZlci5mb3JFYWNoKG5vcm1hbHMubGVuZ3RoLCAodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW2luZGV4XSA9IGRhdGFbaW5kZXhdICsgdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYmFieWxvbk1vcnBoVGFyZ2V0LnNldE5vcm1hbHMobm9ybWFscyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxvYWRBdHRyaWJ1dGUoXCJUQU5HRU5UXCIsIFZlcnRleEJ1ZmZlci5UYW5nZW50S2luZCwgKGJhYnlsb25WZXJ0ZXhCdWZmZXIsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFuZ2VudHMgPSBuZXcgRmxvYXQzMkFycmF5KChkYXRhLmxlbmd0aCAvIDMpICogNCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRhSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBiYWJ5bG9uVmVydGV4QnVmZmVyLmZvckVhY2goKGRhdGEubGVuZ3RoIC8gMykgKiA0LCAodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUYW5nZW50IGRhdGEgZm9yIG1vcnBoIHRhcmdldHMgaXMgc3RvcmVkIGFzIHh5eiBkZWx0YS5cclxuICAgICAgICAgICAgICAgIC8vIFRoZSB2ZXJ0ZXhEYXRhLnRhbmdlbnQgaXMgc3RvcmVkIGFzIHh5encuXHJcbiAgICAgICAgICAgICAgICAvLyBTbyB3ZSBuZWVkIHRvIHNraXAgZXZlcnkgZm91cnRoIHZlcnRleERhdGEudGFuZ2VudC5cclxuICAgICAgICAgICAgICAgIGlmICgoaW5kZXggKyAxKSAlIDQgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0YW5nZW50c1tkYXRhSW5kZXhdID0gZGF0YVtkYXRhSW5kZXhdICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiYWJ5bG9uTW9ycGhUYXJnZXQuc2V0VGFuZ2VudHModGFuZ2VudHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9Mb2FkVHJhbnNmb3JtKG5vZGU6IElOb2RlLCBiYWJ5bG9uTm9kZTogVHJhbnNmb3JtTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIC8vIElnbm9yZSB0aGUgVFJTIG9mIHNraW5uZWQgbm9kZXMuXHJcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzIuMCNza2lucyAoc2Vjb25kIGltcGxlbWVudGF0aW9uIG5vdGUpXHJcbiAgICAgICAgaWYgKG5vZGUuc2tpbiAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gVmVjdG9yMy5aZXJvKCk7XHJcbiAgICAgICAgbGV0IHJvdGF0aW9uID0gUXVhdGVybmlvbi5JZGVudGl0eSgpO1xyXG4gICAgICAgIGxldCBzY2FsaW5nID0gVmVjdG9yMy5PbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUubWF0cml4KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdHJpeCA9IE1hdHJpeC5Gcm9tQXJyYXkobm9kZS5tYXRyaXgpO1xyXG4gICAgICAgICAgICBtYXRyaXguZGVjb21wb3NlKHNjYWxpbmcsIHJvdGF0aW9uLCBwb3NpdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUudHJhbnNsYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gVmVjdG9yMy5Gcm9tQXJyYXkobm9kZS50cmFuc2xhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUucm90YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gUXVhdGVybmlvbi5Gcm9tQXJyYXkobm9kZS5yb3RhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUuc2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHNjYWxpbmcgPSBWZWN0b3IzLkZyb21BcnJheShub2RlLnNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmFieWxvbk5vZGUucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICBiYWJ5bG9uTm9kZS5yb3RhdGlvblF1YXRlcm5pb24gPSByb3RhdGlvbjtcclxuICAgICAgICBiYWJ5bG9uTm9kZS5zY2FsaW5nID0gc2NhbGluZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkU2tpbkFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIHNraW46IElTa2luLCBhc3NpZ246IChiYWJ5bG9uU2tlbGV0b246IFNrZWxldG9uKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uUHJvbWlzZSA9IHRoaXMuX2V4dGVuc2lvbnNMb2FkU2tpbkFzeW5jKGNvbnRleHQsIG5vZGUsIHNraW4pO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNraW4uX2RhdGEpIHtcclxuICAgICAgICAgICAgYXNzaWduKHNraW4uX2RhdGEuYmFieWxvblNrZWxldG9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNraW4uX2RhdGEucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNrZWxldG9uSWQgPSBgc2tlbGV0b24ke3NraW4uaW5kZXh9YDtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgYmFieWxvblNrZWxldG9uID0gbmV3IFNrZWxldG9uKHNraW4ubmFtZSB8fCBza2VsZXRvbklkLCBza2VsZXRvbklkLCB0aGlzLl9iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgIGJhYnlsb25Ta2VsZXRvbi5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fbG9hZEJvbmVzKGNvbnRleHQsIHNraW4sIGJhYnlsb25Ta2VsZXRvbik7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2xvYWRTa2luSW52ZXJzZUJpbmRNYXRyaWNlc0RhdGFBc3luYyhjb250ZXh0LCBza2luKS50aGVuKChpbnZlcnNlQmluZE1hdHJpY2VzRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVCb25lTWF0cmljZXMoYmFieWxvblNrZWxldG9uLCBpbnZlcnNlQmluZE1hdHJpY2VzRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNraW4uX2RhdGEgPSB7XHJcbiAgICAgICAgICAgIGJhYnlsb25Ta2VsZXRvbjogYmFieWxvblNrZWxldG9uLFxyXG4gICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFzc2lnbihiYWJ5bG9uU2tlbGV0b24pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQm9uZXMoY29udGV4dDogc3RyaW5nLCBza2luOiBJU2tpbiwgYmFieWxvblNrZWxldG9uOiBTa2VsZXRvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChza2luLnNrZWxldG9uID09IHVuZGVmaW5lZCB8fCB0aGlzLl9wYXJlbnQuYWx3YXlzQ29tcHV0ZVNrZWxldG9uUm9vdE5vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdE5vZGUgPSB0aGlzLl9maW5kU2tlbGV0b25Sb290Tm9kZShgJHtjb250ZXh0fS9qb2ludHNgLCBza2luLmpvaW50cyk7XHJcbiAgICAgICAgICAgIGlmIChyb290Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraW4uc2tlbGV0b24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraW4uc2tlbGV0b24gPSByb290Tm9kZS5pbmRleDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXJlbnQgPSAoYTogSU5vZGUsIGI6IElOb2RlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBiLnBhcmVudDsgYiA9IGIucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYi5wYXJlbnQgPT09IGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNrZWxldG9uTm9kZSA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vc2tlbGV0b25gLCB0aGlzLl9nbHRmLm5vZGVzLCBza2luLnNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b25Ob2RlICE9PSByb290Tm9kZSAmJiAhaXNQYXJlbnQoc2tlbGV0b25Ob2RlLCByb290Tm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH0vc2tlbGV0b246IE92ZXJyaWRpbmcgd2l0aCBuZWFyZXN0IGNvbW1vbiBhbmNlc3RvciBhcyBza2VsZXRvbiBub2RlIGlzIG5vdCBhIGNvbW1vbiByb290YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraW4uc2tlbGV0b24gPSByb290Tm9kZS5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuV2FybihgJHtjb250ZXh0fTogRmFpbGVkIHRvIGZpbmQgY29tbW9uIHJvb3RgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmFieWxvbkJvbmVzOiB7IFtpbmRleDogbnVtYmVyXTogQm9uZSB9ID0ge307XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiBza2luLmpvaW50cykge1xyXG4gICAgICAgICAgICBjb25zdCBub2RlID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9qb2ludHMvJHtpbmRleH1gLCB0aGlzLl9nbHRmLm5vZGVzLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRCb25lKG5vZGUsIHNraW4sIGJhYnlsb25Ta2VsZXRvbiwgYmFieWxvbkJvbmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZmluZFNrZWxldG9uUm9vdE5vZGUoY29udGV4dDogc3RyaW5nLCBqb2ludHM6IEFycmF5PG51bWJlcj4pOiBOdWxsYWJsZTxJTm9kZT4ge1xyXG4gICAgICAgIGlmIChqb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGF0aHM6IHsgW2pvaW50OiBudW1iZXJdOiBBcnJheTxJTm9kZT4gfSA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5kZXggb2Ygam9pbnRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBuZXcgQXJyYXk8SU5vZGU+KCk7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS8ke2luZGV4fWAsIHRoaXMuX2dsdGYubm9kZXMsIGluZGV4KTtcclxuICAgICAgICAgICAgd2hpbGUgKG5vZGUuaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnVuc2hpZnQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhdGhzW2luZGV4XSA9IHBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGU6IE51bGxhYmxlPElOb2RlPiA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gcGF0aHNbam9pbnRzWzBdXTtcclxuICAgICAgICAgICAgaWYgKGkgPj0gcGF0aC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHBhdGhbaV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgam9pbnRzLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gcGF0aHNbam9pbnRzW2pdXTtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IHBhdGgubGVuZ3RoIHx8IG5vZGUgIT09IHBhdGhbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm9vdE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEJvbmUobm9kZTogSU5vZGUsIHNraW46IElTa2luLCBiYWJ5bG9uU2tlbGV0b246IFNrZWxldG9uLCBiYWJ5bG9uQm9uZXM6IHsgW2luZGV4OiBudW1iZXJdOiBCb25lIH0pOiBCb25lIHtcclxuICAgICAgICBsZXQgYmFieWxvbkJvbmUgPSBiYWJ5bG9uQm9uZXNbbm9kZS5pbmRleF07XHJcbiAgICAgICAgaWYgKGJhYnlsb25Cb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYWJ5bG9uQm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJlbnRCYWJ5bG9uQm9uZTogTnVsbGFibGU8Qm9uZT4gPSBudWxsO1xyXG4gICAgICAgIGlmIChub2RlLmluZGV4ICE9PSBza2luLnNrZWxldG9uKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudCAmJiBub2RlLnBhcmVudC5pbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudEJhYnlsb25Cb25lID0gdGhpcy5fbG9hZEJvbmUobm9kZS5wYXJlbnQsIHNraW4sIGJhYnlsb25Ta2VsZXRvbiwgYmFieWxvbkJvbmVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChza2luLnNrZWxldG9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKGAvc2tpbnMvJHtza2luLmluZGV4fS9za2VsZXRvbjogU2tlbGV0b24gbm9kZSBpcyBub3QgYSBjb21tb24gcm9vdGApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib25lSW5kZXggPSBza2luLmpvaW50cy5pbmRleE9mKG5vZGUuaW5kZXgpO1xyXG4gICAgICAgIGJhYnlsb25Cb25lID0gbmV3IEJvbmUobm9kZS5uYW1lIHx8IGBqb2ludCR7bm9kZS5pbmRleH1gLCBiYWJ5bG9uU2tlbGV0b24sIHBhcmVudEJhYnlsb25Cb25lLCB0aGlzLl9nZXROb2RlTWF0cml4KG5vZGUpLCBudWxsLCBudWxsLCBib25lSW5kZXgpO1xyXG4gICAgICAgIGJhYnlsb25Cb25lc1tub2RlLmluZGV4XSA9IGJhYnlsb25Cb25lO1xyXG5cclxuICAgICAgICAvLyBXYWl0IHVudGlsIHRoZSBzY2VuZSBpcyBsb2FkZWQgdG8gZW5zdXJlIHRoZSB0cmFuc2Zvcm0gbm9kZXMgYXJlIGxvYWRlZC5cclxuICAgICAgICB0aGlzLl9wb3N0U2NlbmVMb2FkQWN0aW9ucy5wdXNoKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gTGluayB0aGUgQmFieWxvbiBib25lIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgQmFieWxvbiB0cmFuc2Zvcm0gbm9kZS5cclxuICAgICAgICAgICAgLy8gQSBnbFRGIGpvaW50IGlzIGEgcG9pbnRlciB0byBhIGdsVEYgbm9kZSBpbiB0aGUgZ2xURiBub2RlIGhpZXJhcmNoeSBzaW1pbGFyIHRvIFVuaXR5M0QuXHJcbiAgICAgICAgICAgIGJhYnlsb25Cb25lLmxpbmtUcmFuc2Zvcm1Ob2RlKG5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlISk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBiYWJ5bG9uQm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkU2tpbkludmVyc2VCaW5kTWF0cmljZXNEYXRhQXN5bmMoY29udGV4dDogc3RyaW5nLCBza2luOiBJU2tpbik6IFByb21pc2U8TnVsbGFibGU8RmxvYXQzMkFycmF5Pj4ge1xyXG4gICAgICAgIGlmIChza2luLmludmVyc2VCaW5kTWF0cmljZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhY2Nlc3NvciA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vaW52ZXJzZUJpbmRNYXRyaWNlc2AsIHRoaXMuX2dsdGYuYWNjZXNzb3JzLCBza2luLmludmVyc2VCaW5kTWF0cmljZXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkRmxvYXRBY2Nlc3NvckFzeW5jKGAvYWNjZXNzb3JzLyR7YWNjZXNzb3IuaW5kZXh9YCwgYWNjZXNzb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZUJvbmVNYXRyaWNlcyhiYWJ5bG9uU2tlbGV0b246IFNrZWxldG9uLCBpbnZlcnNlQmluZE1hdHJpY2VzRGF0YTogTnVsbGFibGU8RmxvYXQzMkFycmF5Pik6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgYmFieWxvbkJvbmUgb2YgYmFieWxvblNrZWxldG9uLmJvbmVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VNYXRyaXggPSBNYXRyaXguSWRlbnRpdHkoKTtcclxuICAgICAgICAgICAgY29uc3QgYm9uZUluZGV4ID0gYmFieWxvbkJvbmUuX2luZGV4ITtcclxuICAgICAgICAgICAgaWYgKGludmVyc2VCaW5kTWF0cmljZXNEYXRhICYmIGJvbmVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIE1hdHJpeC5Gcm9tQXJyYXlUb1JlZihpbnZlcnNlQmluZE1hdHJpY2VzRGF0YSwgYm9uZUluZGV4ICogMTYsIGJhc2VNYXRyaXgpO1xyXG4gICAgICAgICAgICAgICAgYmFzZU1hdHJpeC5pbnZlcnRUb1JlZihiYXNlTWF0cml4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYmFieWxvblBhcmVudEJvbmUgPSBiYWJ5bG9uQm9uZS5nZXRQYXJlbnQoKTtcclxuICAgICAgICAgICAgaWYgKGJhYnlsb25QYXJlbnRCb25lKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlTWF0cml4Lm11bHRpcGx5VG9SZWYoYmFieWxvblBhcmVudEJvbmUuZ2V0QWJzb2x1dGVJbnZlcnNlQmluZE1hdHJpeCgpLCBiYXNlTWF0cml4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFieWxvbkJvbmUudXBkYXRlTWF0cml4KGJhc2VNYXRyaXgsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGJhYnlsb25Cb25lLl91cGRhdGVBYnNvbHV0ZUJpbmRNYXRyaWNlcyh1bmRlZmluZWQsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0Tm9kZU1hdHJpeChub2RlOiBJTm9kZSk6IE1hdHJpeCB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUubWF0cml4XHJcbiAgICAgICAgICAgID8gTWF0cml4LkZyb21BcnJheShub2RlLm1hdHJpeClcclxuICAgICAgICAgICAgOiBNYXRyaXguQ29tcG9zZShcclxuICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA/IFZlY3RvcjMuRnJvbUFycmF5KG5vZGUuc2NhbGUpIDogVmVjdG9yMy5PbmUoKSxcclxuICAgICAgICAgICAgICAgICAgbm9kZS5yb3RhdGlvbiA/IFF1YXRlcm5pb24uRnJvbUFycmF5KG5vZGUucm90YXRpb24pIDogUXVhdGVybmlvbi5JZGVudGl0eSgpLFxyXG4gICAgICAgICAgICAgICAgICBub2RlLnRyYW5zbGF0aW9uID8gVmVjdG9yMy5Gcm9tQXJyYXkobm9kZS50cmFuc2xhdGlvbikgOiBWZWN0b3IzLlplcm8oKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIGdsVEYgY2FtZXJhLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgZ2xURiBjYW1lcmEgcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBhc3NpZ24gQSBmdW5jdGlvbiBjYWxsZWQgc3luY2hyb25vdXNseSBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXNcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvYWRlZCBCYWJ5bG9uIGNhbWVyYSB3aGVuIHRoZSBsb2FkIGlzIGNvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQ2FtZXJhQXN5bmMoY29udGV4dDogc3RyaW5nLCBjYW1lcmE6IElDYW1lcmEsIGFzc2lnbjogKGJhYnlsb25DYW1lcmE6IENhbWVyYSkgPT4gdm9pZCA9ICgpID0+IHt9KTogUHJvbWlzZTxDYW1lcmE+IHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb25Qcm9taXNlID0gdGhpcy5fZXh0ZW5zaW9uc0xvYWRDYW1lcmFBc3luYyhjb250ZXh0LCBjYW1lcmEsIGFzc2lnbik7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPGFueT4+KCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nT3BlbihgJHtjb250ZXh0fSAke2NhbWVyYS5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISF0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uQ2FtZXJhID0gbmV3IEZyZWVDYW1lcmEoY2FtZXJhLm5hbWUgfHwgYGNhbWVyYSR7Y2FtZXJhLmluZGV4fWAsIFZlY3RvcjMuWmVybygpLCB0aGlzLl9iYWJ5bG9uU2NlbmUsIGZhbHNlKTtcclxuICAgICAgICBiYWJ5bG9uQ2FtZXJhLl9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIGJhYnlsb25DYW1lcmEuaWdub3JlUGFyZW50U2NhbGluZyA9IHRydWU7XHJcbiAgICAgICAgY2FtZXJhLl9iYWJ5bG9uQ2FtZXJhID0gYmFieWxvbkNhbWVyYTtcclxuXHJcbiAgICAgICAgYmFieWxvbkNhbWVyYS5yb3RhdGlvbiA9IG5ldyBWZWN0b3IzKDAsIE1hdGguUEksIDApO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNhbWVyYS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ2FtZXJhVHlwZS5QRVJTUEVDVElWRToge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyc3BlY3RpdmUgPSBjYW1lcmEucGVyc3BlY3RpdmU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBlcnNwZWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBDYW1lcmEgcGVyc3BlY3RpdmUgcHJvcGVydGllcyBhcmUgbWlzc2luZ2ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEuZm92ID0gcGVyc3BlY3RpdmUueWZvdjtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEubWluWiA9IHBlcnNwZWN0aXZlLnpuZWFyO1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbkNhbWVyYS5tYXhaID0gcGVyc3BlY3RpdmUuemZhciB8fCAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDYW1lcmFUeXBlLk9SVEhPR1JBUEhJQzoge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYW1lcmEub3J0aG9ncmFwaGljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBDYW1lcmEgb3J0aG9ncmFwaGljIHByb3BlcnRpZXMgYXJlIG1pc3NpbmdgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQ2FtZXJhLm1vZGUgPSBDYW1lcmEuT1JUSE9HUkFQSElDX0NBTUVSQTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEub3J0aG9MZWZ0ID0gLWNhbWVyYS5vcnRob2dyYXBoaWMueG1hZztcclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEub3J0aG9SaWdodCA9IGNhbWVyYS5vcnRob2dyYXBoaWMueG1hZztcclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEub3J0aG9Cb3R0b20gPSAtY2FtZXJhLm9ydGhvZ3JhcGhpYy55bWFnO1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbkNhbWVyYS5vcnRob1RvcCA9IGNhbWVyYS5vcnRob2dyYXBoaWMueW1hZztcclxuICAgICAgICAgICAgICAgIGJhYnlsb25DYW1lcmEubWluWiA9IGNhbWVyYS5vcnRob2dyYXBoaWMuem5lYXI7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQ2FtZXJhLm1heFogPSBjYW1lcmEub3J0aG9ncmFwaGljLnpmYXI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06IEludmFsaWQgY2FtZXJhIHR5cGUgKCR7Y2FtZXJhLnR5cGV9KWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHTFRGTG9hZGVyLkFkZFBvaW50ZXJNZXRhZGF0YShiYWJ5bG9uQ2FtZXJhLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQub25DYW1lcmFMb2FkZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhiYWJ5bG9uQ2FtZXJhKTtcclxuICAgICAgICBhc3NpZ24oYmFieWxvbkNhbWVyYSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25DYW1lcmE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEFuaW1hdGlvbnNBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBhbmltYXRpb25zID0gdGhpcy5fZ2x0Zi5hbmltYXRpb25zO1xyXG4gICAgICAgIGlmICghYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPHZvaWQ+PigpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYW5pbWF0aW9ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gYW5pbWF0aW9uc1tpbmRleF07XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBbmltYXRpb25Bc3luYyhgL2FuaW1hdGlvbnMvJHthbmltYXRpb24uaW5kZXh9YCwgYW5pbWF0aW9uKS50aGVuKChhbmltYXRpb25Hcm91cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgYW5pbWF0aW9uIGdyb3VwIGlmIGl0IGVuZGVkIHVwIG5vdCBoYXZpbmcgYW55IGFuaW1hdGlvbnMgaW4gaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkdyb3VwLnRhcmdldGVkQW5pbWF0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uR3JvdXAuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBnbFRGIGFuaW1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gVGhlIGdsVEYgYW5pbWF0aW9uIHByb3BlcnR5XHJcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBsb2FkZWQgQmFieWxvbiBhbmltYXRpb24gZ3JvdXAgd2hlbiB0aGUgbG9hZCBpcyBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFuaW1hdGlvbkFzeW5jKGNvbnRleHQ6IHN0cmluZywgYW5pbWF0aW9uOiBJQW5pbWF0aW9uKTogUHJvbWlzZTxBbmltYXRpb25Hcm91cD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZEFuaW1hdGlvbkFzeW5jKGNvbnRleHQsIGFuaW1hdGlvbik7XHJcbiAgICAgICAgaWYgKHByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgYmFieWxvbkFuaW1hdGlvbkdyb3VwID0gbmV3IEFuaW1hdGlvbkdyb3VwKGFuaW1hdGlvbi5uYW1lIHx8IGBhbmltYXRpb24ke2FuaW1hdGlvbi5pbmRleH1gLCB0aGlzLl9iYWJ5bG9uU2NlbmUpO1xyXG4gICAgICAgIGJhYnlsb25BbmltYXRpb25Hcm91cC5fcGFyZW50Q29udGFpbmVyID0gdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICBhbmltYXRpb24uX2JhYnlsb25BbmltYXRpb25Hcm91cCA9IGJhYnlsb25BbmltYXRpb25Hcm91cDtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICBBcnJheUl0ZW0uQXNzaWduKGFuaW1hdGlvbi5jaGFubmVscyk7XHJcbiAgICAgICAgQXJyYXlJdGVtLkFzc2lnbihhbmltYXRpb24uc2FtcGxlcnMpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGNoYW5uZWwgb2YgYW5pbWF0aW9uLmNoYW5uZWxzKSB7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkQW5pbWF0aW9uQ2hhbm5lbEFzeW5jKGAke2NvbnRleHR9L2NoYW5uZWxzLyR7Y2hhbm5lbC5pbmRleH1gLCBjb250ZXh0LCBhbmltYXRpb24sIGNoYW5uZWwsIChiYWJ5bG9uVGFyZ2V0LCBiYWJ5bG9uQW5pbWF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvblRhcmdldC5hbmltYXRpb25zID0gYmFieWxvblRhcmdldC5hbmltYXRpb25zIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25UYXJnZXQuYW5pbWF0aW9ucy5wdXNoKGJhYnlsb25BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25BbmltYXRpb25Hcm91cC5hZGRUYXJnZXRlZEFuaW1hdGlvbihiYWJ5bG9uQW5pbWF0aW9uLCBiYWJ5bG9uVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBiYWJ5bG9uQW5pbWF0aW9uR3JvdXAubm9ybWFsaXplKDApO1xyXG4gICAgICAgICAgICByZXR1cm4gYmFieWxvbkFuaW1hdGlvbkdyb3VwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGhpZGRlblxyXG4gICAgICogTG9hZHMgYSBnbFRGIGFuaW1hdGlvbiBjaGFubmVsLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbkNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGFuaW1hdGlvbiB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gYW5pbWF0aW9uIFRoZSBnbFRGIGFuaW1hdGlvbiBwcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIGNoYW5uZWwgVGhlIGdsVEYgYW5pbWF0aW9uIGNoYW5uZWwgcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBvbkxvYWQgQ2FsbGVkIGZvciBlYWNoIGFuaW1hdGlvbiBsb2FkZWRcclxuICAgICAqIEByZXR1cm5zIEEgdm9pZCBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9hZCBpcyBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRBbmltYXRpb25DaGFubmVsQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIGFuaW1hdGlvbkNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBhbmltYXRpb246IElBbmltYXRpb24sXHJcbiAgICAgICAgY2hhbm5lbDogSUFuaW1hdGlvbkNoYW5uZWwsXHJcbiAgICAgICAgb25Mb2FkOiAoYmFieWxvbkFuaW1hdGFibGU6IElBbmltYXRhYmxlLCBiYWJ5bG9uQW5pbWF0aW9uOiBBbmltYXRpb24pID0+IHZvaWRcclxuICAgICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZEFuaW1hdGlvbkNoYW5uZWxBc3luYyhjb250ZXh0LCBhbmltYXRpb25Db250ZXh0LCBhbmltYXRpb24sIGNoYW5uZWwsIG9uTG9hZCk7XHJcbiAgICAgICAgaWYgKHByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2hhbm5lbC50YXJnZXQubm9kZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vdGFyZ2V0L25vZGVgLCB0aGlzLl9nbHRmLm5vZGVzLCBjaGFubmVsLnRhcmdldC5ub2RlKTtcclxuXHJcbiAgICAgICAgLy8gSWdub3JlIGFuaW1hdGlvbnMgdGhhdCBoYXZlIG5vIGFuaW1hdGlvbiB0YXJnZXRzLlxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgKGNoYW5uZWwudGFyZ2V0LnBhdGggPT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLldFSUdIVFMgJiYgIXRhcmdldE5vZGUuX251bU1vcnBoVGFyZ2V0cykgfHxcclxuICAgICAgICAgICAgKGNoYW5uZWwudGFyZ2V0LnBhdGggIT09IEFuaW1hdGlvbkNoYW5uZWxUYXJnZXRQYXRoLldFSUdIVFMgJiYgIXRhcmdldE5vZGUuX2JhYnlsb25UcmFuc2Zvcm1Ob2RlKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcHJvcGVydGllczogQXJyYXk8QW5pbWF0aW9uUHJvcGVydHlJbmZvPjtcclxuICAgICAgICBzd2l0Y2ggKGNoYW5uZWwudGFyZ2V0LnBhdGgpIHtcclxuICAgICAgICAgICAgY2FzZSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5UUkFOU0xBVElPTjoge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IG5vZGVBbmltYXRpb25EYXRhLnRyYW5zbGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5ST1RBVElPTjoge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IG5vZGVBbmltYXRpb25EYXRhLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5TQ0FMRToge1xyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IG5vZGVBbmltYXRpb25EYXRhLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBBbmltYXRpb25DaGFubmVsVGFyZ2V0UGF0aC5XRUlHSFRTOiB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0gbm9kZUFuaW1hdGlvbkRhdGEud2VpZ2h0cztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fS90YXJnZXQvcGF0aDogSW52YWxpZCB2YWx1ZSAoJHtjaGFubmVsLnRhcmdldC5wYXRofSlgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SW5mbzogSUFuaW1hdGlvblRhcmdldEluZm8gPSB7XHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0Tm9kZSxcclxuICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEFuaW1hdGlvbkNoYW5uZWxGcm9tVGFyZ2V0SW5mb0FzeW5jKGNvbnRleHQsIGFuaW1hdGlvbkNvbnRleHQsIGFuaW1hdGlvbiwgY2hhbm5lbCwgdGFyZ2V0SW5mbywgb25Mb2FkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBoaWRkZW5cclxuICAgICAqIExvYWRzIGEgZ2xURiBhbmltYXRpb24gY2hhbm5lbC5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBhbmltYXRpb25Db250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBhbmltYXRpb24gd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgZ2xURiBhbmltYXRpb24gcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBjaGFubmVsIFRoZSBnbFRGIGFuaW1hdGlvbiBjaGFubmVsIHByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0SW5mbyBUaGUgZ2xURiB0YXJnZXQgYW5kIHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSBvbkxvYWQgQ2FsbGVkIGZvciBlYWNoIGFuaW1hdGlvbiBsb2FkZWRcclxuICAgICAqIEByZXR1cm5zIEEgdm9pZCBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9hZCBpcyBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRBbmltYXRpb25DaGFubmVsRnJvbVRhcmdldEluZm9Bc3luYyhcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgYW5pbWF0aW9uQ29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIGFuaW1hdGlvbjogSUFuaW1hdGlvbixcclxuICAgICAgICBjaGFubmVsOiBJQW5pbWF0aW9uQ2hhbm5lbCxcclxuICAgICAgICB0YXJnZXRJbmZvOiBJQW5pbWF0aW9uVGFyZ2V0SW5mbyxcclxuICAgICAgICBvbkxvYWQ6IChiYWJ5bG9uQW5pbWF0YWJsZTogSUFuaW1hdGFibGUsIGJhYnlsb25BbmltYXRpb246IEFuaW1hdGlvbikgPT4gdm9pZFxyXG4gICAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgZnBzID0gdGhpcy5wYXJlbnQudGFyZ2V0RnBzO1xyXG4gICAgICAgIGNvbnN0IGludmZwcyA9IDEgLyBmcHM7XHJcblxyXG4gICAgICAgIGNvbnN0IHNhbXBsZXIgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L3NhbXBsZXJgLCBhbmltYXRpb24uc2FtcGxlcnMsIGNoYW5uZWwuc2FtcGxlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRBbmltYXRpb25TYW1wbGVyQXN5bmMoYCR7YW5pbWF0aW9uQ29udGV4dH0vc2FtcGxlcnMvJHtjaGFubmVsLnNhbXBsZXJ9YCwgc2FtcGxlcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbnVtQW5pbWF0aW9ucyA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWN0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBmcm9tIHRoZSByZWFkIHZhbHVlLlxyXG4gICAgICAgICAgICAvLyBHTFRGIHZhbHVlcyBtYXkgYmUgZGlzcGF0Y2hlZCB0byBzZXZlcmFsIEJhYnlsb24gcHJvcGVydGllcy5cclxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGJhc2VDb2xvckZhY3RvciBbYHJgLCBgZ2AsIGBiYCwgYGFgXSBpcyBkaXNwYXRjaGVkIHRvXHJcbiAgICAgICAgICAgIC8vIC0gYWxiZWRvQ29sb3IgYXMgQ29sb3IzKGByYCwgYGdgLCBgYmApXHJcbiAgICAgICAgICAgIC8vIC0gYWxwaGEgYXMgYGFgXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgdGFyZ2V0SW5mby5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpZGUgPSBwcm9wZXJ0eS5nZXRTdHJpZGUodGFyZ2V0SW5mby50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBkYXRhLmlucHV0O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gZGF0YS5vdXRwdXQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlzID0gbmV3IEFycmF5PElBbmltYXRpb25LZXk+KGlucHV0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0T2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuaW50ZXJwb2xhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uU1RFUDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaW5wdXQubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnR5LmdldFZhbHVlKHRhcmdldEluZm8udGFyZ2V0LCBvdXRwdXQsIG91dHB1dE9mZnNldCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRPZmZzZXQgKz0gc3RyaWRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXNbaW5kZXhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lOiBpbnB1dFtpbmRleF0gKiBmcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRpb246IEFuaW1hdGlvbktleUludGVycG9sYXRpb24uU1RFUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5UYW5nZW50ID0gcHJvcGVydHkuZ2V0VmFsdWUodGFyZ2V0SW5mby50YXJnZXQsIG91dHB1dCwgb3V0cHV0T2Zmc2V0LCBpbnZmcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0T2Zmc2V0ICs9IHN0cmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydHkuZ2V0VmFsdWUodGFyZ2V0SW5mby50YXJnZXQsIG91dHB1dCwgb3V0cHV0T2Zmc2V0LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dE9mZnNldCArPSBzdHJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvdXRUYW5nZW50ID0gcHJvcGVydHkuZ2V0VmFsdWUodGFyZ2V0SW5mby50YXJnZXQsIG91dHB1dCwgb3V0cHV0T2Zmc2V0LCBpbnZmcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0T2Zmc2V0ICs9IHN0cmlkZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzW2luZGV4XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZTogaW5wdXRbaW5kZXhdICogZnBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluVGFuZ2VudDogaW5UYW5nZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRUYW5nZW50OiBvdXRUYW5nZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0eS5nZXRWYWx1ZSh0YXJnZXRJbmZvLnRhcmdldCwgb3V0cHV0LCBvdXRwdXRPZmZzZXQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0T2Zmc2V0ICs9IHN0cmlkZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzW2luZGV4XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZTogaW5wdXRbaW5kZXhdICogZnBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvdXRwdXRPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke2FuaW1hdGlvbi5uYW1lIHx8IGBhbmltYXRpb24ke2FuaW1hdGlvbi5pbmRleH1gfV9jaGFubmVsJHtjaGFubmVsLmluZGV4fV8ke251bUFuaW1hdGlvbnN9YDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5idWlsZEFuaW1hdGlvbnModGFyZ2V0SW5mby50YXJnZXQsIG5hbWUsIGZwcywga2V5cywgKGJhYnlsb25BbmltYXRhYmxlLCBiYWJ5bG9uQW5pbWF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrbnVtQW5pbWF0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2FkKGJhYnlsb25BbmltYXRhYmxlLCBiYWJ5bG9uQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRBbmltYXRpb25TYW1wbGVyQXN5bmMoY29udGV4dDogc3RyaW5nLCBzYW1wbGVyOiBJQW5pbWF0aW9uU2FtcGxlcik6IFByb21pc2U8X0lBbmltYXRpb25TYW1wbGVyRGF0YT4ge1xyXG4gICAgICAgIGlmIChzYW1wbGVyLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzYW1wbGVyLl9kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaW50ZXJwb2xhdGlvbiA9IHNhbXBsZXIuaW50ZXJwb2xhdGlvbiB8fCBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI7XHJcbiAgICAgICAgc3dpdGNoIChpbnRlcnBvbGF0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uU1RFUDpcclxuICAgICAgICAgICAgY2FzZSBBbmltYXRpb25TYW1wbGVySW50ZXJwb2xhdGlvbi5MSU5FQVI6XHJcbiAgICAgICAgICAgIGNhc2UgQW5pbWF0aW9uU2FtcGxlckludGVycG9sYXRpb24uQ1VCSUNTUExJTkU6IHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fS9pbnRlcnBvbGF0aW9uOiBJbnZhbGlkIHZhbHVlICgke3NhbXBsZXIuaW50ZXJwb2xhdGlvbn0pYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0QWNjZXNzb3IgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L2lucHV0YCwgdGhpcy5fZ2x0Zi5hY2Nlc3NvcnMsIHNhbXBsZXIuaW5wdXQpO1xyXG4gICAgICAgIGNvbnN0IG91dHB1dEFjY2Vzc29yID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9vdXRwdXRgLCB0aGlzLl9nbHRmLmFjY2Vzc29ycywgc2FtcGxlci5vdXRwdXQpO1xyXG4gICAgICAgIHNhbXBsZXIuX2RhdGEgPSBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRGbG9hdEFjY2Vzc29yQXN5bmMoYC9hY2Nlc3NvcnMvJHtpbnB1dEFjY2Vzc29yLmluZGV4fWAsIGlucHV0QWNjZXNzb3IpLFxyXG4gICAgICAgICAgICB0aGlzLl9sb2FkRmxvYXRBY2Nlc3NvckFzeW5jKGAvYWNjZXNzb3JzLyR7b3V0cHV0QWNjZXNzb3IuaW5kZXh9YCwgb3V0cHV0QWNjZXNzb3IpLFxyXG4gICAgICAgIF0pLnRoZW4oKFtpbnB1dERhdGEsIG91dHB1dERhdGFdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXREYXRhLFxyXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvbjogaW50ZXJwb2xhdGlvbixcclxuICAgICAgICAgICAgICAgIG91dHB1dDogb3V0cHV0RGF0YSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZXIuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIGdsVEYgYnVmZmVyLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGJ1ZmZlciBUaGUgZ2xURiBidWZmZXIgcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBieXRlT2Zmc2V0IFRoZSBieXRlIG9mZnNldCB0byB1c2VcclxuICAgICAqIEBwYXJhbSBieXRlTGVuZ3RoIFRoZSBieXRlIGxlbmd0aCB0byB1c2VcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvYWRlZCBkYXRhIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRCdWZmZXJBc3luYyhjb250ZXh0OiBzdHJpbmcsIGJ1ZmZlcjogSUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPEFycmF5QnVmZmVyVmlldz4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZEJ1ZmZlckFzeW5jKGNvbnRleHQsIGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWJ1ZmZlci5fZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoYnVmZmVyLnVyaSkge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLl9kYXRhID0gdGhpcy5sb2FkVXJpQXN5bmMoYCR7Y29udGV4dH0vdXJpYCwgYnVmZmVyLCBidWZmZXIudXJpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYmluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBVcmkgaXMgbWlzc2luZyBvciB0aGUgYmluYXJ5IGdsVEYgaXMgbWlzc2luZyBpdHMgYmluYXJ5IGNodW5rYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyLl9kYXRhID0gdGhpcy5fYmluLnJlYWRBc3luYygwLCBidWZmZXIuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXIuX2RhdGEudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQgKyBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiAke2UubWVzc2FnZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgYSBnbFRGIGJ1ZmZlciB2aWV3LlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIGJ1ZmZlclZpZXcgVGhlIGdsVEYgYnVmZmVyIHZpZXcgcHJvcGVydHlcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvYWRlZCBkYXRhIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRCdWZmZXJWaWV3QXN5bmMoY29udGV4dDogc3RyaW5nLCBidWZmZXJWaWV3OiBJQnVmZmVyVmlldyk6IFByb21pc2U8QXJyYXlCdWZmZXJWaWV3PiB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uUHJvbWlzZSA9IHRoaXMuX2V4dGVuc2lvbnNMb2FkQnVmZmVyVmlld0FzeW5jKGNvbnRleHQsIGJ1ZmZlclZpZXcpO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGJ1ZmZlclZpZXcuX2RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlclZpZXcuX2RhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBidWZmZXIgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L2J1ZmZlcmAsIHRoaXMuX2dsdGYuYnVmZmVycywgYnVmZmVyVmlldy5idWZmZXIpO1xyXG4gICAgICAgIGJ1ZmZlclZpZXcuX2RhdGEgPSB0aGlzLmxvYWRCdWZmZXJBc3luYyhgL2J1ZmZlcnMvJHtidWZmZXIuaW5kZXh9YCwgYnVmZmVyLCBidWZmZXJWaWV3LmJ5dGVPZmZzZXQgfHwgMCwgYnVmZmVyVmlldy5ieXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlclZpZXcuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZEFjY2Vzc29yQXN5bmMoY29udGV4dDogc3RyaW5nLCBhY2Nlc3NvcjogSUFjY2Vzc29yLCBjb25zdHJ1Y3RvcjogVHlwZWRBcnJheUNvbnN0cnVjdG9yKTogUHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+IHtcclxuICAgICAgICBpZiAoYWNjZXNzb3IuX2RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLl9kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbnVtQ29tcG9uZW50cyA9IEdMVEZMb2FkZXIuX0dldE51bUNvbXBvbmVudHMoY29udGV4dCwgYWNjZXNzb3IudHlwZSk7XHJcbiAgICAgICAgY29uc3QgYnl0ZVN0cmlkZSA9IG51bUNvbXBvbmVudHMgKiBWZXJ0ZXhCdWZmZXIuR2V0VHlwZUJ5dGVMZW5ndGgoYWNjZXNzb3IuY29tcG9uZW50VHlwZSk7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbnVtQ29tcG9uZW50cyAqIGFjY2Vzc29yLmNvdW50O1xyXG5cclxuICAgICAgICBpZiAoYWNjZXNzb3IuYnVmZmVyVmlldyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYWNjZXNzb3IuX2RhdGEgPSBQcm9taXNlLnJlc29sdmUobmV3IGNvbnN0cnVjdG9yKGxlbmd0aCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L2J1ZmZlclZpZXdgLCB0aGlzLl9nbHRmLmJ1ZmZlclZpZXdzLCBhY2Nlc3Nvci5idWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgYWNjZXNzb3IuX2RhdGEgPSB0aGlzLmxvYWRCdWZmZXJWaWV3QXN5bmMoYC9idWZmZXJWaWV3cy8ke2J1ZmZlclZpZXcuaW5kZXh9YCwgYnVmZmVyVmlldykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY2Vzc29yLmNvbXBvbmVudFR5cGUgPT09IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCAmJiAhYWNjZXNzb3Iubm9ybWFsaXplZCAmJiAoIWJ1ZmZlclZpZXcuYnl0ZVN0cmlkZSB8fCBidWZmZXJWaWV3LmJ5dGVTdHJpZGUgPT09IGJ5dGVTdHJpZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdMVEZMb2FkZXIuX0dldFR5cGVkQXJyYXkoY29udGV4dCwgYWNjZXNzb3IuY29tcG9uZW50VHlwZSwgZGF0YSwgYWNjZXNzb3IuYnl0ZU9mZnNldCwgbGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheSA9IG5ldyBjb25zdHJ1Y3RvcihsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlcnRleEJ1ZmZlci5Gb3JFYWNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5ieXRlT2Zmc2V0IHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlclZpZXcuYnl0ZVN0cmlkZSB8fCBieXRlU3RyaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1Db21wb25lbnRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlZEFycmF5Lmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3Iubm9ybWFsaXplZCB8fCBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWRBcnJheVtpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVkQXJyYXk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjY2Vzc29yLnNwYXJzZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzcGFyc2UgPSBhY2Nlc3Nvci5zcGFyc2U7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yLl9kYXRhID0gYWNjZXNzb3IuX2RhdGEudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheSA9IGRhdGEgYXMgVHlwZWRBcnJheUxpa2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzQnVmZmVyVmlldyA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vc3BhcnNlL2luZGljZXMvYnVmZmVyVmlld2AsIHRoaXMuX2dsdGYuYnVmZmVyVmlld3MsIHNwYXJzZS5pbmRpY2VzLmJ1ZmZlclZpZXcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzQnVmZmVyVmlldyA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vc3BhcnNlL3ZhbHVlcy9idWZmZXJWaWV3YCwgdGhpcy5fZ2x0Zi5idWZmZXJWaWV3cywgc3BhcnNlLnZhbHVlcy5idWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQnVmZmVyVmlld0FzeW5jKGAvYnVmZmVyVmlld3MvJHtpbmRpY2VzQnVmZmVyVmlldy5pbmRleH1gLCBpbmRpY2VzQnVmZmVyVmlldyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQnVmZmVyVmlld0FzeW5jKGAvYnVmZmVyVmlld3MvJHt2YWx1ZXNCdWZmZXJWaWV3LmluZGV4fWAsIHZhbHVlc0J1ZmZlclZpZXcpLFxyXG4gICAgICAgICAgICAgICAgXSkudGhlbigoW2luZGljZXNEYXRhLCB2YWx1ZXNEYXRhXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSBHTFRGTG9hZGVyLl9HZXRUeXBlZEFycmF5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtjb250ZXh0fS9zcGFyc2UvaW5kaWNlc2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJzZS5pbmRpY2VzLmNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGljZXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFyc2UuaW5kaWNlcy5ieXRlT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFyc2UuY291bnRcclxuICAgICAgICAgICAgICAgICAgICApIGFzIEluZGljZXNBcnJheTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhcnNlTGVuZ3RoID0gbnVtQ29tcG9uZW50cyAqIHNwYXJzZS5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVzOiBUeXBlZEFycmF5TGlrZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjY2Vzc29yLmNvbXBvbmVudFR5cGUgPT09IEFjY2Vzc29yQ29tcG9uZW50VHlwZS5GTE9BVCAmJiAhYWNjZXNzb3Iubm9ybWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBHTFRGTG9hZGVyLl9HZXRUeXBlZEFycmF5KGAke2NvbnRleHR9L3NwYXJzZS92YWx1ZXNgLCBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLCB2YWx1ZXNEYXRhLCBzcGFyc2UudmFsdWVzLmJ5dGVPZmZzZXQsIHNwYXJzZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhcnNlRGF0YSA9IEdMVEZMb2FkZXIuX0dldFR5cGVkQXJyYXkoYCR7Y29udGV4dH0vc3BhcnNlL3ZhbHVlc2AsIGFjY2Vzc29yLmNvbXBvbmVudFR5cGUsIHZhbHVlc0RhdGEsIHNwYXJzZS52YWx1ZXMuYnl0ZU9mZnNldCwgc3BhcnNlTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gbmV3IGNvbnN0cnVjdG9yKHNwYXJzZUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlcnRleEJ1ZmZlci5Gb3JFYWNoKHNwYXJzZURhdGEsIDAsIGJ5dGVTdHJpZGUsIG51bUNvbXBvbmVudHMsIGFjY2Vzc29yLmNvbXBvbmVudFR5cGUsIHZhbHVlcy5sZW5ndGgsIGFjY2Vzc29yLm5vcm1hbGl6ZWQgfHwgZmFsc2UsICh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVzSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGljZXNJbmRleCA9IDA7IGluZGljZXNJbmRleCA8IGluZGljZXMubGVuZ3RoOyBpbmRpY2VzSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUluZGV4ID0gaW5kaWNlc1tpbmRpY2VzSW5kZXhdICogbnVtQ29tcG9uZW50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50SW5kZXggPSAwOyBjb21wb25lbnRJbmRleCA8IG51bUNvbXBvbmVudHM7IGNvbXBvbmVudEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVkQXJyYXlbZGF0YUluZGV4KytdID0gdmFsdWVzW3ZhbHVlc0luZGV4KytdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZWRBcnJheTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhY2Nlc3Nvci5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRGbG9hdEFjY2Vzc29yQXN5bmMoY29udGV4dDogc3RyaW5nLCBhY2Nlc3NvcjogSUFjY2Vzc29yKTogUHJvbWlzZTxGbG9hdDMyQXJyYXk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEFjY2Vzc29yQXN5bmMoY29udGV4dCwgYWNjZXNzb3IsIEZsb2F0MzJBcnJheSkgYXMgUHJvbWlzZTxGbG9hdDMyQXJyYXk+O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZEluZGljZXNBY2Nlc3NvckFzeW5jKGNvbnRleHQ6IHN0cmluZywgYWNjZXNzb3I6IElBY2Nlc3Nvcik6IFByb21pc2U8SW5kaWNlc0FycmF5PiB7XHJcbiAgICAgICAgaWYgKGFjY2Vzc29yLnR5cGUgIT09IEFjY2Vzc29yVHlwZS5TQ0FMQVIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9L3R5cGU6IEludmFsaWQgdmFsdWUgJHthY2Nlc3Nvci50eXBlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBhY2Nlc3Nvci5jb21wb25lbnRUeXBlICE9PSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfQllURSAmJlxyXG4gICAgICAgICAgICBhY2Nlc3Nvci5jb21wb25lbnRUeXBlICE9PSBBY2Nlc3NvckNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQgJiZcclxuICAgICAgICAgICAgYWNjZXNzb3IuY29tcG9uZW50VHlwZSAhPT0gQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX0lOVFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH0vY29tcG9uZW50VHlwZTogSW52YWxpZCB2YWx1ZSAke2FjY2Vzc29yLmNvbXBvbmVudFR5cGV9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWNjZXNzb3IuX2RhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLl9kYXRhIGFzIFByb21pc2U8SW5kaWNlc0FycmF5PjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY2Nlc3Nvci5zcGFyc2UpIHtcclxuICAgICAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSBHTFRGTG9hZGVyLl9HZXRUeXBlZEFycmF5Q29uc3RydWN0b3IoYCR7Y29udGV4dH0vY29tcG9uZW50VHlwZWAsIGFjY2Vzc29yLmNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5fZGF0YSA9IHRoaXMuX2xvYWRBY2Nlc3NvckFzeW5jKGNvbnRleHQsIGFjY2Vzc29yLCBjb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlldyA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vYnVmZmVyVmlld2AsIHRoaXMuX2dsdGYuYnVmZmVyVmlld3MsIGFjY2Vzc29yLmJ1ZmZlclZpZXcpO1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5fZGF0YSA9IHRoaXMubG9hZEJ1ZmZlclZpZXdBc3luYyhgL2J1ZmZlclZpZXdzLyR7YnVmZmVyVmlldy5pbmRleH1gLCBidWZmZXJWaWV3KS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR0xURkxvYWRlci5fR2V0VHlwZWRBcnJheShjb250ZXh0LCBhY2Nlc3Nvci5jb21wb25lbnRUeXBlLCBkYXRhLCBhY2Nlc3Nvci5ieXRlT2Zmc2V0LCBhY2Nlc3Nvci5jb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjY2Vzc29yLl9kYXRhIGFzIFByb21pc2U8SW5kaWNlc0FycmF5PjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRWZXJ0ZXhCdWZmZXJWaWV3QXN5bmMoYnVmZmVyVmlldzogSUJ1ZmZlclZpZXcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xyXG4gICAgICAgIGlmIChidWZmZXJWaWV3Ll9iYWJ5bG9uQnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmZXJWaWV3Ll9iYWJ5bG9uQnVmZmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW5naW5lID0gdGhpcy5fYmFieWxvblNjZW5lLmdldEVuZ2luZSgpO1xyXG4gICAgICAgIGJ1ZmZlclZpZXcuX2JhYnlsb25CdWZmZXIgPSB0aGlzLmxvYWRCdWZmZXJWaWV3QXN5bmMoYC9idWZmZXJWaWV3cy8ke2J1ZmZlclZpZXcuaW5kZXh9YCwgYnVmZmVyVmlldykudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihlbmdpbmUsIGRhdGEsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlclZpZXcuX2JhYnlsb25CdWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkVmVydGV4QWNjZXNzb3JBc3luYyhjb250ZXh0OiBzdHJpbmcsIGFjY2Vzc29yOiBJQWNjZXNzb3IsIGtpbmQ6IHN0cmluZyk6IFByb21pc2U8VmVydGV4QnVmZmVyPiB7XHJcbiAgICAgICAgaWYgKGFjY2Vzc29yLl9iYWJ5bG9uVmVydGV4QnVmZmVyPy5ba2luZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLl9iYWJ5bG9uVmVydGV4QnVmZmVyW2tpbmRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFhY2Nlc3Nvci5fYmFieWxvblZlcnRleEJ1ZmZlcikge1xyXG4gICAgICAgICAgICBhY2Nlc3Nvci5fYmFieWxvblZlcnRleEJ1ZmZlciA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW5naW5lID0gdGhpcy5fYmFieWxvblNjZW5lLmdldEVuZ2luZSgpO1xyXG5cclxuICAgICAgICBpZiAoYWNjZXNzb3Iuc3BhcnNlIHx8IGFjY2Vzc29yLmJ1ZmZlclZpZXcgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjY2Vzc29yLl9iYWJ5bG9uVmVydGV4QnVmZmVyW2tpbmRdID0gdGhpcy5fbG9hZEZsb2F0QWNjZXNzb3JBc3luYyhjb250ZXh0LCBhY2Nlc3NvcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZXJ0ZXhCdWZmZXIoZW5naW5lLCBkYXRhLCBraW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclZpZXcgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L2J1ZmZlclZpZXdgLCB0aGlzLl9nbHRmLmJ1ZmZlclZpZXdzLCBhY2Nlc3Nvci5idWZmZXJWaWV3KTtcclxuICAgICAgICAgICAgYWNjZXNzb3IuX2JhYnlsb25WZXJ0ZXhCdWZmZXJba2luZF0gPSB0aGlzLl9sb2FkVmVydGV4QnVmZmVyVmlld0FzeW5jKGJ1ZmZlclZpZXcpLnRoZW4oKGJhYnlsb25CdWZmZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bUNvbXBvbmVudHMgPSBHTFRGTG9hZGVyLl9HZXROdW1Db21wb25lbnRzKGNvbnRleHQsIGFjY2Vzc29yLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBWZXJ0ZXhCdWZmZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgZW5naW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25CdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2luZCxcclxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyVmlldy5ieXRlU3RyaWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5ieXRlT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgIG51bUNvbXBvbmVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3IuY29tcG9uZW50VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3Nvci5ub3JtYWxpemVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjY2Vzc29yLl9iYWJ5bG9uVmVydGV4QnVmZmVyW2tpbmRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRNYXRlcmlhbE1ldGFsbGljUm91Z2huZXNzUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJvcGVydGllczogSU1hdGVyaWFsUGJyTWV0YWxsaWNSb3VnaG5lc3MsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yKTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbHBoYSA9IHByb3BlcnRpZXMuYmFzZUNvbG9yRmFjdG9yWzNdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFsYmVkb0NvbG9yID0gQ29sb3IzLldoaXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5tZXRhbGxpYyA9IHByb3BlcnRpZXMubWV0YWxsaWNGYWN0b3IgPT0gdW5kZWZpbmVkID8gMSA6IHByb3BlcnRpZXMubWV0YWxsaWNGYWN0b3I7XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5yb3VnaG5lc3MgPSBwcm9wZXJ0aWVzLnJvdWdobmVzc0ZhY3RvciA9PSB1bmRlZmluZWQgPyAxIDogcHJvcGVydGllcy5yb3VnaG5lc3NGYWN0b3I7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllcy5iYXNlQ29sb3JUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vYmFzZUNvbG9yVGV4dHVyZWAsIHByb3BlcnRpZXMuYmFzZUNvbG9yVGV4dHVyZSwgKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZS5uYW1lID0gYCR7YmFieWxvbk1hdGVyaWFsLm5hbWV9IChCYXNlIENvbG9yKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbGJlZG9UZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLm1ldGFsbGljUm91Z2huZXNzVGV4dHVyZS5ub25Db2xvckRhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L21ldGFsbGljUm91Z2huZXNzVGV4dHVyZWAsIHByb3BlcnRpZXMubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlLm5hbWUgPSBgJHtiYWJ5bG9uTWF0ZXJpYWwubmFtZX0gKE1ldGFsbGljIFJvdWdobmVzcylgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWNUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudXNlTWV0YWxsbmVzc0Zyb21NZXRhbGxpY1RleHR1cmVCbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC51c2VSb3VnaG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlR3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnVzZVJvdWdobmVzc0Zyb21NZXRhbGxpY1RleHR1cmVBbHBoYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZE1hdGVyaWFsQXN5bmMoXHJcbiAgICAgICAgY29udGV4dDogc3RyaW5nLFxyXG4gICAgICAgIG1hdGVyaWFsOiBJTWF0ZXJpYWwsXHJcbiAgICAgICAgYmFieWxvbk1lc2g6IE51bGxhYmxlPE1lc2g+LFxyXG4gICAgICAgIGJhYnlsb25EcmF3TW9kZTogbnVtYmVyLFxyXG4gICAgICAgIGFzc2lnbjogKGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQgPSAoKSA9PiB7fVxyXG4gICAgKTogUHJvbWlzZTxNYXRlcmlhbD4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZE1hdGVyaWFsQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NZXNoLCBiYWJ5bG9uRHJhd01vZGUsIGFzc2lnbik7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXRlcmlhbC5fZGF0YSA9IG1hdGVyaWFsLl9kYXRhIHx8IHt9O1xyXG4gICAgICAgIGxldCBiYWJ5bG9uRGF0YSA9IG1hdGVyaWFsLl9kYXRhW2JhYnlsb25EcmF3TW9kZV07XHJcbiAgICAgICAgaWYgKCFiYWJ5bG9uRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ09wZW4oYCR7Y29udGV4dH0gJHttYXRlcmlhbC5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWF0ZXJpYWwgPSB0aGlzLmNyZWF0ZU1hdGVyaWFsKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUpO1xyXG5cclxuICAgICAgICAgICAgYmFieWxvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWw6IGJhYnlsb25NYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NZXNoZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgcHJvbWlzZTogdGhpcy5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBtYXRlcmlhbC5fZGF0YVtiYWJ5bG9uRHJhd01vZGVdID0gYmFieWxvbkRhdGE7XHJcblxyXG4gICAgICAgICAgICBHTFRGTG9hZGVyLkFkZFBvaW50ZXJNZXRhZGF0YShiYWJ5bG9uTWF0ZXJpYWwsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQub25NYXRlcmlhbExvYWRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGJhYnlsb25NYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ0Nsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmFieWxvbk1lc2gpIHtcclxuICAgICAgICAgICAgYmFieWxvbkRhdGEuYmFieWxvbk1lc2hlcy5wdXNoKGJhYnlsb25NZXNoKTtcclxuXHJcbiAgICAgICAgICAgIGJhYnlsb25NZXNoLm9uRGlzcG9zZU9ic2VydmFibGUuYWRkT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGJhYnlsb25EYXRhLmJhYnlsb25NZXNoZXMuaW5kZXhPZihiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbkRhdGEuYmFieWxvbk1lc2hlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzc2lnbihiYWJ5bG9uRGF0YS5iYWJ5bG9uTWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gYmFieWxvbkRhdGEucHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGJhYnlsb25EYXRhLmJhYnlsb25NYXRlcmlhbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVEZWZhdWx0TWF0ZXJpYWwobmFtZTogc3RyaW5nLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlcik6IE1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhdGhpcy5fYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgY29uc3QgYmFieWxvbk1hdGVyaWFsID0gbmV3IFBCUk1hdGVyaWFsKG5hbWUsIHRoaXMuX2JhYnlsb25TY2VuZSk7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLl9wYXJlbnRDb250YWluZXIgPSB0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLl9iYWJ5bG9uU2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIC8vIE1vdmVkIHRvIG1lc2ggc28gdXNlciBjYW4gY2hhbmdlIG1hdGVyaWFscyBvbiBnbHRmIG1lc2hlczogYmFieWxvbk1hdGVyaWFsLnNpZGVPcmllbnRhdGlvbiA9IHRoaXMuX2JhYnlsb25TY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA/IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb24gOiBNYXRlcmlhbC5DbG9ja1dpc2VTaWRlT3JpZW50YXRpb247XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLmZpbGxNb2RlID0gYmFieWxvbkRyYXdNb2RlO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5lbmFibGVTcGVjdWxhckFudGlBbGlhc2luZyA9IHRydWU7XHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLnVzZVJhZGlhbmNlT3ZlckFscGhhID0gIXRoaXMuX3BhcmVudC50cmFuc3BhcmVuY3lBc0NvdmVyYWdlO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC51c2VTcGVjdWxhck92ZXJBbHBoYSA9ICF0aGlzLl9wYXJlbnQudHJhbnNwYXJlbmN5QXNDb3ZlcmFnZTtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudHJhbnNwYXJlbmN5TW9kZSA9IFBCUk1hdGVyaWFsLlBCUk1BVEVSSUFMX09QQVFVRTtcclxuICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwubWV0YWxsaWMgPSAxO1xyXG4gICAgICAgIGJhYnlsb25NYXRlcmlhbC5yb3VnaG5lc3MgPSAxO1xyXG4gICAgICAgIHJldHVybiBiYWJ5bG9uTWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQmFieWxvbiBtYXRlcmlhbCBmcm9tIGEgZ2xURiBtYXRlcmlhbC5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBUaGUgZ2xURiBtYXRlcmlhbCBwcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25EcmF3TW9kZSBUaGUgZHJhdyBtb2RlIGZvciB0aGUgQmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgVGhlIEJhYnlsb24gbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZU1hdGVyaWFsKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIpOiBNYXRlcmlhbCB7XHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uUHJvbWlzZSA9IHRoaXMuX2V4dGVuc2lvbnNDcmVhdGVNYXRlcmlhbChjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbkRyYXdNb2RlKTtcclxuICAgICAgICBpZiAoZXh0ZW5zaW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBtYXRlcmlhbC5uYW1lIHx8IGBtYXRlcmlhbCR7bWF0ZXJpYWwuaW5kZXh9YDtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uTWF0ZXJpYWwgPSB0aGlzLl9jcmVhdGVEZWZhdWx0TWF0ZXJpYWwobmFtZSwgYmFieWxvbkRyYXdNb2RlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhYnlsb25NYXRlcmlhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHByb3BlcnRpZXMgZnJvbSBhIGdsVEYgbWF0ZXJpYWwgaW50byBhIEJhYnlsb24gbWF0ZXJpYWwuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gbWF0ZXJpYWwgVGhlIGdsVEYgbWF0ZXJpYWwgcHJvcGVydHlcclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uTWF0ZXJpYWwgVGhlIEJhYnlsb24gbWF0ZXJpYWxcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb25Qcm9taXNlID0gdGhpcy5fZXh0ZW5zaW9uc0xvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKTtcclxuICAgICAgICBpZiAoZXh0ZW5zaW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRNYXRlcmlhbEJhc2VQcm9wZXJ0aWVzQXN5bmMoY29udGV4dCwgbWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbCkpO1xyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWwucGJyTWV0YWxsaWNSb3VnaG5lc3MpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9sb2FkTWF0ZXJpYWxNZXRhbGxpY1JvdWdobmVzc1Byb3BlcnRpZXNBc3luYyhgJHtjb250ZXh0fS9wYnJNZXRhbGxpY1JvdWdobmVzc2AsIG1hdGVyaWFsLnBick1ldGFsbGljUm91Z2huZXNzLCBiYWJ5bG9uTWF0ZXJpYWwpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9hZE1hdGVyaWFsQWxwaGFQcm9wZXJ0aWVzKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIG5vcm1hbCwgb2NjbHVzaW9uLCBhbmQgZW1pc3NpdmUgcHJvcGVydGllcyBmcm9tIGEgZ2xURiBtYXRlcmlhbCBpbnRvIGEgQmFieWxvbiBtYXRlcmlhbC5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbCBUaGUgZ2xURiBtYXRlcmlhbCBwcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIGJhYnlsb25NYXRlcmlhbCBUaGUgQmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbG9hZCBpcyBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1hdGVyaWFsQmFzZVByb3BlcnRpZXNBc3luYyhjb250ZXh0OiBzdHJpbmcsIG1hdGVyaWFsOiBJTWF0ZXJpYWwsIGJhYnlsb25NYXRlcmlhbDogTWF0ZXJpYWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIShiYWJ5bG9uTWF0ZXJpYWwgaW5zdGFuY2VvZiBQQlJNYXRlcmlhbCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBNYXRlcmlhbCB0eXBlIG5vdCBzdXBwb3J0ZWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8YW55Pj4oKTtcclxuXHJcbiAgICAgICAgYmFieWxvbk1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBtYXRlcmlhbC5lbWlzc2l2ZUZhY3RvciA/IENvbG9yMy5Gcm9tQXJyYXkobWF0ZXJpYWwuZW1pc3NpdmVGYWN0b3IpIDogbmV3IENvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICBpZiAobWF0ZXJpYWwuZG91YmxlU2lkZWQpIHtcclxuICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudHdvU2lkZWRMaWdodGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWwubm9ybWFsVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5ub3JtYWxUZXh0dXJlLm5vbkNvbG9yRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L25vcm1hbFRleHR1cmVgLCBtYXRlcmlhbC5ub3JtYWxUZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoTm9ybWFsKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmJ1bXBUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuaW52ZXJ0Tm9ybWFsTWFwWCA9ICF0aGlzLl9iYWJ5bG9uU2NlbmUudXNlUmlnaHRIYW5kZWRTeXN0ZW07XHJcbiAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5pbnZlcnROb3JtYWxNYXBZID0gdGhpcy5fYmFieWxvblNjZW5lLnVzZVJpZ2h0SGFuZGVkU3lzdGVtO1xyXG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwubm9ybWFsVGV4dHVyZS5zY2FsZSAhPSB1bmRlZmluZWQgJiYgYmFieWxvbk1hdGVyaWFsLmJ1bXBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYnVtcFRleHR1cmUubGV2ZWwgPSBtYXRlcmlhbC5ub3JtYWxUZXh0dXJlLnNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuZm9yY2VJcnJhZGlhbmNlSW5GcmFnbWVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWwub2NjbHVzaW9uVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5vY2NsdXNpb25UZXh0dXJlLm5vbkNvbG9yRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGAke2NvbnRleHR9L29jY2x1c2lvblRleHR1cmVgLCBtYXRlcmlhbC5vY2NsdXNpb25UZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoT2NjbHVzaW9uKWA7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLmFtYmllbnRUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudXNlQW1iaWVudEluR3JheVNjYWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLm9jY2x1c2lvblRleHR1cmUuc3RyZW5ndGggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYW1iaWVudFRleHR1cmVTdHJlbmd0aCA9IG1hdGVyaWFsLm9jY2x1c2lvblRleHR1cmUuc3RyZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYXRlcmlhbC5lbWlzc2l2ZVRleHR1cmUpIHtcclxuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFRleHR1cmVJbmZvQXN5bmMoYCR7Y29udGV4dH0vZW1pc3NpdmVUZXh0dXJlYCwgbWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlLCAodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUubmFtZSA9IGAke2JhYnlsb25NYXRlcmlhbC5uYW1lfSAoRW1pc3NpdmUpYDtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuZW1pc3NpdmVUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIGFscGhhIHByb3BlcnRpZXMgZnJvbSBhIGdsVEYgbWF0ZXJpYWwgaW50byBhIEJhYnlsb24gbWF0ZXJpYWwuXHJcbiAgICAgKiBNdXN0IGJlIGNhbGxlZCBhZnRlciB0aGUgc2V0dGluZyB0aGUgYWxiZWRvIHRleHR1cmUgb2YgdGhlIEJhYnlsb24gbWF0ZXJpYWwgd2hlbiB0aGUgbWF0ZXJpYWwgaGFzIGFuIGFsYmVkbyB0ZXh0dXJlLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIG1hdGVyaWFsIFRoZSBnbFRGIG1hdGVyaWFsIHByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1hdGVyaWFsIFRoZSBCYWJ5bG9uIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTWF0ZXJpYWxBbHBoYVByb3BlcnRpZXMoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uTWF0ZXJpYWw6IE1hdGVyaWFsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCEoYmFieWxvbk1hdGVyaWFsIGluc3RhbmNlb2YgUEJSTWF0ZXJpYWwpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogTWF0ZXJpYWwgdHlwZSBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbHBoYU1vZGUgPSBtYXRlcmlhbC5hbHBoYU1vZGUgfHwgTWF0ZXJpYWxBbHBoYU1vZGUuT1BBUVVFO1xyXG4gICAgICAgIHN3aXRjaCAoYWxwaGFNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWxBbHBoYU1vZGUuT1BBUVVFOiB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudHJhbnNwYXJlbmN5TW9kZSA9IFBCUk1hdGVyaWFsLlBCUk1BVEVSSUFMX09QQVFVRTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWxBbHBoYU1vZGUuTUFTSzoge1xyXG4gICAgICAgICAgICAgICAgYmFieWxvbk1hdGVyaWFsLnRyYW5zcGFyZW5jeU1vZGUgPSBQQlJNYXRlcmlhbC5QQlJNQVRFUklBTF9BTFBIQVRFU1Q7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwuYWxwaGFDdXRPZmYgPSBtYXRlcmlhbC5hbHBoYUN1dG9mZiA9PSB1bmRlZmluZWQgPyAwLjUgOiBtYXRlcmlhbC5hbHBoYUN1dG9mZjtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbGJlZG9UZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgTWF0ZXJpYWxBbHBoYU1vZGUuQkxFTkQ6IHtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC50cmFuc3BhcmVuY3lNb2RlID0gUEJSTWF0ZXJpYWwuUEJSTUFURVJJQUxfQUxQSEFCTEVORDtcclxuICAgICAgICAgICAgICAgIGlmIChiYWJ5bG9uTWF0ZXJpYWwuYWxiZWRvVGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhYnlsb25NYXRlcmlhbC5hbGJlZG9UZXh0dXJlLmhhc0FscGhhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWF0ZXJpYWwudXNlQWxwaGFGcm9tQWxiZWRvVGV4dHVyZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH0vYWxwaGFNb2RlOiBJbnZhbGlkIHZhbHVlICgke21hdGVyaWFsLmFscGhhTW9kZX0pYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIGdsVEYgdGV4dHVyZSBpbmZvLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgd2hlbiBsb2FkaW5nIHRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIHRleHR1cmVJbmZvIFRoZSBnbFRGIHRleHR1cmUgaW5mbyBwcm9wZXJ0eVxyXG4gICAgICogQHBhcmFtIGFzc2lnbiBBIGZ1bmN0aW9uIGNhbGxlZCBzeW5jaHJvbm91c2x5IGFmdGVyIHBhcnNpbmcgdGhlIGdsVEYgcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbG9hZGVkIEJhYnlsb24gdGV4dHVyZSB3aGVuIHRoZSBsb2FkIGlzIGNvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkVGV4dHVyZUluZm9Bc3luYyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmVJbmZvOiBJVGV4dHVyZUluZm8sIGFzc2lnbjogKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCA9ICgpID0+IHt9KTogUHJvbWlzZTxCYXNlVGV4dHVyZT4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZFRleHR1cmVJbmZvQXN5bmMoY29udGV4dCwgdGV4dHVyZUluZm8sIGFzc2lnbik7XHJcbiAgICAgICAgaWYgKGV4dGVuc2lvblByb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuc2lvblByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvZ09wZW4oYCR7Y29udGV4dH1gKTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmVJbmZvLnRleENvb3JkISA+PSA2KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fS90ZXhDb29yZDogSW52YWxpZCB2YWx1ZSAoJHt0ZXh0dXJlSW5mby50ZXhDb29yZH0pYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0ZXh0dXJlID0gQXJyYXlJdGVtLkdldChgJHtjb250ZXh0fS9pbmRleGAsIHRoaXMuX2dsdGYudGV4dHVyZXMsIHRleHR1cmVJbmZvLmluZGV4KTtcclxuICAgICAgICB0ZXh0dXJlLl90ZXh0dXJlSW5mbyA9IHRleHR1cmVJbmZvO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fbG9hZFRleHR1cmVBc3luYyhgL3RleHR1cmVzLyR7dGV4dHVyZUluZm8uaW5kZXh9YCwgdGV4dHVyZSwgKGJhYnlsb25UZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGJhYnlsb25UZXh0dXJlLmNvb3JkaW5hdGVzSW5kZXggPSB0ZXh0dXJlSW5mby50ZXhDb29yZCB8fCAwO1xyXG4gICAgICAgICAgICBHTFRGTG9hZGVyLkFkZFBvaW50ZXJNZXRhZGF0YShiYWJ5bG9uVGV4dHVyZSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5vblRleHR1cmVMb2FkZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhiYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgICAgIGFzc2lnbihiYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubG9nQ2xvc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2FkVGV4dHVyZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgdGV4dHVyZTogSVRleHR1cmUsIGFzc2lnbjogKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCA9ICgpID0+IHt9KTogUHJvbWlzZTxCYXNlVGV4dHVyZT4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblByb21pc2UgPSB0aGlzLl9leHRlbnNpb25zTG9hZFRleHR1cmVBc3luYyhjb250ZXh0LCB0ZXh0dXJlLCBhc3NpZ24pO1xyXG4gICAgICAgIGlmIChleHRlbnNpb25Qcm9taXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleHRlbnNpb25Qcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2dPcGVuKGAke2NvbnRleHR9ICR7dGV4dHVyZS5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNhbXBsZXIgPSB0ZXh0dXJlLnNhbXBsZXIgPT0gdW5kZWZpbmVkID8gR0xURkxvYWRlci5EZWZhdWx0U2FtcGxlciA6IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vc2FtcGxlcmAsIHRoaXMuX2dsdGYuc2FtcGxlcnMsIHRleHR1cmUuc2FtcGxlcik7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBBcnJheUl0ZW0uR2V0KGAke2NvbnRleHR9L3NvdXJjZWAsIHRoaXMuX2dsdGYuaW1hZ2VzLCB0ZXh0dXJlLnNvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX2NyZWF0ZVRleHR1cmVBc3luYyhjb250ZXh0LCBzYW1wbGVyLCBpbWFnZSwgYXNzaWduLCB1bmRlZmluZWQsICF0ZXh0dXJlLl90ZXh0dXJlSW5mby5ub25Db2xvckRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ0Nsb3NlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY3JlYXRlVGV4dHVyZUFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBzYW1wbGVyOiBJU2FtcGxlcixcclxuICAgICAgICBpbWFnZTogSUltYWdlLFxyXG4gICAgICAgIGFzc2lnbjogKGJhYnlsb25UZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCA9ICgpID0+IHt9LFxyXG4gICAgICAgIHRleHR1cmVMb2FkZXJPcHRpb25zPzogYW55LFxyXG4gICAgICAgIHVzZVNSR0JCdWZmZXI/OiBib29sZWFuXHJcbiAgICApOiBQcm9taXNlPEJhc2VUZXh0dXJlPiB7XHJcbiAgICAgICAgY29uc3Qgc2FtcGxlckRhdGEgPSB0aGlzLl9sb2FkU2FtcGxlcihgL3NhbXBsZXJzLyR7c2FtcGxlci5pbmRleH1gLCBzYW1wbGVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZDx2b2lkPigpO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISF0aGlzLl9hc3NldENvbnRhaW5lcjtcclxuICAgICAgICBjb25zdCB0ZXh0dXJlQ3JlYXRpb25PcHRpb25zOiBJVGV4dHVyZUNyZWF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbm9NaXBtYXA6IHNhbXBsZXJEYXRhLm5vTWlwTWFwcyxcclxuICAgICAgICAgICAgaW52ZXJ0WTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhbXBsaW5nTW9kZTogc2FtcGxlckRhdGEuc2FtcGxpbmdNb2RlLFxyXG4gICAgICAgICAgICBvbkxvYWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXJyb3I6IChtZXNzYWdlPzogc3RyaW5nLCBleGNlcHRpb24/OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZGlzcG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKGAke2NvbnRleHR9OiAke2V4Y2VwdGlvbiAmJiBleGNlcHRpb24ubWVzc2FnZSA/IGV4Y2VwdGlvbi5tZXNzYWdlIDogbWVzc2FnZSB8fCBcIkZhaWxlZCB0byBsb2FkIHRleHR1cmVcIn1gKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1pbWVUeXBlOiBpbWFnZS5taW1lVHlwZSxcclxuICAgICAgICAgICAgbG9hZGVyT3B0aW9uczogdGV4dHVyZUxvYWRlck9wdGlvbnMsXHJcbiAgICAgICAgICAgIHVzZVNSR0JCdWZmZXI6ICEhdXNlU1JHQkJ1ZmZlciAmJiB0aGlzLl9wYXJlbnQudXNlU1JHQkJ1ZmZlcnMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uVGV4dHVyZSA9IG5ldyBUZXh0dXJlKG51bGwsIHRoaXMuX2JhYnlsb25TY2VuZSwgdGV4dHVyZUNyZWF0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgYmFieWxvblRleHR1cmUuX3BhcmVudENvbnRhaW5lciA9IHRoaXMuX2Fzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25TY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChkZWZlcnJlZC5wcm9taXNlKTtcclxuXHJcbiAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2VBc3luYyhgL2ltYWdlcy8ke2ltYWdlLmluZGV4fWAsIGltYWdlKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaW1hZ2UudXJpIHx8IGAke3RoaXMuX2ZpbGVOYW1lfSNpbWFnZSR7aW1hZ2UuaW5kZXh9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBgZGF0YToke3RoaXMuX3VuaXF1ZVJvb3RVcmx9JHtuYW1lfWA7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uVGV4dHVyZS51cGRhdGVVUkwoZGF0YVVybCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYmFieWxvblRleHR1cmUud3JhcFUgPSBzYW1wbGVyRGF0YS53cmFwVTtcclxuICAgICAgICBiYWJ5bG9uVGV4dHVyZS53cmFwViA9IHNhbXBsZXJEYXRhLndyYXBWO1xyXG4gICAgICAgIGFzc2lnbihiYWJ5bG9uVGV4dHVyZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYWJ5bG9uVGV4dHVyZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkU2FtcGxlcihjb250ZXh0OiBzdHJpbmcsIHNhbXBsZXI6IElTYW1wbGVyKTogX0lTYW1wbGVyRGF0YSB7XHJcbiAgICAgICAgaWYgKCFzYW1wbGVyLl9kYXRhKSB7XHJcbiAgICAgICAgICAgIHNhbXBsZXIuX2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBub01pcE1hcHM6IHNhbXBsZXIubWluRmlsdGVyID09PSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1QgfHwgc2FtcGxlci5taW5GaWx0ZXIgPT09IFRleHR1cmVNaW5GaWx0ZXIuTElORUFSLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxpbmdNb2RlOiBHTFRGTG9hZGVyLl9HZXRUZXh0dXJlU2FtcGxpbmdNb2RlKGNvbnRleHQsIHNhbXBsZXIpLFxyXG4gICAgICAgICAgICAgICAgd3JhcFU6IEdMVEZMb2FkZXIuX0dldFRleHR1cmVXcmFwTW9kZShgJHtjb250ZXh0fS93cmFwU2AsIHNhbXBsZXIud3JhcFMpLFxyXG4gICAgICAgICAgICAgICAgd3JhcFY6IEdMVEZMb2FkZXIuX0dldFRleHR1cmVXcmFwTW9kZShgJHtjb250ZXh0fS93cmFwVGAsIHNhbXBsZXIud3JhcFQpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhbXBsZXIuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkcyBhIGdsVEYgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gaW1hZ2UgVGhlIGdsVEYgaW1hZ2UgcHJvcGVydHlcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvYWRlZCBkYXRhIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRJbWFnZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgaW1hZ2U6IElJbWFnZSk6IFByb21pc2U8QXJyYXlCdWZmZXJWaWV3PiB7XHJcbiAgICAgICAgaWYgKCFpbWFnZS5fZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ09wZW4oYCR7Y29udGV4dH0gJHtpbWFnZS5uYW1lIHx8IFwiXCJ9YCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW1hZ2UudXJpKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5fZGF0YSA9IHRoaXMubG9hZFVyaUFzeW5jKGAke2NvbnRleHR9L3VyaWAsIGltYWdlLCBpbWFnZS51cmkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVmZmVyVmlldyA9IEFycmF5SXRlbS5HZXQoYCR7Y29udGV4dH0vYnVmZmVyVmlld2AsIHRoaXMuX2dsdGYuYnVmZmVyVmlld3MsIGltYWdlLmJ1ZmZlclZpZXcpO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuX2RhdGEgPSB0aGlzLmxvYWRCdWZmZXJWaWV3QXN5bmMoYC9idWZmZXJWaWV3cy8ke2J1ZmZlclZpZXcuaW5kZXh9YCwgYnVmZmVyVmlldyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9nQ2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbWFnZS5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGEgZ2xURiB1cmkuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgVGhlIGdsVEYgcHJvcGVydHkgYXNzb2NpYXRlZCB3aXRoIHRoZSB1cmlcclxuICAgICAqIEBwYXJhbSB1cmkgVGhlIGJhc2U2NCBvciByZWxhdGl2ZSB1cmlcclxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGxvYWRlZCBkYXRhIHdoZW4gdGhlIGxvYWQgaXMgY29tcGxldGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRVcmlBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByb3BlcnR5OiBJUHJvcGVydHksIHVyaTogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+IHtcclxuICAgICAgICBjb25zdCBleHRlbnNpb25Qcm9taXNlID0gdGhpcy5fZXh0ZW5zaW9uc0xvYWRVcmlBc3luYyhjb250ZXh0LCBwcm9wZXJ0eSwgdXJpKTtcclxuICAgICAgICBpZiAoZXh0ZW5zaW9uUHJvbWlzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5zaW9uUHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghR0xURkxvYWRlci5fVmFsaWRhdGVVcmkodXJpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Y29udGV4dH06ICcke3VyaX0nIGlzIGludmFsaWRgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChJc0Jhc2U2NERhdGFVcmwodXJpKSkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoRGVjb2RlQmFzZTY0VXJsVG9CaW5hcnkodXJpKSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKGAke2NvbnRleHR9OiBEZWNvZGVkICR7dXJpLnN1YnN0cigwLCA2NCl9Li4uICgke2RhdGEubGVuZ3RofSBieXRlcylgKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9nKGAke2NvbnRleHR9OiBMb2FkaW5nICR7dXJpfWApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50LnByZXByb2Nlc3NVcmxBc3luYyh0aGlzLl9yb290VXJsICsgdXJpKS50aGVuKCh1cmwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fbG9hZEZpbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFieWxvblNjZW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc3Bvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhgJHtjb250ZXh0fTogTG9hZGVkICR7dXJpfSAoJHsoZGF0YSBhcyBBcnJheUJ1ZmZlcikuYnl0ZUxlbmd0aH0gYnl0ZXMpYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBVaW50OEFycmF5KGRhdGEgYXMgQXJyYXlCdWZmZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAocmVxdWVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IExvYWRGaWxlRXJyb3IoYCR7Y29udGV4dH06IEZhaWxlZCB0byBsb2FkICcke3VyaX0nJHtyZXF1ZXN0ID8gXCI6IFwiICsgcmVxdWVzdC5zdGF0dXMgKyBcIiBcIiArIHJlcXVlc3Quc3RhdHVzVGV4dCA6IFwiXCJ9YCwgcmVxdWVzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIEpTT04gcG9pbnRlciB0byB0aGUgX2ludGVybmFsTWV0YWRhdGEgb2YgdGhlIEJhYnlsb24gb2JqZWN0IGF0IGA8b2JqZWN0Pi5faW50ZXJuYWxNZXRhZGF0YS5nbHRmLnBvaW50ZXJzYC5cclxuICAgICAqIEBwYXJhbSBiYWJ5bG9uT2JqZWN0IHRoZSBCYWJ5bG9uIG9iamVjdCB3aXRoIF9pbnRlcm5hbE1ldGFkYXRhXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRlciB0aGUgSlNPTiBwb2ludGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQWRkUG9pbnRlck1ldGFkYXRhKGJhYnlsb25PYmplY3Q6IElXaXRoTWV0YWRhdGEsIHBvaW50ZXI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGJhYnlsb25PYmplY3QubWV0YWRhdGEgPSBiYWJ5bG9uT2JqZWN0Lm1ldGFkYXRhIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gKGJhYnlsb25PYmplY3QuX2ludGVybmFsTWV0YWRhdGEgPSBiYWJ5bG9uT2JqZWN0Ll9pbnRlcm5hbE1ldGFkYXRhIHx8IHt9KTtcclxuICAgICAgICBjb25zdCBnbHRmID0gKG1ldGFkYXRhLmdsdGYgPSBtZXRhZGF0YS5nbHRmIHx8IHt9KTtcclxuICAgICAgICBjb25zdCBwb2ludGVycyA9IChnbHRmLnBvaW50ZXJzID0gZ2x0Zi5wb2ludGVycyB8fCBbXSk7XHJcbiAgICAgICAgcG9pbnRlcnMucHVzaChwb2ludGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0VGV4dHVyZVdyYXBNb2RlKGNvbnRleHQ6IHN0cmluZywgbW9kZTogVGV4dHVyZVdyYXBNb2RlIHwgdW5kZWZpbmVkKTogbnVtYmVyIHtcclxuICAgICAgICAvLyBTZXQgZGVmYXVsdHMgaWYgdW5kZWZpbmVkXHJcbiAgICAgICAgbW9kZSA9IG1vZGUgPT0gdW5kZWZpbmVkID8gVGV4dHVyZVdyYXBNb2RlLlJFUEVBVCA6IG1vZGU7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRleHR1cmVXcmFwTW9kZS5DTEFNUF9UT19FREdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuQ0xBTVBfQUREUkVTU01PREU7XHJcbiAgICAgICAgICAgIGNhc2UgVGV4dHVyZVdyYXBNb2RlLk1JUlJPUkVEX1JFUEVBVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgY2FzZSBUZXh0dXJlV3JhcE1vZGUuUkVQRUFUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuV1JBUF9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKGAke2NvbnRleHR9OiBJbnZhbGlkIHZhbHVlICgke21vZGV9KWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuV1JBUF9BRERSRVNTTU9ERTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0dldFRleHR1cmVTYW1wbGluZ01vZGUoY29udGV4dDogc3RyaW5nLCBzYW1wbGVyOiBJU2FtcGxlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8gU2V0IGRlZmF1bHRzIGlmIHVuZGVmaW5lZFxyXG4gICAgICAgIGNvbnN0IG1hZ0ZpbHRlciA9IHNhbXBsZXIubWFnRmlsdGVyID09IHVuZGVmaW5lZCA/IFRleHR1cmVNYWdGaWx0ZXIuTElORUFSIDogc2FtcGxlci5tYWdGaWx0ZXI7XHJcbiAgICAgICAgY29uc3QgbWluRmlsdGVyID0gc2FtcGxlci5taW5GaWx0ZXIgPT0gdW5kZWZpbmVkID8gVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX0xJTkVBUiA6IHNhbXBsZXIubWluRmlsdGVyO1xyXG5cclxuICAgICAgICBpZiAobWFnRmlsdGVyID09PSBUZXh0dXJlTWFnRmlsdGVyLkxJTkVBUikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1pbkZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuTElORUFSX05FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVNaW5GaWx0ZXIuTElORUFSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlLkxJTkVBUl9MSU5FQVI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVF9NSVBNQVBfTkVBUkVTVDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5MSU5FQVJfTkVBUkVTVF9NSVBORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUl9NSVBNQVBfTkVBUkVTVDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5MSU5FQVJfTElORUFSX01JUE5FQVJFU1Q7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRleHR1cmVNaW5GaWx0ZXIuTkVBUkVTVF9NSVBNQVBfTElORUFSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlLkxJTkVBUl9ORUFSRVNUX01JUExJTkVBUjtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZU1pbkZpbHRlci5MSU5FQVJfTUlQTUFQX0xJTkVBUjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5MSU5FQVJfTElORUFSX01JUExJTkVBUjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH0vbWluRmlsdGVyOiBJbnZhbGlkIHZhbHVlICgke21pbkZpbHRlcn0pYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuTElORUFSX0xJTkVBUl9NSVBMSU5FQVI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobWFnRmlsdGVyICE9PSBUZXh0dXJlTWFnRmlsdGVyLk5FQVJFU1QpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuKGAke2NvbnRleHR9L21hZ0ZpbHRlcjogSW52YWxpZCB2YWx1ZSAoJHttYWdGaWx0ZXJ9KWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKG1pbkZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuTkVBUkVTVF9ORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5ORUFSRVNUX0xJTkVBUjtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dHVyZU1pbkZpbHRlci5ORUFSRVNUX01JUE1BUF9ORUFSRVNUOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlLk5FQVJFU1RfTkVBUkVTVF9NSVBORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUl9NSVBNQVBfTkVBUkVTVDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5ORUFSRVNUX0xJTkVBUl9NSVBORUFSRVNUO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLk5FQVJFU1RfTUlQTUFQX0xJTkVBUjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5ORUFSRVNUX05FQVJFU1RfTUlQTElORUFSO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0dXJlTWluRmlsdGVyLkxJTkVBUl9NSVBNQVBfTElORUFSOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUZXh0dXJlLk5FQVJFU1RfTElORUFSX01JUExJTkVBUjtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oYCR7Y29udGV4dH0vbWluRmlsdGVyOiBJbnZhbGlkIHZhbHVlICgke21pbkZpbHRlcn0pYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuTkVBUkVTVF9ORUFSRVNUX01JUE5FQVJFU1Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0dldFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcihjb250ZXh0OiBzdHJpbmcsIGNvbXBvbmVudFR5cGU6IEFjY2Vzc29yQ29tcG9uZW50VHlwZSk6IFR5cGVkQXJyYXlDb25zdHJ1Y3RvciB7XHJcbiAgICAgICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLkJZVEU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50OEFycmF5O1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5VTlNJR05FRF9CWVRFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXk7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlNIT1JUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludDE2QXJyYXk7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLlVOU0lHTkVEX1NIT1JUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFVpbnQxNkFycmF5O1xyXG4gICAgICAgICAgICBjYXNlIEFjY2Vzc29yQ29tcG9uZW50VHlwZS5VTlNJR05FRF9JTlQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVWludDMyQXJyYXk7XHJcbiAgICAgICAgICAgIGNhc2UgQWNjZXNzb3JDb21wb25lbnRUeXBlLkZMT0FUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogSW52YWxpZCBjb21wb25lbnQgdHlwZSAke2NvbXBvbmVudFR5cGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9HZXRUeXBlZEFycmF5KFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBjb21wb25lbnRUeXBlOiBBY2Nlc3NvckNvbXBvbmVudFR5cGUsXHJcbiAgICAgICAgYnVmZmVyVmlldzogQXJyYXlCdWZmZXJWaWV3LFxyXG4gICAgICAgIGJ5dGVPZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcclxuICAgICAgICBsZW5ndGg6IG51bWJlclxyXG4gICAgKTogVHlwZWRBcnJheUxpa2Uge1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlclZpZXcuYnVmZmVyO1xyXG4gICAgICAgIGJ5dGVPZmZzZXQgPSBidWZmZXJWaWV3LmJ5dGVPZmZzZXQgKyAoYnl0ZU9mZnNldCB8fCAwKTtcclxuXHJcbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSBHTFRGTG9hZGVyLl9HZXRUeXBlZEFycmF5Q29uc3RydWN0b3IoYCR7Y29udGV4dH0vY29tcG9uZW50VHlwZWAsIGNvbXBvbmVudFR5cGUpO1xyXG5cclxuICAgICAgICBjb25zdCBjb21wb25lbnRUeXBlTGVuZ3RoID0gVmVydGV4QnVmZmVyLkdldFR5cGVCeXRlTGVuZ3RoKGNvbXBvbmVudFR5cGUpO1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0ICUgY29tcG9uZW50VHlwZUxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBIQUNLOiBDb3B5IHRoZSBidWZmZXIgaWYgYnl0ZSBvZmZzZXQgaXMgbm90IGEgbXVsdGlwbGUgb2YgY29tcG9uZW50IHR5cGUgYnl0ZSBsZW5ndGguXHJcbiAgICAgICAgICAgIExvZ2dlci5XYXJuKGAke2NvbnRleHR9OiBDb3B5aW5nIGJ1ZmZlciBhcyBieXRlIG9mZnNldCAoJHtieXRlT2Zmc2V0fSkgaXMgbm90IGEgbXVsdGlwbGUgb2YgY29tcG9uZW50IHR5cGUgYnl0ZSBsZW5ndGggKCR7Y29tcG9uZW50VHlwZUxlbmd0aH0pYCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoYnVmZmVyLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGggKiBjb21wb25lbnRUeXBlTGVuZ3RoKSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKGJ1ZmZlciwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfR2V0TnVtQ29tcG9uZW50cyhjb250ZXh0OiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJTQ0FMQVJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICBjYXNlIFwiVkVDMlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJWRUMzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgY2FzZSBcIlZFQzRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgICAgICBjYXNlIFwiTUFUMlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNQVQzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOTtcclxuICAgICAgICAgICAgY2FzZSBcIk1BVDRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAxNjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtjb250ZXh0fTogSW52YWxpZCB0eXBlICgke3R5cGV9KWApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9WYWxpZGF0ZVVyaSh1cmk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBUb29scy5Jc0Jhc2U2NCh1cmkpIHx8IHVyaS5pbmRleE9mKFwiLi5cIikgPT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0dldERyYXdNb2RlKGNvbnRleHQ6IHN0cmluZywgbW9kZTogbnVtYmVyIHwgdW5kZWZpbmVkKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAobW9kZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbW9kZSA9IE1lc2hQcmltaXRpdmVNb2RlLlRSSUFOR0xFUztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1lc2hQcmltaXRpdmVNb2RlLlBPSU5UUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRlcmlhbC5Qb2ludExpc3REcmF3TW9kZTtcclxuICAgICAgICAgICAgY2FzZSBNZXNoUHJpbWl0aXZlTW9kZS5MSU5FUzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRlcmlhbC5MaW5lTGlzdERyYXdNb2RlO1xyXG4gICAgICAgICAgICBjYXNlIE1lc2hQcmltaXRpdmVNb2RlLkxJTkVfTE9PUDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRlcmlhbC5MaW5lTG9vcERyYXdNb2RlO1xyXG4gICAgICAgICAgICBjYXNlIE1lc2hQcmltaXRpdmVNb2RlLkxJTkVfU1RSSVA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0ZXJpYWwuTGluZVN0cmlwRHJhd01vZGU7XHJcbiAgICAgICAgICAgIGNhc2UgTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVTOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGVyaWFsLlRyaWFuZ2xlRmlsbE1vZGU7XHJcbiAgICAgICAgICAgIGNhc2UgTWVzaFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfU1RSSVA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0ZXJpYWwuVHJpYW5nbGVTdHJpcERyYXdNb2RlO1xyXG4gICAgICAgICAgICBjYXNlIE1lc2hQcmltaXRpdmVNb2RlLlRSSUFOR0xFX0ZBTjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRlcmlhbC5UcmlhbmdsZUZhbkRyYXdNb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2NvbnRleHR9OiBJbnZhbGlkIG1lc2ggcHJpbWl0aXZlIG1vZGUgKCR7bW9kZX0pYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcGlsZU1hdGVyaWFsc0FzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJDb21waWxlIG1hdGVyaWFsc1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZ2x0Zi5tYXRlcmlhbHMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtYXRlcmlhbCBvZiB0aGlzLl9nbHRmLm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGVyaWFsLl9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBiYWJ5bG9uRHJhd01vZGUgaW4gbWF0ZXJpYWwuX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbkRhdGEgPSBtYXRlcmlhbC5fZGF0YVtiYWJ5bG9uRHJhd01vZGVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25NZXNoIG9mIGJhYnlsb25EYXRhLmJhYnlsb25NZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSBub25Vbmlmb3JtU2NhbGluZyBpcyBzZXQgaWYgbmVjZXNzYXJ5LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFieWxvbk1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25NYXRlcmlhbCA9IGJhYnlsb25EYXRhLmJhYnlsb25NYXRlcmlhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goYmFieWxvbk1hdGVyaWFsLmZvcmNlQ29tcGlsYXRpb25Bc3luYyhiYWJ5bG9uTWVzaCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChiYWJ5bG9uTWF0ZXJpYWwuZm9yY2VDb21waWxhdGlvbkFzeW5jKGJhYnlsb25NZXNoLCB7IHVzZUluc3RhbmNlczogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFyZW50LnVzZUNsaXBQbGFuZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goYmFieWxvbk1hdGVyaWFsLmZvcmNlQ29tcGlsYXRpb25Bc3luYyhiYWJ5bG9uTWVzaCwgeyBjbGlwUGxhbmU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goYmFieWxvbk1hdGVyaWFsLmZvcmNlQ29tcGlsYXRpb25Bc3luYyhiYWJ5bG9uTWVzaCwgeyBjbGlwUGxhbmU6IHRydWUsIHVzZUluc3RhbmNlczogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fZW5kUGVyZm9ybWFuY2VDb3VudGVyKFwiQ29tcGlsZSBtYXRlcmlhbHNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcGlsZVNoYWRvd0dlbmVyYXRvcnNBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuX3N0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKFwiQ29tcGlsZSBzaGFkb3cgZ2VuZXJhdG9yc1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBuZXcgQXJyYXk8UHJvbWlzZTxhbnk+PigpO1xyXG5cclxuICAgICAgICBjb25zdCBsaWdodHMgPSB0aGlzLl9iYWJ5bG9uU2NlbmUubGlnaHRzO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGlnaHQgb2YgbGlnaHRzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRvciA9IGxpZ2h0LmdldFNoYWRvd0dlbmVyYXRvcigpO1xyXG4gICAgICAgICAgICBpZiAoZ2VuZXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKGdlbmVyYXRvci5mb3JjZUNvbXBpbGF0aW9uQXN5bmMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fZW5kUGVyZm9ybWFuY2VDb3VudGVyKFwiQ29tcGlsZSBzaGFkb3cgZ2VuZXJhdG9yc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9mb3JFYWNoRXh0ZW5zaW9ucyhhY3Rpb246IChleHRlbnNpb246IElHTFRGTG9hZGVyRXh0ZW5zaW9uKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBleHRlbnNpb24gb2YgdGhpcy5fZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICBpZiAoZXh0ZW5zaW9uLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihleHRlbnNpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2FwcGx5RXh0ZW5zaW9uczxUPihwcm9wZXJ0eTogSVByb3BlcnR5LCBmdW5jdGlvbk5hbWU6IHN0cmluZywgYWN0aW9uQXN5bmM6IChleHRlbnNpb246IElHTFRGTG9hZGVyRXh0ZW5zaW9uKSA9PiBOdWxsYWJsZTxUPiB8IHVuZGVmaW5lZCk6IE51bGxhYmxlPFQ+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiB0aGlzLl9leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRlbnNpb24uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBgJHtleHRlbnNpb24ubmFtZX0uJHtmdW5jdGlvbk5hbWV9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlclByb3BlcnR5ID0gcHJvcGVydHkgYXMgSUxvYWRlclByb3BlcnR5O1xyXG4gICAgICAgICAgICAgICAgbG9hZGVyUHJvcGVydHkuX2FjdGl2ZUxvYWRlckV4dGVuc2lvbkZ1bmN0aW9ucyA9IGxvYWRlclByb3BlcnR5Ll9hY3RpdmVMb2FkZXJFeHRlbnNpb25GdW5jdGlvbnMgfHwge307XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVMb2FkZXJFeHRlbnNpb25GdW5jdGlvbnMgPSBsb2FkZXJQcm9wZXJ0eS5fYWN0aXZlTG9hZGVyRXh0ZW5zaW9uRnVuY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhY3RpdmVMb2FkZXJFeHRlbnNpb25GdW5jdGlvbnNbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTG9hZGVyRXh0ZW5zaW9uRnVuY3Rpb25zW2lkXSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGFjdGlvbkFzeW5jKGV4dGVuc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWN0aXZlTG9hZGVyRXh0ZW5zaW9uRnVuY3Rpb25zW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNPbkxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZm9yRWFjaEV4dGVuc2lvbnMoKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLm9uTG9hZGluZyAmJiBleHRlbnNpb24ub25Mb2FkaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNPblJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2ZvckVhY2hFeHRlbnNpb25zKChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5vblJlYWR5ICYmIGV4dGVuc2lvbi5vblJlYWR5KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkU2NlbmVBc3luYyhjb250ZXh0OiBzdHJpbmcsIHNjZW5lOiBJU2NlbmUpOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhzY2VuZSwgXCJsb2FkU2NlbmVcIiwgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLmxvYWRTY2VuZUFzeW5jICYmIGV4dGVuc2lvbi5sb2FkU2NlbmVBc3luYyhjb250ZXh0LCBzY2VuZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkTm9kZUFzeW5jKGNvbnRleHQ6IHN0cmluZywgbm9kZTogSU5vZGUsIGFzc2lnbjogKGJhYnlsb25UcmFuc2Zvcm1Ob2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxUcmFuc2Zvcm1Ob2RlPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMobm9kZSwgXCJsb2FkTm9kZVwiLCAoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ubG9hZE5vZGVBc3luYyAmJiBleHRlbnNpb24ubG9hZE5vZGVBc3luYyhjb250ZXh0LCBub2RlLCBhc3NpZ24pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZENhbWVyYUFzeW5jKGNvbnRleHQ6IHN0cmluZywgY2FtZXJhOiBJQ2FtZXJhLCBhc3NpZ246IChiYWJ5bG9uQ2FtZXJhOiBDYW1lcmEpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPENhbWVyYT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKGNhbWVyYSwgXCJsb2FkQ2FtZXJhXCIsIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5sb2FkQ2FtZXJhQXN5bmMgJiYgZXh0ZW5zaW9uLmxvYWRDYW1lcmFBc3luYyhjb250ZXh0LCBjYW1lcmEsIGFzc2lnbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkVmVydGV4RGF0YUFzeW5jKGNvbnRleHQ6IHN0cmluZywgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSwgYmFieWxvbk1lc2g6IE1lc2gpOiBOdWxsYWJsZTxQcm9taXNlPEdlb21ldHJ5Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMocHJpbWl0aXZlLCBcImxvYWRWZXJ0ZXhEYXRhXCIsIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5fbG9hZFZlcnRleERhdGFBc3luYyAmJiBleHRlbnNpb24uX2xvYWRWZXJ0ZXhEYXRhQXN5bmMoY29udGV4dCwgcHJpbWl0aXZlLCBiYWJ5bG9uTWVzaCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkTWVzaFByaW1pdGl2ZUFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgbm9kZTogSU5vZGUsXHJcbiAgICAgICAgbWVzaDogSU1lc2gsXHJcbiAgICAgICAgcHJpbWl0aXZlOiBJTWVzaFByaW1pdGl2ZSxcclxuICAgICAgICBhc3NpZ246IChiYWJ5bG9uTWVzaDogQWJzdHJhY3RNZXNoKSA9PiB2b2lkXHJcbiAgICApOiBOdWxsYWJsZTxQcm9taXNlPEFic3RyYWN0TWVzaD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICBwcmltaXRpdmUsXHJcbiAgICAgICAgICAgIFwibG9hZE1lc2hQcmltaXRpdmVcIixcclxuICAgICAgICAgICAgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLl9sb2FkTWVzaFByaW1pdGl2ZUFzeW5jICYmIGV4dGVuc2lvbi5fbG9hZE1lc2hQcmltaXRpdmVBc3luYyhjb250ZXh0LCBuYW1lLCBub2RlLCBtZXNoLCBwcmltaXRpdmUsIGFzc2lnbilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkTWF0ZXJpYWxBc3luYyhcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgbWF0ZXJpYWw6IElNYXRlcmlhbCxcclxuICAgICAgICBiYWJ5bG9uTWVzaDogTnVsbGFibGU8TWVzaD4sXHJcbiAgICAgICAgYmFieWxvbkRyYXdNb2RlOiBudW1iZXIsXHJcbiAgICAgICAgYXNzaWduOiAoYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZFxyXG4gICAgKTogTnVsbGFibGU8UHJvbWlzZTxNYXRlcmlhbD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICBtYXRlcmlhbCxcclxuICAgICAgICAgICAgXCJsb2FkTWF0ZXJpYWxcIixcclxuICAgICAgICAgICAgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLl9sb2FkTWF0ZXJpYWxBc3luYyAmJiBleHRlbnNpb24uX2xvYWRNYXRlcmlhbEFzeW5jKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uTWVzaCwgYmFieWxvbkRyYXdNb2RlLCBhc3NpZ24pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zQ3JlYXRlTWF0ZXJpYWwoY29udGV4dDogc3RyaW5nLCBtYXRlcmlhbDogSU1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGU6IG51bWJlcik6IE51bGxhYmxlPE1hdGVyaWFsPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhtYXRlcmlhbCwgXCJjcmVhdGVNYXRlcmlhbFwiLCAoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24uY3JlYXRlTWF0ZXJpYWwgJiYgZXh0ZW5zaW9uLmNyZWF0ZU1hdGVyaWFsKGNvbnRleHQsIG1hdGVyaWFsLCBiYWJ5bG9uRHJhd01vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZE1hdGVyaWFsUHJvcGVydGllc0FzeW5jKGNvbnRleHQ6IHN0cmluZywgbWF0ZXJpYWw6IElNYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsOiBNYXRlcmlhbCk6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICBtYXRlcmlhbCxcclxuICAgICAgICAgICAgXCJsb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzXCIsXHJcbiAgICAgICAgICAgIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5sb2FkTWF0ZXJpYWxQcm9wZXJ0aWVzQXN5bmMgJiYgZXh0ZW5zaW9uLmxvYWRNYXRlcmlhbFByb3BlcnRpZXNBc3luYyhjb250ZXh0LCBtYXRlcmlhbCwgYmFieWxvbk1hdGVyaWFsKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZXh0ZW5zaW9uc0xvYWRUZXh0dXJlSW5mb0FzeW5jKGNvbnRleHQ6IHN0cmluZywgdGV4dHVyZUluZm86IElUZXh0dXJlSW5mbywgYXNzaWduOiAoYmFieWxvblRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB2b2lkKTogTnVsbGFibGU8UHJvbWlzZTxCYXNlVGV4dHVyZT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKHRleHR1cmVJbmZvLCBcImxvYWRUZXh0dXJlSW5mb1wiLCAoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ubG9hZFRleHR1cmVJbmZvQXN5bmMgJiYgZXh0ZW5zaW9uLmxvYWRUZXh0dXJlSW5mb0FzeW5jKGNvbnRleHQsIHRleHR1cmVJbmZvLCBhc3NpZ24pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZFRleHR1cmVBc3luYyhjb250ZXh0OiBzdHJpbmcsIHRleHR1cmU6IElUZXh0dXJlLCBhc3NpZ246IChiYWJ5bG9uVGV4dHVyZTogQmFzZVRleHR1cmUpID0+IHZvaWQpOiBOdWxsYWJsZTxQcm9taXNlPEJhc2VUZXh0dXJlPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnModGV4dHVyZSwgXCJsb2FkVGV4dHVyZVwiLCAoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24uX2xvYWRUZXh0dXJlQXN5bmMgJiYgZXh0ZW5zaW9uLl9sb2FkVGV4dHVyZUFzeW5jKGNvbnRleHQsIHRleHR1cmUsIGFzc2lnbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkQW5pbWF0aW9uQXN5bmMoY29udGV4dDogc3RyaW5nLCBhbmltYXRpb246IElBbmltYXRpb24pOiBOdWxsYWJsZTxQcm9taXNlPEFuaW1hdGlvbkdyb3VwPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMoYW5pbWF0aW9uLCBcImxvYWRBbmltYXRpb25cIiwgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLmxvYWRBbmltYXRpb25Bc3luYyAmJiBleHRlbnNpb24ubG9hZEFuaW1hdGlvbkFzeW5jKGNvbnRleHQsIGFuaW1hdGlvbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2V4dGVuc2lvbnNMb2FkQW5pbWF0aW9uQ2hhbm5lbEFzeW5jKFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBhbmltYXRpb25Db250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgYW5pbWF0aW9uOiBJQW5pbWF0aW9uLFxyXG4gICAgICAgIGNoYW5uZWw6IElBbmltYXRpb25DaGFubmVsLFxyXG4gICAgICAgIG9uTG9hZDogKGJhYnlsb25BbmltYXRhYmxlOiBJQW5pbWF0YWJsZSwgYmFieWxvbkFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiB2b2lkXHJcbiAgICApOiBOdWxsYWJsZTxQcm9taXNlPHZvaWQ+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhcclxuICAgICAgICAgICAgYW5pbWF0aW9uLFxyXG4gICAgICAgICAgICBcImxvYWRBbmltYXRpb25DaGFubmVsXCIsXHJcbiAgICAgICAgICAgIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5fbG9hZEFuaW1hdGlvbkNoYW5uZWxBc3luYyAmJiBleHRlbnNpb24uX2xvYWRBbmltYXRpb25DaGFubmVsQXN5bmMoY29udGV4dCwgYW5pbWF0aW9uQ29udGV4dCwgYW5pbWF0aW9uLCBjaGFubmVsLCBvbkxvYWQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZFNraW5Bc3luYyhjb250ZXh0OiBzdHJpbmcsIG5vZGU6IElOb2RlLCBza2luOiBJU2tpbik6IE51bGxhYmxlPFByb21pc2U8dm9pZD4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlFeHRlbnNpb25zKHNraW4sIFwibG9hZFNraW5cIiwgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLl9sb2FkU2tpbkFzeW5jICYmIGV4dGVuc2lvbi5fbG9hZFNraW5Bc3luYyhjb250ZXh0LCBub2RlLCBza2luKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZXh0ZW5zaW9uc0xvYWRVcmlBc3luYyhjb250ZXh0OiBzdHJpbmcsIHByb3BlcnR5OiBJUHJvcGVydHksIHVyaTogc3RyaW5nKTogTnVsbGFibGU8UHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhwcm9wZXJ0eSwgXCJsb2FkVXJpXCIsIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5fbG9hZFVyaUFzeW5jICYmIGV4dGVuc2lvbi5fbG9hZFVyaUFzeW5jKGNvbnRleHQsIHByb3BlcnR5LCB1cmkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZEJ1ZmZlclZpZXdBc3luYyhjb250ZXh0OiBzdHJpbmcsIGJ1ZmZlclZpZXc6IElCdWZmZXJWaWV3KTogTnVsbGFibGU8UHJvbWlzZTxBcnJheUJ1ZmZlclZpZXc+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5RXh0ZW5zaW9ucyhidWZmZXJWaWV3LCBcImxvYWRCdWZmZXJWaWV3XCIsIChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5sb2FkQnVmZmVyVmlld0FzeW5jICYmIGV4dGVuc2lvbi5sb2FkQnVmZmVyVmlld0FzeW5jKGNvbnRleHQsIGJ1ZmZlclZpZXcpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9leHRlbnNpb25zTG9hZEJ1ZmZlckFzeW5jKGNvbnRleHQ6IHN0cmluZywgYnVmZmVyOiBJQnVmZmVyLCBieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcik6IE51bGxhYmxlPFByb21pc2U8QXJyYXlCdWZmZXJWaWV3Pj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBseUV4dGVuc2lvbnMoYnVmZmVyLCBcImxvYWRCdWZmZXJcIiwgKGV4dGVuc2lvbikgPT4gZXh0ZW5zaW9uLmxvYWRCdWZmZXJBc3luYyAmJiBleHRlbnNpb24ubG9hZEJ1ZmZlckFzeW5jKGNvbnRleHQsIGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIG1ldGhvZCBjYWxsZWQgYnkgYSBsb2FkZXIgZXh0ZW5zaW9uIHRvIGxvYWQgYW4gZ2xURiBleHRlbnNpb24uXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCBUaGUgY29udGV4dCB3aGVuIGxvYWRpbmcgdGhlIGFzc2V0XHJcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgVGhlIGdsVEYgcHJvcGVydHkgdG8gbG9hZCB0aGUgZXh0ZW5zaW9uIGZyb21cclxuICAgICAqIEBwYXJhbSBleHRlbnNpb25OYW1lIFRoZSBuYW1lIG9mIHRoZSBleHRlbnNpb24gdG8gbG9hZFxyXG4gICAgICogQHBhcmFtIGFjdGlvbkFzeW5jIFRoZSBhY3Rpb24gdG8gcnVuXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgcHJvbWlzZSByZXR1cm5lZCBieSBhY3Rpb25Bc3luYyBvciBudWxsIGlmIHRoZSBleHRlbnNpb24gZG9lcyBub3QgZXhpc3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkRXh0ZW5zaW9uQXN5bmM8VEV4dGVuc2lvbiA9IGFueSwgVFJlc3VsdCA9IHZvaWQ+KFxyXG4gICAgICAgIGNvbnRleHQ6IHN0cmluZyxcclxuICAgICAgICBwcm9wZXJ0eTogSVByb3BlcnR5LFxyXG4gICAgICAgIGV4dGVuc2lvbk5hbWU6IHN0cmluZyxcclxuICAgICAgICBhY3Rpb25Bc3luYzogKGV4dGVuc2lvbkNvbnRleHQ6IHN0cmluZywgZXh0ZW5zaW9uOiBURXh0ZW5zaW9uKSA9PiBOdWxsYWJsZTxQcm9taXNlPFRSZXN1bHQ+PlxyXG4gICAgKTogTnVsbGFibGU8UHJvbWlzZTxUUmVzdWx0Pj4ge1xyXG4gICAgICAgIGlmICghcHJvcGVydHkuZXh0ZW5zaW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBwcm9wZXJ0eS5leHRlbnNpb25zO1xyXG5cclxuICAgICAgICBjb25zdCBleHRlbnNpb24gPSBleHRlbnNpb25zW2V4dGVuc2lvbk5hbWVdIGFzIFRFeHRlbnNpb247XHJcbiAgICAgICAgaWYgKCFleHRlbnNpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWN0aW9uQXN5bmMoYCR7Y29udGV4dH0vZXh0ZW5zaW9ucy8ke2V4dGVuc2lvbk5hbWV9YCwgZXh0ZW5zaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBtZXRob2QgY2FsbGVkIGJ5IGEgbG9hZGVyIGV4dGVuc2lvbiB0byBsb2FkIGEgZ2xURiBleHRyYS5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHdoZW4gbG9hZGluZyB0aGUgYXNzZXRcclxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSBUaGUgZ2xURiBwcm9wZXJ0eSB0byBsb2FkIHRoZSBleHRyYSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uTmFtZSBUaGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uIHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSBhY3Rpb25Bc3luYyBUaGUgYWN0aW9uIHRvIHJ1blxyXG4gICAgICogQHJldHVybnMgVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgYWN0aW9uQXN5bmMgb3IgbnVsbCBpZiB0aGUgZXh0cmEgZG9lcyBub3QgZXhpc3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkRXh0cmFBc3luYzxURXh0cmEgPSBhbnksIFRSZXN1bHQgPSB2b2lkPihcclxuICAgICAgICBjb250ZXh0OiBzdHJpbmcsXHJcbiAgICAgICAgcHJvcGVydHk6IElQcm9wZXJ0eSxcclxuICAgICAgICBleHRlbnNpb25OYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgYWN0aW9uQXN5bmM6IChleHRyYUNvbnRleHQ6IHN0cmluZywgZXh0cmE6IFRFeHRyYSkgPT4gTnVsbGFibGU8UHJvbWlzZTxUUmVzdWx0Pj5cclxuICAgICk6IE51bGxhYmxlPFByb21pc2U8VFJlc3VsdD4+IHtcclxuICAgICAgICBpZiAoIXByb3BlcnR5LmV4dHJhcykge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhcyA9IHByb3BlcnR5LmV4dHJhcztcclxuXHJcbiAgICAgICAgY29uc3QgZXh0cmEgPSBleHRyYXNbZXh0ZW5zaW9uTmFtZV0gYXMgVEV4dHJhO1xyXG4gICAgICAgIGlmICghZXh0cmEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWN0aW9uQXN5bmMoYCR7Y29udGV4dH0vZXh0cmFzLyR7ZXh0ZW5zaW9uTmFtZX1gLCBleHRyYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgZm9yIHByZXNlbmNlIG9mIGFuIGV4dGVuc2lvbi5cclxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBleHRlbnNpb24gdG8gY2hlY2tcclxuICAgICAqIEByZXR1cm5zIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHRoZSBwcmVzZW5jZSBvZiB0aGUgZ2l2ZW4gZXh0ZW5zaW9uIG5hbWUgaW4gYGV4dGVuc2lvbnNVc2VkYFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFeHRlbnNpb25Vc2VkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dsdGYuZXh0ZW5zaW9uc1VzZWQgJiYgdGhpcy5fZ2x0Zi5leHRlbnNpb25zVXNlZC5pbmRleE9mKG5hbWUpICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluY3JlbWVudHMgdGhlIGluZGVudGF0aW9uIGxldmVsIGFuZCBsb2dzIGEgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9nT3BlbihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuX2xvZ09wZW4obWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNyZW1lbnRzIHRoZSBpbmRlbnRhdGlvbiBsZXZlbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ0Nsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5fbG9nQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ3MgYSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2dcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuX2xvZyhtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBhIHBlcmZvcm1hbmNlIGNvdW50ZXIuXHJcbiAgICAgKiBAcGFyYW0gY291bnRlck5hbWUgVGhlIG5hbWUgb2YgdGhlIHBlcmZvcm1hbmNlIGNvdW50ZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKGNvdW50ZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQuX3N0YXJ0UGVyZm9ybWFuY2VDb3VudGVyKGNvdW50ZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuZHMgYSBwZXJmb3JtYW5jZSBjb3VudGVyLlxyXG4gICAgICogQHBhcmFtIGNvdW50ZXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBwZXJmb3JtYW5jZSBjb3VudGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmRQZXJmb3JtYW5jZUNvdW50ZXIoY291bnRlck5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudC5fZW5kUGVyZm9ybWFuY2VDb3VudGVyKGNvdW50ZXJOYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkZpbGVMb2FkZXIuX0NyZWF0ZUdMVEYyTG9hZGVyID0gKHBhcmVudCkgPT4gbmV3IEdMVEZMb2FkZXIocGFyZW50KTtcclxuIiwiaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgUXVhdGVybmlvbiwgVmVjdG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgSU5vZGUgfSBmcm9tIFwiLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElBbmltYXRhYmxlIH0gZnJvbSBcImNvcmUvQW5pbWF0aW9ucy9hbmltYXRhYmxlLmludGVyZmFjZVwiO1xyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgdHlwZSBHZXRWYWx1ZUZuID0gKHRhcmdldDogYW55LCBzb3VyY2U6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHNjYWxlOiBudW1iZXIpID0+IGFueTtcclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlY3RvcjMoX3RhcmdldDogYW55LCBzb3VyY2U6IEZsb2F0MzJBcnJheSwgb2Zmc2V0OiBudW1iZXIsIHNjYWxlOiBudW1iZXIpOiBWZWN0b3IzIHtcclxuICAgIHJldHVybiBWZWN0b3IzLkZyb21BcnJheShzb3VyY2UsIG9mZnNldCkuc2NhbGVJblBsYWNlKHNjYWxlKTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhdGVybmlvbihfdGFyZ2V0OiBhbnksIHNvdXJjZTogRmxvYXQzMkFycmF5LCBvZmZzZXQ6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IFF1YXRlcm5pb24ge1xyXG4gICAgcmV0dXJuIFF1YXRlcm5pb24uRnJvbUFycmF5KHNvdXJjZSwgb2Zmc2V0KS5zY2FsZUluUGxhY2Uoc2NhbGUpO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWlnaHRzKHRhcmdldDogSU5vZGUsIHNvdXJjZTogRmxvYXQzMkFycmF5LCBvZmZzZXQ6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgY29uc3QgdmFsdWUgPSBuZXcgQXJyYXk8bnVtYmVyPih0YXJnZXQuX251bU1vcnBoVGFyZ2V0cyEpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlW2ldID0gc291cmNlW29mZnNldCsrXSAqIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQW5pbWF0aW9uUHJvcGVydHlJbmZvIHtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGdldFZhbHVlOiBHZXRWYWx1ZUZuLFxyXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBnZXRTdHJpZGU6ICh0YXJnZXQ6IGFueSkgPT4gbnVtYmVyXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9idWlsZEFuaW1hdGlvbihuYW1lOiBzdHJpbmcsIGZwczogbnVtYmVyLCBrZXlzOiBhbnlbXSk6IEFuaW1hdGlvbiB7XHJcbiAgICAgICAgY29uc3QgYmFieWxvbkFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24obmFtZSwgdGhpcy5uYW1lLCBmcHMsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgYmFieWxvbkFuaW1hdGlvbi5zZXRLZXlzKGtleXMpO1xyXG4gICAgICAgIHJldHVybiBiYWJ5bG9uQW5pbWF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBidWlsZEFuaW1hdGlvbnModGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZywgZnBzOiBudW1iZXIsIGtleXM6IGFueVtdLCBjYWxsYmFjazogKGJhYnlsb25BbmltYXRhYmxlOiBJQW5pbWF0YWJsZSwgYmFieWxvbkFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiB2b2lkKTogdm9pZDtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtTm9kZUFuaW1hdGlvblByb3BlcnR5SW5mbyBleHRlbmRzIEFuaW1hdGlvblByb3BlcnR5SW5mbyB7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgYnVpbGRBbmltYXRpb25zKHRhcmdldDogSU5vZGUsIG5hbWU6IHN0cmluZywgZnBzOiBudW1iZXIsIGtleXM6IGFueVtdLCBjYWxsYmFjazogKGJhYnlsb25BbmltYXRhYmxlOiBJQW5pbWF0YWJsZSwgYmFieWxvbkFuaW1hdGlvbjogQW5pbWF0aW9uKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY2FsbGJhY2sodGFyZ2V0Ll9iYWJ5bG9uVHJhbnNmb3JtTm9kZSEsIHRoaXMuX2J1aWxkQW5pbWF0aW9uKG5hbWUsIGZwcywga2V5cykpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBjbGFzcyBXZWlnaHRBbmltYXRpb25Qcm9wZXJ0eUluZm8gZXh0ZW5kcyBBbmltYXRpb25Qcm9wZXJ0eUluZm8ge1xyXG4gICAgcHVibGljIGJ1aWxkQW5pbWF0aW9ucyh0YXJnZXQ6IElOb2RlLCBuYW1lOiBzdHJpbmcsIGZwczogbnVtYmVyLCBrZXlzOiBhbnlbXSwgY2FsbGJhY2s6IChiYWJ5bG9uQW5pbWF0YWJsZTogSUFuaW1hdGFibGUsIGJhYnlsb25BbmltYXRpb246IEFuaW1hdGlvbikgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0YXJnZXQuX251bU1vcnBoVGFyZ2V0cykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB0YXJnZXRJbmRleCA9IDA7IHRhcmdldEluZGV4IDwgdGFyZ2V0Ll9udW1Nb3JwaFRhcmdldHM7IHRhcmdldEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhYnlsb25BbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKGAke25hbWV9XyR7dGFyZ2V0SW5kZXh9YCwgdGhpcy5uYW1lLCBmcHMsIHRoaXMudHlwZSk7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQW5pbWF0aW9uLnNldEtleXMoXHJcbiAgICAgICAgICAgICAgICAgICAga2V5cy5tYXAoKGtleSkgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWU6IGtleS5mcmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5UYW5nZW50OiBrZXkuaW5UYW5nZW50ID8ga2V5LmluVGFuZ2VudFt0YXJnZXRJbmRleF0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBrZXkudmFsdWVbdGFyZ2V0SW5kZXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRUYW5nZW50OiBrZXkub3V0VGFuZ2VudCA/IGtleS5vdXRUYW5nZW50W3RhcmdldEluZGV4XSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJwb2xhdGlvbjoga2V5LmludGVycG9sYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQuX3ByaW1pdGl2ZUJhYnlsb25NZXNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGJhYnlsb25NZXNoIG9mIHRhcmdldC5fcHJpbWl0aXZlQmFieWxvbk1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFieWxvbk1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldCA9IGJhYnlsb25NZXNoLm1vcnBoVGFyZ2V0TWFuYWdlci5nZXRUYXJnZXQodGFyZ2V0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbkFuaW1hdGlvbkNsb25lID0gYmFieWxvbkFuaW1hdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXQuYW5pbWF0aW9ucy5wdXNoKGJhYnlsb25BbmltYXRpb25DbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhtb3JwaFRhcmdldCwgYmFieWxvbkFuaW1hdGlvbkNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgY29uc3Qgbm9kZUFuaW1hdGlvbkRhdGEgPSB7XHJcbiAgICB0cmFuc2xhdGlvbjogW25ldyBUcmFuc2Zvcm1Ob2RlQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjMsIFwicG9zaXRpb25cIiwgZ2V0VmVjdG9yMywgKCkgPT4gMyldLFxyXG4gICAgcm90YXRpb246IFtuZXcgVHJhbnNmb3JtTm9kZUFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9RVUFURVJOSU9OLCBcInJvdGF0aW9uUXVhdGVybmlvblwiLCBnZXRRdWF0ZXJuaW9uLCAoKSA9PiA0KV0sXHJcbiAgICBzY2FsZTogW25ldyBUcmFuc2Zvcm1Ob2RlQW5pbWF0aW9uUHJvcGVydHlJbmZvKEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1ZFQ1RPUjMsIFwic2NhbGluZ1wiLCBnZXRWZWN0b3IzLCAoKSA9PiAzKV0sXHJcbiAgICB3ZWlnaHRzOiBbbmV3IFdlaWdodEFuaW1hdGlvblByb3BlcnR5SW5mbyhBbmltYXRpb24uQU5JTUFUSU9OVFlQRV9GTE9BVCwgXCJpbmZsdWVuY2VcIiwgZ2V0V2VpZ2h0cywgKHRhcmdldCkgPT4gdGFyZ2V0Ll9udW1Nb3JwaFRhcmdldHMhKV0sXHJcbn07XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZMb2FkZXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2xURkxvYWRlckV4dGVuc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9FeHRlbnNpb25zL2luZGV4XCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHR5cGUgKiBhcyBHTFRGMiBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE9ic2VydmVyIH0gZnJvbSBcImNvcmUvTWlzYy9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwiY29yZS9NaXNjL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB0eXBlIHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgICBJU2NlbmVMb2FkZXJQbHVnaW5GYWN0b3J5LFxyXG4gICAgSVNjZW5lTG9hZGVyUGx1Z2luLFxyXG4gICAgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMsXHJcbiAgICBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50LFxyXG4gICAgSVNjZW5lTG9hZGVyUGx1Z2luRXh0ZW5zaW9ucyxcclxuICAgIElTY2VuZUxvYWRlckFzeW5jUmVzdWx0LFxyXG59IGZyb20gXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSwgSURpc3Bvc2FibGUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFdlYlJlcXVlc3QgfSBmcm9tIFwiY29yZS9NaXNjL3dlYlJlcXVlc3RcIjtcclxuaW1wb3J0IHR5cGUgeyBJRmlsZVJlcXVlc3QgfSBmcm9tIFwiY29yZS9NaXNjL2ZpbGVSZXF1ZXN0XCI7XHJcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gXCJjb3JlL01pc2MvbG9nZ2VyXCI7XHJcbmltcG9ydCB0eXBlIHsgSURhdGFCdWZmZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RhdGFSZWFkZXJcIjtcclxuaW1wb3J0IHsgRGF0YVJlYWRlciB9IGZyb20gXCJjb3JlL01pc2MvZGF0YVJlYWRlclwiO1xyXG5pbXBvcnQgeyBHTFRGVmFsaWRhdGlvbiB9IGZyb20gXCIuL2dsVEZWYWxpZGF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgTG9hZEZpbGVFcnJvciB9IGZyb20gXCJjb3JlL01pc2MvZmlsZVRvb2xzXCI7XHJcbmltcG9ydCB7IERlY29kZUJhc2U2NFVybFRvQmluYXJ5IH0gZnJvbSBcImNvcmUvTWlzYy9maWxlVG9vbHNcIjtcclxuaW1wb3J0IHsgUnVudGltZUVycm9yLCBFcnJvckNvZGVzIH0gZnJvbSBcImNvcmUvTWlzYy9lcnJvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vcnBoVGFyZ2V0TWFuYWdlciB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0TWFuYWdlclwiO1xyXG5cclxuaW50ZXJmYWNlIElGaWxlUmVxdWVzdEluZm8gZXh0ZW5kcyBJRmlsZVJlcXVlc3Qge1xyXG4gICAgX2xlbmd0aENvbXB1dGFibGU/OiBib29sZWFuO1xyXG4gICAgX2xvYWRlZD86IG51bWJlcjtcclxuICAgIF90b3RhbD86IG51bWJlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZEFzeW5jKGFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlciwgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVhZFZpZXdBc3luYyhhcnJheUJ1ZmZlclZpZXc6IEFycmF5QnVmZmVyVmlldywgYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKChhcnJheUJ1ZmZlclZpZXcgYXMgVWludDhBcnJheSkuYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGggPiBhcnJheUJ1ZmZlclZpZXcuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcnJheSBsZW5ndGggb3V0IG9mIGJvdW5kcy5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyVmlldy5idWZmZXIsIChhcnJheUJ1ZmZlclZpZXcgYXMgVWludDhBcnJheSkuYnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RlIHRoYXQgZGV0ZXJtaW5lcyB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gR0xURkxvYWRlckNvb3JkaW5hdGVTeXN0ZW1Nb2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQXV0b21hdGljYWxseSBjb252ZXJ0IHRoZSBnbFRGIHJpZ2h0LWhhbmRlZCBkYXRhIHRvIHRoZSBhcHByb3ByaWF0ZSBzeXN0ZW0gYmFzZWQgb24gdGhlIGN1cnJlbnQgY29vcmRpbmF0ZSBzeXN0ZW0gbW9kZSBvZiB0aGUgc2NlbmUuXHJcbiAgICAgKi9cclxuICAgIEFVVE8sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB1c2VSaWdodEhhbmRlZFN5c3RlbSBmbGFnIG9uIHRoZSBzY2VuZS5cclxuICAgICAqL1xyXG4gICAgRk9SQ0VfUklHSFRfSEFOREVELFxyXG59XHJcblxyXG4vKipcclxuICogTW9kZSB0aGF0IGRldGVybWluZXMgd2hhdCBhbmltYXRpb25zIHdpbGwgc3RhcnQuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHTFRGTG9hZGVyQW5pbWF0aW9uU3RhcnRNb2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogTm8gYW5pbWF0aW9uIHdpbGwgc3RhcnQuXHJcbiAgICAgKi9cclxuICAgIE5PTkUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlyc3QgYW5pbWF0aW9uIHdpbGwgc3RhcnQuXHJcbiAgICAgKi9cclxuICAgIEZJUlNULFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIGFuaW1hdGlvbnMgd2lsbCBzdGFydC5cclxuICAgICAqL1xyXG4gICAgQUxMLFxyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIHRoYXQgY29udGFpbnMgdGhlIGRhdGEgZm9yIHRoZSBnbFRGIGFzc2V0LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkxvYWRlckRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgZ2xURiBKU09OLlxyXG4gICAgICovXHJcbiAgICBqc29uOiBPYmplY3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgQklOIGNodW5rIG9mIGEgYmluYXJ5IGdsVEYuXHJcbiAgICAgKi9cclxuICAgIGJpbjogTnVsbGFibGU8SURhdGFCdWZmZXI+O1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBleHRlbmRpbmcgdGhlIGxvYWRlci5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBvcmRlciBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqIFRoZSBsb2FkZXIgc29ydHMgdGhlIGV4dGVuc2lvbnMgdXNpbmcgdGhlc2UgdmFsdWVzIHdoZW4gbG9hZGluZy5cclxuICAgICAqL1xyXG4gICAgb3JkZXI/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2FkZXIgc3RhdGUuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHTFRGTG9hZGVyU3RhdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXNzZXQgaXMgbG9hZGluZy5cclxuICAgICAqL1xyXG4gICAgTE9BRElORyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhc3NldCBpcyByZWFkeSBmb3IgcmVuZGVyaW5nLlxyXG4gICAgICovXHJcbiAgICBSRUFEWSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhc3NldCBpcyBjb21wbGV0ZWx5IGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgQ09NUExFVEUsXHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkxvYWRlciBleHRlbmRzIElEaXNwb3NhYmxlIHtcclxuICAgIGltcG9ydE1lc2hBc3luYzogKFxyXG4gICAgICAgIG1lc2hlc05hbWVzOiBhbnksXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGNvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+LFxyXG4gICAgICAgIGRhdGE6IElHTFRGTG9hZGVyRGF0YSxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcclxuICAgICAgICBmaWxlTmFtZT86IHN0cmluZ1xyXG4gICAgKSA9PiBQcm9taXNlPElTY2VuZUxvYWRlckFzeW5jUmVzdWx0PjtcclxuICAgIGxvYWRBc3luYzogKHNjZW5lOiBTY2VuZSwgZGF0YTogSUdMVEZMb2FkZXJEYXRhLCByb290VXJsOiBzdHJpbmcsIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsIGZpbGVOYW1lPzogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG4vKipcclxuICogRmlsZSBsb2FkZXIgZm9yIGxvYWRpbmcgZ2xURiBmaWxlcyBpbnRvIGEgc2NlbmUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURkZpbGVMb2FkZXIgaW1wbGVtZW50cyBJRGlzcG9zYWJsZSwgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMsIElTY2VuZUxvYWRlclBsdWdpbkZhY3Rvcnkge1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfQ3JlYXRlR0xURjFMb2FkZXI6IChwYXJlbnQ6IEdMVEZGaWxlTG9hZGVyKSA9PiBJR0xURkxvYWRlcjtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVHTFRGMkxvYWRlcjogKHBhcmVudDogR0xURkZpbGVMb2FkZXIpID0+IElHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBDb21tb24gb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCB3aGVuIHRoZSBhc3NldCBoYXMgYmVlbiBwYXJzZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uUGFyc2VkT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPElHTFRGTG9hZGVyRGF0YT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vblBhcnNlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxJR0xURkxvYWRlckRhdGE+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhaXNlZCB3aGVuIHRoZSBhc3NldCBoYXMgYmVlbiBwYXJzZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvblBhcnNlZChjYWxsYmFjazogKGxvYWRlckRhdGE6IElHTFRGTG9hZGVyRGF0YSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblBhcnNlZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vblBhcnNlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25QYXJzZWRPYnNlcnZlciA9IHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgLy8gVjEgb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoaXMgcHJvcGVydHkgdG8gZmFsc2UgdG8gZGlzYWJsZSBpbmNyZW1lbnRhbCBsb2FkaW5nIHdoaWNoIGRlbGF5cyB0aGUgbG9hZGVyIGZyb20gY2FsbGluZyB0aGUgc3VjY2VzcyBjYWxsYmFjayB1bnRpbCBhZnRlciBsb2FkaW5nIHRoZSBtZXNoZXMgYW5kIHNoYWRlcnMuXHJcbiAgICAgKiBUZXh0dXJlcyBhbHdheXMgbG9hZHMgYXN5bmNocm9ub3VzbHkuIEZvciBleGFtcGxlLCB0aGUgc3VjY2VzcyBjYWxsYmFjayBjYW4gY29tcHV0ZSB0aGUgYm91bmRpbmcgaW5mb3JtYXRpb24gb2YgdGhlIGxvYWRlZCBtZXNoZXMgd2hlbiBpbmNyZW1lbnRhbCBsb2FkaW5nIGlzIGRpc2FibGVkLlxyXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEluY3JlbWVudGFsTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhpcyBwcm9wZXJ0eSB0byB0cnVlIGluIG9yZGVyIHRvIHdvcmsgd2l0aCBob21vZ2VuZW91cyBjb29yZGluYXRlcywgYXZhaWxhYmxlIHdpdGggc29tZSBjb252ZXJ0ZXJzIGFuZCBleHBvcnRlcnMuXHJcbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS4gU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hvbW9nZW5lb3VzX2Nvb3JkaW5hdGVzLlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSG9tb2dlbmVvdXNDb29yZGluYXRlcyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS1cclxuICAgIC8vIFYyIG9wdGlvbnNcclxuICAgIC8vIC0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb29yZGluYXRlIHN5c3RlbSBtb2RlLiBEZWZhdWx0cyB0byBBVVRPLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29vcmRpbmF0ZVN5c3RlbU1vZGUgPSBHTFRGTG9hZGVyQ29vcmRpbmF0ZVN5c3RlbU1vZGUuQVVUTztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhbmltYXRpb24gc3RhcnQgbW9kZS4gRGVmYXVsdHMgdG8gRklSU1QuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbmltYXRpb25TdGFydE1vZGUgPSBHTFRGTG9hZGVyQW5pbWF0aW9uU3RhcnRNb2RlLkZJUlNUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBjb21waWxlIG1hdGVyaWFscyBiZWZvcmUgcmFpc2luZyB0aGUgc3VjY2VzcyBjYWxsYmFjay4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb21waWxlTWF0ZXJpYWxzID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGFsc28gY29tcGlsZSBtYXRlcmlhbHMgd2l0aCBjbGlwIHBsYW5lcy4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VDbGlwUGxhbmUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgdGhlIGxvYWRlciBzaG91bGQgY29tcGlsZSBzaGFkb3cgZ2VuZXJhdG9ycyBiZWZvcmUgcmFpc2luZyB0aGUgc3VjY2VzcyBjYWxsYmFjay4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb21waWxlU2hhZG93R2VuZXJhdG9ycyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgQWxwaGEgYmxlbmRlZCBtYXRlcmlhbHMgYXJlIG9ubHkgYXBwbGllZCBhcyBjb3ZlcmFnZS5cclxuICAgICAqIElmIGZhbHNlLCAoZGVmYXVsdCkgVGhlIGx1bWluYW5jZSBvZiBlYWNoIHBpeGVsIHdpbGwgcmVkdWNlIGl0cyBvcGFjaXR5IHRvIHNpbXVsYXRlIHRoZSBiZWhhdmlvdXIgb2YgbW9zdCBwaHlzaWNhbCBtYXRlcmlhbHMuXHJcbiAgICAgKiBJZiB0cnVlLCBubyBleHRyYSBlZmZlY3RzIGFyZSBhcHBsaWVkIHRvIHRyYW5zcGFyZW50IHBpeGVscy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zcGFyZW5jeUFzQ292ZXJhZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgdGhlIGxvYWRlciBzaG91bGQgdXNlIHJhbmdlIHJlcXVlc3RzIHdoZW4gbG9hZCBiaW5hcnkgZ2xURiBmaWxlcyBmcm9tIEhUVFAuXHJcbiAgICAgKiBFbmFibGluZyB3aWxsIGRpc2FibGUgb2ZmbGluZSBzdXBwb3J0IGFuZCBnbFRGIHZhbGlkYXRvci5cclxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlUmFuZ2VSZXF1ZXN0cyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBjcmVhdGUgaW5zdGFuY2VzIHdoZW4gbXVsdGlwbGUgZ2xURiBub2RlcyBwb2ludCB0byB0aGUgc2FtZSBnbFRGIG1lc2guIERlZmF1bHRzIHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVJbnN0YW5jZXMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBhbHdheXMgY29tcHV0ZSB0aGUgYm91bmRpbmcgYm94ZXMgb2YgbWVzaGVzIGFuZCBub3QgdXNlIHRoZSBtaW4vbWF4IHZhbHVlcyBmcm9tIHRoZSBwb3NpdGlvbiBhY2Nlc3Nvci4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbHdheXNDb21wdXRlQm91bmRpbmdCb3ggPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRydWUsIGxvYWQgYWxsIG1hdGVyaWFscyBkZWZpbmVkIGluIHRoZSBmaWxlLCBldmVuIGlmIG5vdCB1c2VkIGJ5IGFueSBtZXNoLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBbGxNYXRlcmlhbHMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRydWUsIGxvYWQgb25seSB0aGUgbWF0ZXJpYWxzIGRlZmluZWQgaW4gdGhlIGZpbGUuIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE9ubHlNYXRlcmlhbHMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRydWUsIGRvIG5vdCBsb2FkIGFueSBtYXRlcmlhbHMgZGVmaW5lZCBpbiB0aGUgZmlsZS4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBza2lwTWF0ZXJpYWxzID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0cnVlLCBsb2FkIHRoZSBjb2xvciAoZ2FtbWEgZW5jb2RlZCkgdGV4dHVyZXMgaW50byBzUkdCIGJ1ZmZlcnMgKGlmIHN1cHBvcnRlZCBieSB0aGUgR1BVKSwgd2hpY2ggd2lsbCB5aWVsZCBtb3JlIGFjY3VyYXRlIHJlc3VsdHMgd2hlbiBzYW1wbGluZyB0aGUgdGV4dHVyZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZVNSR0JCdWZmZXJzID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gbG9hZGluZyBnbFRGIGFuaW1hdGlvbnMsIHdoaWNoIGFyZSBkZWZpbmVkIGluIHNlY29uZHMsIHRhcmdldCB0aGVtIHRvIHRoaXMgRlBTLiBEZWZhdWx0cyB0byA2MC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldEZwcyA9IDYwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBhbHdheXMgY29tcHV0ZSB0aGUgbmVhcmVzdCBjb21tb24gYW5jZXN0b3Igb2YgdGhlIHNrZWxldG9uIGpvaW50cyBpbnN0ZWFkIG9mIHVzaW5nIGBza2luLnNrZWxldG9uYC4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKiBTZXQgdGhpcyB0byB0cnVlIGlmIGxvYWRpbmcgYXNzZXRzIHdpdGggaW52YWxpZCBgc2tpbi5za2VsZXRvbmAgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWx3YXlzQ29tcHV0ZVNrZWxldG9uUm9vdE5vZGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCBiZWZvcmUgbG9hZGluZyBhIHVybCByZWZlcmVuY2VkIGJ5IHRoZSBhc3NldC5cclxuICAgICAqIEBwYXJhbSB1cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXByb2Nlc3NVcmxBc3luYyA9ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZS5yZXNvbHZlKHVybCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIG1lc2ggYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtZXNoLlxyXG4gICAgICogTm90ZSB0aGF0IHRoZSBvYnNlcnZhYmxlIGlzIHJhaXNlZCBhcyBzb29uIGFzIHRoZSBtZXNoIG9iamVjdCBpcyBjcmVhdGVkLCBtZWFuaW5nIHNvbWUgZGF0YSBtYXkgbm90IGhhdmUgYmVlbiBzZXR1cCB5ZXQgZm9yIHRoaXMgbWVzaCAodmVydGV4IGRhdGEsIG1vcnBoIHRhcmdldHMsIG1hdGVyaWFsLCAuLi4pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvbk1lc2hMb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8QWJzdHJhY3RNZXNoPigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uTWVzaExvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxBYnN0cmFjdE1lc2g+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIG1lc2ggYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtZXNoLlxyXG4gICAgICogTm90ZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgYXMgc29vbiBhcyB0aGUgbWVzaCBvYmplY3QgaXMgY3JlYXRlZCwgbWVhbmluZyBzb21lIGRhdGEgbWF5IG5vdCBoYXZlIGJlZW4gc2V0dXAgeWV0IGZvciB0aGlzIG1lc2ggKHZlcnRleCBkYXRhLCBtb3JwaCB0YXJnZXRzLCBtYXRlcmlhbCwgLi4uKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uTWVzaExvYWRlZChjYWxsYmFjazogKG1lc2g6IEFic3RyYWN0TWVzaCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbk1lc2hMb2FkZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uTWVzaExvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uTWVzaExvYWRlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25NZXNoTG9hZGVkT2JzZXJ2ZXIgPSB0aGlzLm9uTWVzaExvYWRlZE9ic2VydmFibGUuYWRkKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIHNraW4gYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBza2luIG5vZGUuXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jLmJhYnlsb25qcy5jb20vZmVhdHVyZXMvZmVhdHVyZXNEZWVwRGl2ZS9pbXBvcnRlcnMvZ2xURi9nbFRGU2tpbm5pbmcjaWdub3JpbmctdGhlLXRyYW5zZm9ybS1vZi10aGUtc2tpbm5lZC1tZXNoXHJcbiAgICAgKiBAcGFyYW0gbm9kZSAtIHRoZSB0cmFuc2Zvcm0gbm9kZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBvcmlnaW5hbCBnbFRGIHNraW4gbm9kZSB1c2VkIGZvciBhbmltYXRpb25zXHJcbiAgICAgKiBAcGFyYW0gc2tpbm5lZE5vZGUgLSB0aGUgdHJhbnNmb3JtIG5vZGUgdGhhdCBpcyB0aGUgc2tpbm5lZCBtZXNoIGl0c2VsZiBvciB0aGUgcGFyZW50IG9mIHRoZSBza2lubmVkIG1lc2hlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25Ta2luTG9hZGVkT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPHsgbm9kZTogVHJhbnNmb3JtTm9kZTsgc2tpbm5lZE5vZGU6IFRyYW5zZm9ybU5vZGUgfT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgdGV4dHVyZSBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIHRleHR1cmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvblRleHR1cmVMb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8QmFzZVRleHR1cmU+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25UZXh0dXJlTG9hZGVkT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPEJhc2VUZXh0dXJlPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayByYWlzZWQgd2hlbiB0aGUgbG9hZGVyIGNyZWF0ZXMgYSB0ZXh0dXJlIGFmdGVyIHBhcnNpbmcgdGhlIGdsVEYgcHJvcGVydGllcyBvZiB0aGUgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvblRleHR1cmVMb2FkZWQoY2FsbGJhY2s6ICh0ZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblRleHR1cmVMb2FkZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGV4dHVyZUxvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uVGV4dHVyZUxvYWRlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25UZXh0dXJlTG9hZGVkT2JzZXJ2ZXIgPSB0aGlzLm9uVGV4dHVyZUxvYWRlZE9ic2VydmFibGUuYWRkKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWF0ZXJpYWwgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8TWF0ZXJpYWw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25NYXRlcmlhbExvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxNYXRlcmlhbD4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWF0ZXJpYWwgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbk1hdGVyaWFsTG9hZGVkKGNhbGxiYWNrOiAobWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uTWF0ZXJpYWxMb2FkZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbk1hdGVyaWFsTG9hZGVkT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vbk1hdGVyaWFsTG9hZGVkT2JzZXJ2ZXIgPSB0aGlzLm9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIGNhbWVyYSBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIGNhbWVyYS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uQ2FtZXJhTG9hZGVkT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPENhbWVyYT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vbkNhbWVyYUxvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxDYW1lcmE+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIGNhbWVyYSBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIGNhbWVyYS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbkNhbWVyYUxvYWRlZChjYWxsYmFjazogKGNhbWVyYTogQ2FtZXJhKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2FtZXJhTG9hZGVkT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNhbWVyYUxvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uQ2FtZXJhTG9hZGVkT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vbkNhbWVyYUxvYWRlZE9ic2VydmVyID0gdGhpcy5vbkNhbWVyYUxvYWRlZE9ic2VydmFibGUuYWRkKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGFzc2V0IGlzIGNvbXBsZXRlbHkgbG9hZGVkLCBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGxvYWRlciBpcyBkaXNwb3NlZC5cclxuICAgICAqIEZvciBhc3NldHMgd2l0aCBMT0RzLCByYWlzZWQgd2hlbiBhbGwgb2YgdGhlIExPRHMgYXJlIGNvbXBsZXRlLlxyXG4gICAgICogRm9yIGFzc2V0cyB3aXRob3V0IExPRHMsIHJhaXNlZCB3aGVuIHRoZSBtb2RlbCBpcyBjb21wbGV0ZSwgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGxvYWRlciByZXNvbHZlcyB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uQ29tcGxldGVPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8dm9pZD4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vbkNvbXBsZXRlT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPHZvaWQ+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBhc3NldCBpcyBjb21wbGV0ZWx5IGxvYWRlZCwgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBsb2FkZXIgaXMgZGlzcG9zZWQuXHJcbiAgICAgKiBGb3IgYXNzZXRzIHdpdGggTE9EcywgcmFpc2VkIHdoZW4gYWxsIG9mIHRoZSBMT0RzIGFyZSBjb21wbGV0ZS5cclxuICAgICAqIEZvciBhc3NldHMgd2l0aG91dCBMT0RzLCByYWlzZWQgd2hlbiB0aGUgbW9kZWwgaXMgY29tcGxldGUsIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBsb2FkZXIgcmVzb2x2ZXMgdGhlIHJldHVybmVkIHByb21pc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25Db21wbGV0ZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkNvbXBsZXRlT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5yZW1vdmUodGhpcy5fb25Db21wbGV0ZU9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25Db21wbGV0ZU9ic2VydmVyID0gdGhpcy5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvbkVycm9yT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPGFueT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vbkVycm9yT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPGFueT4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uRXJyb3IoY2FsbGJhY2s6IChyZWFzb246IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkVycm9yT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yT2JzZXJ2YWJsZS5yZW1vdmUodGhpcy5fb25FcnJvck9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25FcnJvck9ic2VydmVyID0gdGhpcy5vbkVycm9yT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgYWZ0ZXIgdGhlIGxvYWRlciBpcyBkaXNwb3NlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uRGlzcG9zZU9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTx2b2lkPigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uRGlzcG9zZU9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjx2b2lkPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayByYWlzZWQgYWZ0ZXIgdGhlIGxvYWRlciBpcyBkaXNwb3NlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbkRpc3Bvc2UoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25EaXNwb3NlT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkRpc3Bvc2VPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbkRpc3Bvc2VPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29uRGlzcG9zZU9ic2VydmVyID0gdGhpcy5vbkRpc3Bvc2VPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCBhZnRlciBhIGxvYWRlciBleHRlbnNpb24gaXMgY3JlYXRlZC5cclxuICAgICAqIFNldCBhZGRpdGlvbmFsIG9wdGlvbnMgZm9yIGEgbG9hZGVyIGV4dGVuc2lvbiBpbiB0aGlzIGV2ZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8SUdMVEZMb2FkZXJFeHRlbnNpb24+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25FeHRlbnNpb25Mb2FkZWRPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8SUdMVEZMb2FkZXJFeHRlbnNpb24+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCBhZnRlciBhIGxvYWRlciBleHRlbnNpb24gaXMgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbkV4dGVuc2lvbkxvYWRlZChjYWxsYmFjazogKGV4dGVuc2lvbjogSUdMVEZMb2FkZXJFeHRlbnNpb24pID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25FeHRlbnNpb25Mb2FkZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uRXh0ZW5zaW9uTG9hZGVkT2JzZXJ2YWJsZS5yZW1vdmUodGhpcy5fb25FeHRlbnNpb25Mb2FkZWRPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29uRXh0ZW5zaW9uTG9hZGVkT2JzZXJ2ZXIgPSB0aGlzLm9uRXh0ZW5zaW9uTG9hZGVkT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIGxvZ2dpbmcgaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBsb2dnaW5nRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9nZ2luZ0VuYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsb2dnaW5nRW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2dnaW5nRW5hYmxlZCA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG9nZ2luZ0VuYWJsZWQgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xvZ2dpbmdFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZyA9IHRoaXMuX2xvZ0VuYWJsZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9nID0gdGhpcy5fbG9nRGlzYWJsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBjYXB0dXJlIHBlcmZvcm1hbmNlIGNvdW50ZXJzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNhcHR1cmVQZXJmb3JtYW5jZUNvdW50ZXJzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXB0dXJlUGVyZm9ybWFuY2VDb3VudGVycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGNhcHR1cmVQZXJmb3JtYW5jZUNvdW50ZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NhcHR1cmVQZXJmb3JtYW5jZUNvdW50ZXJzID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jYXB0dXJlUGVyZm9ybWFuY2VDb3VudGVycyA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fY2FwdHVyZVBlcmZvcm1hbmNlQ291bnRlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIgPSB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlckVuYWJsZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFBlcmZvcm1hbmNlQ291bnRlciA9IHRoaXMuX2VuZFBlcmZvcm1hbmNlQ291bnRlckVuYWJsZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIgPSB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlckRpc2FibGVkO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIgPSB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXJEaXNhYmxlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIHZhbGlkYXRlIHRoZSBhc3NldC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHZhbGlkYXRlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCBhZnRlciB2YWxpZGF0aW9uIHdoZW4gdmFsaWRhdGUgaXMgc2V0IHRvIHRydWUuIFRoZSBldmVudCBkYXRhIGlzIHRoZSByZXN1bHQgb2YgdGhlIHZhbGlkYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvblZhbGlkYXRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxHTFRGMi5JR0xURlZhbGlkYXRpb25SZXN1bHRzPigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uVmFsaWRhdGVkT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPEdMVEYyLklHTFRGVmFsaWRhdGlvblJlc3VsdHM+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCBhZnRlciBhIGxvYWRlciBleHRlbnNpb24gaXMgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvblZhbGlkYXRlZChjYWxsYmFjazogKHJlc3VsdHM6IEdMVEYyLklHTFRGVmFsaWRhdGlvblJlc3VsdHMpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25WYWxpZGF0ZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGVkT2JzZXJ2YWJsZS5yZW1vdmUodGhpcy5fb25WYWxpZGF0ZWRPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29uVmFsaWRhdGVkT2JzZXJ2ZXIgPSB0aGlzLm9uVmFsaWRhdGVkT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRlcjogTnVsbGFibGU8SUdMVEZMb2FkZXI+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3N0YXRlOiBOdWxsYWJsZTxHTFRGTG9hZGVyU3RhdGU+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3Byb2dyZXNzQ2FsbGJhY2s/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9yZXF1ZXN0cyA9IG5ldyBBcnJheTxJRmlsZVJlcXVlc3RJbmZvPigpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9NYWdpY0Jhc2U2NEVuY29kZWQgPSBcIloyeFVSZ1wiOyAvLyBcImdsVEZcIiBiYXNlNjQgZW5jb2RlZCAod2l0aG91dCB0aGUgcXVvdGVzISlcclxuXHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgdGhlIGxvYWRlciAoXCJnbHRmXCIpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuYW1lID0gXCJnbHRmXCI7XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGV4dGVuc2lvbnM6IElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMgPSB7XHJcbiAgICAgICAgXCIuZ2x0ZlwiOiB7IGlzQmluYXJ5OiBmYWxzZSB9LFxyXG4gICAgICAgIFwiLmdsYlwiOiB7IGlzQmluYXJ5OiB0cnVlIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZXMgdGhlIGxvYWRlciwgcmVsZWFzZXMgcmVzb3VyY2VzIGR1cmluZyBsb2FkLCBhbmQgY2FuY2VscyBhbnkgb3V0c3RhbmRpbmcgcmVxdWVzdHMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcmVxdWVzdCBvZiB0aGlzLl9yZXF1ZXN0cykge1xyXG4gICAgICAgICAgICByZXF1ZXN0LmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9yZXF1ZXN0cy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBkZWxldGUgdGhpcy5fcHJvZ3Jlc3NDYWxsYmFjaztcclxuXHJcbiAgICAgICAgdGhpcy5wcmVwcm9jZXNzVXJsQXN5bmMgPSAodXJsKSA9PiBQcm9taXNlLnJlc29sdmUodXJsKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbk1lc2hMb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5vblNraW5Mb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5vblRleHR1cmVMb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5vbk1hdGVyaWFsTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25DYW1lcmFMb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25EaXNwb3NlT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnModW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLm9uRGlzcG9zZU9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEZpbGUoXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGZpbGVPclVybDogRmlsZSB8IHN0cmluZyB8IEFycmF5QnVmZmVyVmlldyxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoZGF0YTogYW55LCByZXNwb25zZVVSTD86IHN0cmluZykgPT4gdm9pZCxcclxuICAgICAgICBvblByb2dyZXNzPzogKGV2OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLFxyXG4gICAgICAgIHVzZUFycmF5QnVmZmVyPzogYm9vbGVhbixcclxuICAgICAgICBvbkVycm9yPzogKHJlcXVlc3Q/OiBXZWJSZXF1ZXN0LCBleGNlcHRpb24/OiBMb2FkRmlsZUVycm9yKSA9PiB2b2lkLFxyXG4gICAgICAgIG5hbWU/OiBzdHJpbmdcclxuICAgICk6IE51bGxhYmxlPElGaWxlUmVxdWVzdD4ge1xyXG4gICAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZmlsZU9yVXJsKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQmluYXJ5KHNjZW5lLCBmaWxlT3JVcmwgYXMgQXJyYXlCdWZmZXJWaWV3LCByb290VXJsLCBvblN1Y2Nlc3MsIG9uRXJyb3IsIG5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2dyZXNzQ2FsbGJhY2sgPSBvblByb2dyZXNzO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IChmaWxlT3JVcmwgYXMgRmlsZSkubmFtZSB8fCBUb29scy5HZXRGaWxlbmFtZShmaWxlT3JVcmwgYXMgc3RyaW5nKTtcclxuXHJcbiAgICAgICAgaWYgKHVzZUFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZVJhbmdlUmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm4oXCJnbFRGIHZhbGlkYXRpb24gaXMgbm90IHN1cHBvcnRlZCB3aGVuIHJhbmdlIHJlcXVlc3RzIGFyZSBlbmFibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVSZXF1ZXN0OiBJRmlsZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWJvcnQ6ICgpID0+IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVPYnNlcnZhYmxlOiBuZXcgT2JzZXJ2YWJsZTxJRmlsZVJlcXVlc3Q+KCksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFCdWZmZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldDogbnVtYmVyLCBieXRlTGVuZ3RoOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEFycmF5QnVmZmVyVmlldz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEZpbGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU9yVXJsIGFzIEZpbGUgfCBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheShkYXRhIGFzIEFycmF5QnVmZmVyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdlYlJlcXVlc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiUmFuZ2VcIiwgYGJ5dGVzPSR7Ynl0ZU9mZnNldH0tJHtieXRlT2Zmc2V0ICsgYnl0ZUxlbmd0aCAtIDF9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiAwLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bnBhY2tCaW5hcnlBc3luYyhuZXcgRGF0YVJlYWRlcihkYXRhQnVmZmVyKSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAobG9hZGVyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlUmVxdWVzdC5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnMoZmlsZVJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MobG9hZGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yID8gKGVycm9yKSA9PiBvbkVycm9yKHVuZGVmaW5lZCwgZXJyb3IpIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUmVxdWVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRGaWxlKFxyXG4gICAgICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgICAgICBmaWxlT3JVcmwgYXMgRmlsZSB8IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIG5ldyBVaW50OEFycmF5KGRhdGEgYXMgQXJyYXlCdWZmZXIpLCByb290VXJsLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW5wYWNrQmluYXJ5QXN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRhUmVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRBc3luYzogKGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpID0+IHJlYWRBc3luYyhkYXRhIGFzIEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IChkYXRhIGFzIEFycmF5QnVmZmVyKS5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvYWRlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhsb2FkZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvciA/IChlcnJvcikgPT4gb25FcnJvcih1bmRlZmluZWQsIGVycm9yKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uRXJyb3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkRmlsZShcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIGZpbGVPclVybCBhcyBGaWxlIHwgc3RyaW5nLFxyXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIG5ldyBVaW50OEFycmF5KGRhdGEgYXMgQXJyYXlCdWZmZXIpLCByb290VXJsLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoeyBqc29uOiB0aGlzLl9wYXJzZUpzb24oZGF0YSBhcyBzdHJpbmcpIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1c2VBcnJheUJ1ZmZlcixcclxuICAgICAgICAgICAgb25FcnJvclxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgX2xvYWRCaW5hcnkoXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGRhdGE6IEFycmF5QnVmZmVyVmlldyxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoZGF0YTogYW55LCByZXNwb25zZVVSTD86IHN0cmluZykgPT4gdm9pZCxcclxuICAgICAgICBvbkVycm9yPzogKHJlcXVlc3Q/OiBXZWJSZXF1ZXN0LCBleGNlcHRpb24/OiBMb2FkRmlsZUVycm9yKSA9PiB2b2lkLFxyXG4gICAgICAgIGZpbGVOYW1lPzogc3RyaW5nXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl92YWxpZGF0ZShzY2VuZSwgZGF0YSwgcm9vdFVybCwgZmlsZU5hbWUpO1xyXG4gICAgICAgIHRoaXMuX3VucGFja0JpbmFyeUFzeW5jKFxyXG4gICAgICAgICAgICBuZXcgRGF0YVJlYWRlcih7XHJcbiAgICAgICAgICAgICAgICByZWFkQXN5bmM6IChieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSA9PiByZWFkVmlld0FzeW5jKGRhdGEsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogZGF0YS5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICkudGhlbihcclxuICAgICAgICAgICAgKGxvYWRlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhsb2FkZXJEYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FcnJvciA/IChlcnJvcikgPT4gb25FcnJvcih1bmRlZmluZWQsIGVycm9yKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydE1lc2hBc3luYyhcclxuICAgICAgICBtZXNoZXNOYW1lczogYW55LFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBkYXRhOiBhbnksXHJcbiAgICAgICAgcm9vdFVybDogc3RyaW5nLFxyXG4gICAgICAgIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsXHJcbiAgICAgICAgZmlsZU5hbWU/OiBzdHJpbmdcclxuICAgICk6IFByb21pc2U8SVNjZW5lTG9hZGVyQXN5bmNSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnNlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvZyhgTG9hZGluZyAke2ZpbGVOYW1lIHx8IFwiXCJ9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlciA9IHRoaXMuX2dldExvYWRlcihkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5pbXBvcnRNZXNoQXN5bmMobWVzaGVzTmFtZXMsIHNjZW5lLCBudWxsLCBkYXRhLCByb290VXJsLCBvblByb2dyZXNzLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nLCBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLCBmaWxlTmFtZT86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnNlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFyc2VkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9nKGBMb2FkaW5nICR7ZmlsZU5hbWUgfHwgXCJcIn1gKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyID0gdGhpcy5fZ2V0TG9hZGVyKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWRBc3luYyhzY2VuZSwgZGF0YSwgcm9vdFVybCwgb25Qcm9ncmVzcywgZmlsZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXNzZXRDb250YWluZXJBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nLCBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLCBmaWxlTmFtZT86IHN0cmluZyk6IFByb21pc2U8QXNzZXRDb250YWluZXI+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnNlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvZyhgTG9hZGluZyAke2ZpbGVOYW1lIHx8IFwiXCJ9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlciA9IHRoaXMuX2dldExvYWRlcihkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByZXBhcmUgdGhlIGFzc2V0IGNvbnRhaW5lci5cclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gbmV3IEFzc2V0Q29udGFpbmVyKHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBtYXRlcmlhbHMvdGV4dHVyZXMgd2hlbiBsb2FkaW5nIHRvIGFkZCB0byBjb250YWluZXJcclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWxzOiBBcnJheTxNYXRlcmlhbD4gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsTG9hZGVkT2JzZXJ2YWJsZS5hZGQoKG1hdGVyaWFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0dXJlczogQXJyYXk8QmFzZVRleHR1cmU+ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMub25UZXh0dXJlTG9hZGVkT2JzZXJ2YWJsZS5hZGQoKHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVzLnB1c2godGV4dHVyZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBjYW1lcmFzOiBBcnJheTxDYW1lcmE+ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMub25DYW1lcmFMb2FkZWRPYnNlcnZhYmxlLmFkZCgoY2FtZXJhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmFzLnB1c2goY2FtZXJhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb3JwaFRhcmdldE1hbmFnZXJzOiBBcnJheTxNb3JwaFRhcmdldE1hbmFnZXI+ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMub25NZXNoTG9hZGVkT2JzZXJ2YWJsZS5hZGQoKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNoLm1vcnBoVGFyZ2V0TWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoVGFyZ2V0TWFuYWdlcnMucHVzaChtZXNoLm1vcnBoVGFyZ2V0TWFuYWdlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5pbXBvcnRNZXNoQXN5bmMobnVsbCwgc2NlbmUsIGNvbnRhaW5lciwgZGF0YSwgcm9vdFVybCwgb25Qcm9ncmVzcywgZmlsZU5hbWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLmdlb21ldHJpZXMsIHJlc3VsdC5nZW9tZXRyaWVzKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci5tZXNoZXMsIHJlc3VsdC5tZXNoZXMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLnBhcnRpY2xlU3lzdGVtcywgcmVzdWx0LnBhcnRpY2xlU3lzdGVtcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIuc2tlbGV0b25zLCByZXN1bHQuc2tlbGV0b25zKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci5hbmltYXRpb25Hcm91cHMsIHJlc3VsdC5hbmltYXRpb25Hcm91cHMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLm1hdGVyaWFscywgbWF0ZXJpYWxzKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci50ZXh0dXJlcywgdGV4dHVyZXMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLmxpZ2h0cywgcmVzdWx0LmxpZ2h0cyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIudHJhbnNmb3JtTm9kZXMsIHJlc3VsdC50cmFuc2Zvcm1Ob2Rlcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIuY2FtZXJhcywgY2FtZXJhcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIubW9ycGhUYXJnZXRNYW5hZ2VycywgbW9ycGhUYXJnZXRNYW5hZ2Vycyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FuRGlyZWN0TG9hZChkYXRhOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAoZGF0YS5pbmRleE9mKFwiYXNzZXRcIikgIT09IC0xICYmIGRhdGEuaW5kZXhPZihcInZlcnNpb25cIikgIT09IC0xKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmJhc2U2NCxcIiArIEdMVEZGaWxlTG9hZGVyLl9NYWdpY0Jhc2U2NEVuY29kZWQpIHx8IC8vIHRoaXMgaXMgdGVjaG5pY2FsbHkgaW5jb3JyZWN0LCBidXQgd2lsbCBjb250aW51ZSB0byBzdXBwb3J0IGZvciBiYWNrY29tcGF0LlxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOjtiYXNlNjQsXCIgKyBHTFRGRmlsZUxvYWRlci5fTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIgKyBHTFRGRmlsZUxvYWRlci5fTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOm1vZGVsL2dsdGYtYmluYXJ5O2Jhc2U2NCxcIiArIEdMVEZGaWxlTG9hZGVyLl9NYWdpY0Jhc2U2NEVuY29kZWQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlyZWN0TG9hZChzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJiYXNlNjQsXCIgKyBHTFRGRmlsZUxvYWRlci5fTWFnaWNCYXNlNjRFbmNvZGVkKSB8fCAvLyB0aGlzIGlzIHRlY2huaWNhbGx5IGluY29ycmVjdCwgYnV0IHdpbGwgY29udGludWUgdG8gc3VwcG9ydCBmb3IgYmFja2NvbXBhdC5cclxuICAgICAgICAgICAgZGF0YS5zdGFydHNXaXRoKFwiO2Jhc2U2NCxcIiArIEdMVEZGaWxlTG9hZGVyLl9NYWdpY0Jhc2U2NEVuY29kZWQpIHx8XHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnRzV2l0aChcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIgKyBHTFRGRmlsZUxvYWRlci5fTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJtb2RlbC9nbHRmLWJpbmFyeTtiYXNlNjQsXCIgKyBHTFRGRmlsZUxvYWRlci5fTWFnaWNCYXNlNjRFbmNvZGVkKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnJheUJ1ZmZlciA9IERlY29kZUJhc2U2NFVybFRvQmluYXJ5KGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91bnBhY2tCaW5hcnlBc3luYyhcclxuICAgICAgICAgICAgICAgIG5ldyBEYXRhUmVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkQXN5bmM6IChieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSA9PiByZWFkQXN5bmMoYXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBqc29uOiB0aGlzLl9wYXJzZUpzb24oZGF0YSkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY2FsbGJhY2sgdGhhdCBhbGxvd3MgY3VzdG9tIGhhbmRsaW5nIG9mIHRoZSByb290IHVybCBiYXNlZCBvbiB0aGUgcmVzcG9uc2UgdXJsLlxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgdGhlIG9yaWdpbmFsIHJvb3QgdXJsXHJcbiAgICAgKiBAcGFyYW0gcmVzcG9uc2VVUkwgdGhlIHJlc3BvbnNlIHVybCBpZiBhdmFpbGFibGVcclxuICAgICAqIEByZXR1cm5zIHRoZSBuZXcgcm9vdCB1cmxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJld3JpdGVSb290VVJMPyhyb290VXJsOiBzdHJpbmcsIHJlc3BvbnNlVVJMPzogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVQbHVnaW4oKTogSVNjZW5lTG9hZGVyUGx1Z2luIHwgSVNjZW5lTG9hZGVyUGx1Z2luQXN5bmMge1xyXG4gICAgICAgIHJldHVybiBuZXcgR0xURkZpbGVMb2FkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkZXIgc3RhdGUgb3IgbnVsbCBpZiB0aGUgbG9hZGVyIGlzIG5vdCBhY3RpdmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbG9hZGVyU3RhdGUoKTogTnVsbGFibGU8R0xURkxvYWRlclN0YXRlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiB0aGUgbG9hZGVyIHN0YXRlIGNoYW5nZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkxvYWRlclN0YXRlQ2hhbmdlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxOdWxsYWJsZTxHTFRGTG9hZGVyU3RhdGU+PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhc3NldCBpcyBjb21wbGV0ZWx5IGxvYWRlZC5cclxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGFzc2V0IGlzIGNvbXBsZXRlbHkgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2hlbkNvbXBsZXRlQXN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5hZGRPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMub25FcnJvck9ic2VydmFibGUuYWRkT25jZSgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9zZXRTdGF0ZShzdGF0ZTogR0xURkxvYWRlclN0YXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBzdGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMub25Mb2FkZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyh0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5fbG9nKEdMVEZMb2FkZXJTdGF0ZVt0aGlzLl9zdGF0ZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfbG9hZEZpbGUoXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGZpbGVPclVybDogRmlsZSB8IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6IChkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcikgPT4gdm9pZCxcclxuICAgICAgICB1c2VBcnJheUJ1ZmZlcj86IGJvb2xlYW4sXHJcbiAgICAgICAgb25FcnJvcj86IChyZXF1ZXN0PzogV2ViUmVxdWVzdCkgPT4gdm9pZCxcclxuICAgICAgICBvbk9wZW5lZD86IChyZXF1ZXN0OiBXZWJSZXF1ZXN0KSA9PiB2b2lkXHJcbiAgICApOiBJRmlsZVJlcXVlc3Qge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBzY2VuZS5fbG9hZEZpbGUoXHJcbiAgICAgICAgICAgIGZpbGVPclVybCxcclxuICAgICAgICAgICAgb25TdWNjZXNzLFxyXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uUHJvZ3Jlc3MoZXZlbnQsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICB1c2VBcnJheUJ1ZmZlcixcclxuICAgICAgICAgICAgb25FcnJvcixcclxuICAgICAgICAgICAgb25PcGVuZWRcclxuICAgICAgICApIGFzIElGaWxlUmVxdWVzdEluZm87XHJcbiAgICAgICAgcmVxdWVzdC5vbkNvbXBsZXRlT2JzZXJ2YWJsZS5hZGQoKHJlcXVlc3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMuc3BsaWNlKHRoaXMuX3JlcXVlc3RzLmluZGV4T2YocmVxdWVzdCksIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX3JlcXVlc3RzLnB1c2gocmVxdWVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfb25Qcm9ncmVzcyhldmVudDogUHJvZ3Jlc3NFdmVudCwgcmVxdWVzdDogSUZpbGVSZXF1ZXN0SW5mbyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fcHJvZ3Jlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0Ll9sZW5ndGhDb21wdXRhYmxlID0gZXZlbnQubGVuZ3RoQ29tcHV0YWJsZTtcclxuICAgICAgICByZXF1ZXN0Ll9sb2FkZWQgPSBldmVudC5sb2FkZWQ7XHJcbiAgICAgICAgcmVxdWVzdC5fdG90YWwgPSBldmVudC50b3RhbDtcclxuXHJcbiAgICAgICAgbGV0IGxlbmd0aENvbXB1dGFibGUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBsb2FkZWQgPSAwO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICAgICAgZm9yIChjb25zdCByZXF1ZXN0IG9mIHRoaXMuX3JlcXVlc3RzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Ll9sZW5ndGhDb21wdXRhYmxlID09PSB1bmRlZmluZWQgfHwgcmVxdWVzdC5fbG9hZGVkID09PSB1bmRlZmluZWQgfHwgcmVxdWVzdC5fdG90YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZW5ndGhDb21wdXRhYmxlID0gbGVuZ3RoQ29tcHV0YWJsZSAmJiByZXF1ZXN0Ll9sZW5ndGhDb21wdXRhYmxlO1xyXG4gICAgICAgICAgICBsb2FkZWQgKz0gcmVxdWVzdC5fbG9hZGVkO1xyXG4gICAgICAgICAgICB0b3RhbCArPSByZXF1ZXN0Ll90b3RhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3Byb2dyZXNzQ2FsbGJhY2soe1xyXG4gICAgICAgICAgICBsZW5ndGhDb21wdXRhYmxlOiBsZW5ndGhDb21wdXRhYmxlLFxyXG4gICAgICAgICAgICBsb2FkZWQ6IGxvYWRlZCxcclxuICAgICAgICAgICAgdG90YWw6IGxlbmd0aENvbXB1dGFibGUgPyB0b3RhbCA6IDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGUoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlclZpZXcsIHJvb3RVcmwgPSBcIlwiLCBmaWxlTmFtZSA9IFwiXCIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJWYWxpZGF0ZSBKU09OXCIpO1xyXG4gICAgICAgIEdMVEZWYWxpZGF0aW9uLlZhbGlkYXRlQXN5bmMoZGF0YSwgcm9vdFVybCwgZmlsZU5hbWUsICh1cmkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcHJvY2Vzc1VybEFzeW5jKHJvb3RVcmwgKyB1cmkpLnRoZW4oKHVybCkgPT4gc2NlbmUuX2xvYWRGaWxlQXN5bmModXJsLCB1bmRlZmluZWQsIHRydWUsIHRydWUpIGFzIFByb21pc2U8QXJyYXlCdWZmZXI+KTtcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJWYWxpZGF0ZSBKU09OXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJWYWxpZGF0ZSBKU09OXCIpO1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRmFpbGVkIHRvIHZhbGlkYXRlOiAke3JlYXNvbi5tZXNzYWdlfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0TG9hZGVyKGxvYWRlckRhdGE6IElHTFRGTG9hZGVyRGF0YSk6IElHTFRGTG9hZGVyIHtcclxuICAgICAgICBjb25zdCBhc3NldCA9ICg8YW55PmxvYWRlckRhdGEuanNvbikuYXNzZXQgfHwge307XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZyhgQXNzZXQgdmVyc2lvbjogJHthc3NldC52ZXJzaW9ufWApO1xyXG4gICAgICAgIGFzc2V0Lm1pblZlcnNpb24gJiYgdGhpcy5fbG9nKGBBc3NldCBtaW5pbXVtIHZlcnNpb246ICR7YXNzZXQubWluVmVyc2lvbn1gKTtcclxuICAgICAgICBhc3NldC5nZW5lcmF0b3IgJiYgdGhpcy5fbG9nKGBBc3NldCBnZW5lcmF0b3I6ICR7YXNzZXQuZ2VuZXJhdG9yfWApO1xyXG5cclxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gR0xURkZpbGVMb2FkZXIuX3BhcnNlVmVyc2lvbihhc3NldC52ZXJzaW9uKTtcclxuICAgICAgICBpZiAoIXZlcnNpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2ZXJzaW9uOiBcIiArIGFzc2V0LnZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFzc2V0Lm1pblZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW5WZXJzaW9uID0gR0xURkZpbGVMb2FkZXIuX3BhcnNlVmVyc2lvbihhc3NldC5taW5WZXJzaW9uKTtcclxuICAgICAgICAgICAgaWYgKCFtaW5WZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG1pbmltdW0gdmVyc2lvbjogXCIgKyBhc3NldC5taW5WZXJzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEdMVEZGaWxlTG9hZGVyLl9jb21wYXJlVmVyc2lvbihtaW5WZXJzaW9uLCB7IG1ham9yOiAyLCBtaW5vcjogMCB9KSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29tcGF0aWJsZSBtaW5pbXVtIHZlcnNpb246IFwiICsgYXNzZXQubWluVmVyc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxvYWRlcnM6IHsgW2tleTogbnVtYmVyXTogKHBhcmVudDogR0xURkZpbGVMb2FkZXIpID0+IElHTFRGTG9hZGVyIH0gPSB7XHJcbiAgICAgICAgICAgIDE6IEdMVEZGaWxlTG9hZGVyLl9DcmVhdGVHTFRGMUxvYWRlcixcclxuICAgICAgICAgICAgMjogR0xURkZpbGVMb2FkZXIuX0NyZWF0ZUdMVEYyTG9hZGVyLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxvYWRlciA9IGNyZWF0ZUxvYWRlcnNbdmVyc2lvbi5tYWpvcl07XHJcbiAgICAgICAgaWYgKCFjcmVhdGVMb2FkZXIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyBhc3NldC52ZXJzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2FkZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyc2VKc29uKGpzb246IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJQYXJzZSBKU09OXCIpO1xyXG4gICAgICAgIHRoaXMuX2xvZyhgSlNPTiBsZW5ndGg6ICR7anNvbi5sZW5ndGh9YCk7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJQYXJzZSBKU09OXCIpO1xyXG4gICAgICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5wYWNrQmluYXJ5QXN5bmMoZGF0YVJlYWRlcjogRGF0YVJlYWRlcik6IFByb21pc2U8SUdMVEZMb2FkZXJEYXRhPiB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJVbnBhY2sgQmluYXJ5XCIpO1xyXG5cclxuICAgICAgICAvLyBSZWFkIG1hZ2ljICsgdmVyc2lvbiArIGxlbmd0aCArIGpzb24gbGVuZ3RoICsganNvbiBmb3JtYXRcclxuICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoMjApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBCaW5hcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBNYWdpYzogMHg0NjU0NmM2NyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hZ2ljID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgIGlmIChtYWdpYyAhPT0gQmluYXJ5Lk1hZ2ljKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFwiVW5leHBlY3RlZCBtYWdpYzogXCIgKyBtYWdpYywgRXJyb3JDb2Rlcy5HTFRGTG9hZGVyVW5leHBlY3RlZE1hZ2ljRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dnaW5nRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKGBCaW5hcnkgdmVyc2lvbjogJHt2ZXJzaW9ufWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBkYXRhUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZVJhbmdlUmVxdWVzdHMgJiYgbGVuZ3RoICE9PSBkYXRhUmVhZGVyLmJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuV2FybihgTGVuZ3RoIGluIGhlYWRlciBkb2VzIG5vdCBtYXRjaCBhY3R1YWwgZGF0YSBsZW5ndGg6ICR7bGVuZ3RofSAhPSAke2RhdGFSZWFkZXIuYnVmZmVyLmJ5dGVMZW5ndGh9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bnBhY2tlZDogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMToge1xyXG4gICAgICAgICAgICAgICAgICAgIHVucGFja2VkID0gdGhpcy5fdW5wYWNrQmluYXJ5VjFBc3luYyhkYXRhUmVhZGVyLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wYWNrZWQgPSB0aGlzLl91bnBhY2tCaW5hcnlWMkFzeW5jKGRhdGFSZWFkZXIsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyB2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyKFwiVW5wYWNrIEJpbmFyeVwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1bnBhY2tlZDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91bnBhY2tCaW5hcnlWMUFzeW5jKGRhdGFSZWFkZXI6IERhdGFSZWFkZXIsIGxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+IHtcclxuICAgICAgICBjb25zdCBDb250ZW50Rm9ybWF0ID0ge1xyXG4gICAgICAgICAgICBKU09OOiAwLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBkYXRhUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICBjb25zdCBjb250ZW50Rm9ybWF0ID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50Rm9ybWF0ICE9PSBDb250ZW50Rm9ybWF0LkpTT04pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGNvbnRlbnQgZm9ybWF0OiAke2NvbnRlbnRGb3JtYXR9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib2R5TGVuZ3RoID0gbGVuZ3RoIC0gZGF0YVJlYWRlci5ieXRlT2Zmc2V0O1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhOiBJR0xURkxvYWRlckRhdGEgPSB7IGpzb246IHRoaXMuX3BhcnNlSnNvbihkYXRhUmVhZGVyLnJlYWRTdHJpbmcoY29udGVudExlbmd0aCkpLCBiaW46IG51bGwgfTtcclxuICAgICAgICBpZiAoYm9keUxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydEJ5dGVPZmZzZXQgPSBkYXRhUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIGRhdGEuYmluID0ge1xyXG4gICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gZGF0YVJlYWRlci5idWZmZXIucmVhZEFzeW5jKHN0YXJ0Qnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogYm9keUxlbmd0aCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5wYWNrQmluYXJ5VjJBc3luYyhkYXRhUmVhZGVyOiBEYXRhUmVhZGVyLCBsZW5ndGg6IG51bWJlcik6IFByb21pc2U8SUdMVEZMb2FkZXJEYXRhPiB7XHJcbiAgICAgICAgY29uc3QgQ2h1bmtGb3JtYXQgPSB7XHJcbiAgICAgICAgICAgIEpTT046IDB4NGU0ZjUzNGEsXHJcbiAgICAgICAgICAgIEJJTjogMHgwMDRlNDk0MixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZWFkIHRoZSBKU09OIGNodW5rIGhlYWRlci5cclxuICAgICAgICBjb25zdCBjaHVua0xlbmd0aCA9IGRhdGFSZWFkZXIucmVhZFVpbnQzMigpO1xyXG4gICAgICAgIGNvbnN0IGNodW5rRm9ybWF0ID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgaWYgKGNodW5rRm9ybWF0ICE9PSBDaHVua0Zvcm1hdC5KU09OKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpcnN0IGNodW5rIGZvcm1hdCBpcyBub3QgSlNPTlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEJhaWwgaWYgdGhlcmUgYXJlIG5vIG90aGVyIGNodW5rcy5cclxuICAgICAgICBpZiAoZGF0YVJlYWRlci5ieXRlT2Zmc2V0ICsgY2h1bmtMZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoY2h1bmtMZW5ndGgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsganNvbjogdGhpcy5fcGFyc2VKc29uKGRhdGFSZWFkZXIucmVhZFN0cmluZyhjaHVua0xlbmd0aCkpLCBiaW46IG51bGwgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWFkIHRoZSBKU09OIGNodW5rIGFuZCB0aGUgbGVuZ3RoIGFuZCB0eXBlIG9mIHRoZSBuZXh0IGNodW5rLlxyXG4gICAgICAgIHJldHVybiBkYXRhUmVhZGVyLmxvYWRBc3luYyhjaHVua0xlbmd0aCArIDgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhOiBJR0xURkxvYWRlckRhdGEgPSB7IGpzb246IHRoaXMuX3BhcnNlSnNvbihkYXRhUmVhZGVyLnJlYWRTdHJpbmcoY2h1bmtMZW5ndGgpKSwgYmluOiBudWxsIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWFkQXN5bmMgPSAoKTogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rTGVuZ3RoID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVua0Zvcm1hdCA9IGRhdGFSZWFkZXIucmVhZFVpbnQzMigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2h1bmtGb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENodW5rRm9ybWF0LkpTT046IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBKU09OIGNodW5rXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENodW5rRm9ybWF0LkJJTjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEJ5dGVPZmZzZXQgPSBkYXRhUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYmluID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gZGF0YVJlYWRlci5idWZmZXIucmVhZEFzeW5jKHN0YXJ0Qnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogY2h1bmtMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSZWFkZXIuc2tpcEJ5dGVzKGNodW5rTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIHVucmVjb2duaXplZCBjaHVua0Zvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUmVhZGVyLnNraXBCeXRlcyhjaHVua0xlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVJlYWRlci5ieXRlT2Zmc2V0ICE9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoOCkudGhlbihyZWFkQXN5bmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVhZEFzeW5jKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BhcnNlVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcpOiBOdWxsYWJsZTx7IG1ham9yOiBudW1iZXI7IG1pbm9yOiBudW1iZXIgfT4ge1xyXG4gICAgICAgIGlmICh2ZXJzaW9uID09PSBcIjEuMFwiIHx8IHZlcnNpb24gPT09IFwiMS4wLjFcIikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWFqb3I6IDEsXHJcbiAgICAgICAgICAgICAgICBtaW5vcjogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gKHZlcnNpb24gKyBcIlwiKS5tYXRjaCgvXihcXGQrKVxcLihcXGQrKS8pO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtYWpvcjogcGFyc2VJbnQobWF0Y2hbMV0pLFxyXG4gICAgICAgICAgICBtaW5vcjogcGFyc2VJbnQobWF0Y2hbMl0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NvbXBhcmVWZXJzaW9uKGE6IHsgbWFqb3I6IG51bWJlcjsgbWlub3I6IG51bWJlciB9LCBiOiB7IG1ham9yOiBudW1iZXI7IG1pbm9yOiBudW1iZXIgfSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGEubWFqb3IgPiBiLm1ham9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5tYWpvciA8IGIubWFqb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5taW5vciA+IGIubWlub3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhLm1pbm9yIDwgYi5taW5vcikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9sb2dTcGFjZXMgPSBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI7XHJcbiAgICBwcml2YXRlIF9sb2dJbmRlbnRMZXZlbCA9IDA7XHJcbiAgICBwcml2YXRlIF9sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfbG9nID0gdGhpcy5fbG9nRGlzYWJsZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2dPcGVuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xvZyhtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLl9sb2dJbmRlbnRMZXZlbCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfbG9nQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgLS10aGlzLl9sb2dJbmRlbnRMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2dFbmFibGVkKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9IEdMVEZGaWxlTG9hZGVyLl9sb2dTcGFjZXMuc3Vic3RyKDAsIHRoaXMuX2xvZ0luZGVudExldmVsICogMik7XHJcbiAgICAgICAgTG9nZ2VyLkxvZyhgJHtzcGFjZXN9JHttZXNzYWdlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvZ0Rpc2FibGVkKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge31cclxuXHJcbiAgICBwcml2YXRlIF9jYXB0dXJlUGVyZm9ybWFuY2VDb3VudGVycyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIgPSB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlckRpc2FibGVkO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfZW5kUGVyZm9ybWFuY2VDb3VudGVyID0gdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyRGlzYWJsZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXJFbmFibGVkKGNvdW50ZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBUb29scy5TdGFydFBlcmZvcm1hbmNlQ291bnRlcihjb3VudGVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXJEaXNhYmxlZChjb3VudGVyTmFtZTogc3RyaW5nKTogdm9pZCB7fVxyXG5cclxuICAgIHByaXZhdGUgX2VuZFBlcmZvcm1hbmNlQ291bnRlckVuYWJsZWQoY291bnRlck5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIFRvb2xzLkVuZFBlcmZvcm1hbmNlQ291bnRlcihjb3VudGVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5kUGVyZm9ybWFuY2VDb3VudGVyRGlzYWJsZWQoY291bnRlck5hbWU6IHN0cmluZyk6IHZvaWQge31cclxufVxyXG5cclxuaWYgKFNjZW5lTG9hZGVyKSB7XHJcbiAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbihuZXcgR0xURkZpbGVMb2FkZXIoKSk7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgKiBhcyBHTFRGMiBmcm9tIFwiYmFieWxvbmpzLWdsdGYyaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5kZWNsYXJlIGxldCBHTFRGVmFsaWRhdG9yOiBHTFRGMi5JR0xURlZhbGlkYXRvcjtcclxuXHJcbi8vIFdvcmtlckdsb2JhbFNjb3BlXHJcbmRlY2xhcmUgZnVuY3Rpb24gaW1wb3J0U2NyaXB0cyguLi51cmxzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbmRlY2xhcmUgZnVuY3Rpb24gcG9zdE1lc3NhZ2UobWVzc2FnZTogYW55LCB0cmFuc2Zlcj86IGFueVtdKTogdm9pZDtcclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlQXN5bmMoXHJcbiAgICBkYXRhOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcixcclxuICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgIGZpbGVOYW1lOiBzdHJpbmcsXHJcbiAgICBnZXRFeHRlcm5hbFJlc291cmNlOiAodXJpOiBzdHJpbmcpID0+IFByb21pc2U8QXJyYXlCdWZmZXI+XHJcbik6IFByb21pc2U8R0xURjIuSUdMVEZWYWxpZGF0aW9uUmVzdWx0cz4ge1xyXG4gICAgY29uc3Qgb3B0aW9uczogR0xURjIuSUdMVEZWYWxpZGF0aW9uT3B0aW9ucyA9IHtcclxuICAgICAgICBleHRlcm5hbFJlc291cmNlRnVuY3Rpb246ICh1cmkpID0+IGdldEV4dGVybmFsUmVzb3VyY2UodXJpKS50aGVuKCh2YWx1ZSkgPT4gbmV3IFVpbnQ4QXJyYXkodmFsdWUpKSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgb3B0aW9ucy51cmkgPSByb290VXJsID09PSBcImZpbGU6XCIgPyBmaWxlTmFtZSA6IHJvb3RVcmwgKyBmaWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gR0xURlZhbGlkYXRvci52YWxpZGF0ZUJ5dGVzKG5ldyBVaW50OEFycmF5KGRhdGEpLCBvcHRpb25zKSA6IEdMVEZWYWxpZGF0b3IudmFsaWRhdGVTdHJpbmcoZGF0YSwgb3B0aW9ucyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgd29ya2VyIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjb252ZXJ0ZWQgdG8gYSBibG9iIHVybCB0byBwYXNzIGludG8gYSB3b3JrZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiB3b3JrZXJGdW5jKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcGVuZGluZ0V4dGVybmFsUmVzb3VyY2VzOiBBcnJheTx7IHJlc29sdmU6IChkYXRhOiBhbnkpID0+IHZvaWQ7IHJlamVjdDogKHJlYXNvbjogYW55KSA9PiB2b2lkIH0+ID0gW107XHJcblxyXG4gICAgb25tZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gbWVzc2FnZS5kYXRhO1xyXG4gICAgICAgIHN3aXRjaCAoZGF0YS5pZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5pdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBpbXBvcnRTY3JpcHRzKGRhdGEudXJsKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2YWxpZGF0ZVwiOiB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUFzeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnJvb3RVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5maWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAodXJpKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBlbmRpbmdFeHRlcm5hbFJlc291cmNlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nRXh0ZXJuYWxSZXNvdXJjZXMucHVzaCh7IHJlc29sdmUsIHJlamVjdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgaWQ6IFwiZ2V0RXh0ZXJuYWxSZXNvdXJjZVwiLCBpbmRleDogaW5kZXgsIHVyaTogdXJpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IGlkOiBcInZhbGlkYXRlLnJlc29sdmVcIiwgdmFsdWU6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IGlkOiBcInZhbGlkYXRlLnJlamVjdFwiLCByZWFzb246IHJlYXNvbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcImdldEV4dGVybmFsUmVzb3VyY2UucmVzb2x2ZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nRXh0ZXJuYWxSZXNvdXJjZXNbZGF0YS5pbmRleF0ucmVzb2x2ZShkYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJnZXRFeHRlcm5hbFJlc291cmNlLnJlamVjdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBwZW5kaW5nRXh0ZXJuYWxSZXNvdXJjZXNbZGF0YS5pbmRleF0ucmVqZWN0KGRhdGEucmVhc29uKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGdsVEYgdmFsaWRhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURlZhbGlkYXRpb25Db25maWd1cmF0aW9uIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIHVybCBvZiB0aGUgZ2xURiB2YWxpZGF0b3IuXHJcbiAgICAgKi9cclxuICAgIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogZ2xURiB2YWxpZGF0aW9uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURlZhbGlkYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uZmlndXJhdGlvbi4gRGVmYXVsdHMgdG8gYHsgdXJsOiBcImh0dHBzOi8vcHJldmlldy5iYWJ5bG9uanMuY29tL2dsdGZfdmFsaWRhdG9yLmpzXCIgfWAuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlndXJhdGlvbjogSUdMVEZWYWxpZGF0aW9uQ29uZmlndXJhdGlvbiA9IHtcclxuICAgICAgICB1cmw6IFwiZ2x0Zl92YWxpZGF0b3IuanNcIixcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0xvYWRTY3JpcHRQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgYSBnbFRGIGFzc2V0IHVzaW5nIHRoZSBnbFRGLVZhbGlkYXRvci5cclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBKU09OIG9mIGEgZ2xURiBvciB0aGUgYXJyYXkgYnVmZmVyIG9mIGEgYmluYXJ5IGdsVEZcclxuICAgICAqIEBwYXJhbSByb290VXJsIFRoZSByb290IHVybCBmb3IgdGhlIGdsVEZcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSBUaGUgZmlsZSBuYW1lIGZvciB0aGUgZ2xURlxyXG4gICAgICogQHBhcmFtIGdldEV4dGVybmFsUmVzb3VyY2UgVGhlIGNhbGxiYWNrIHRvIGdldCBleHRlcm5hbCByZXNvdXJjZXMgZm9yIHRoZSBnbFRGIHZhbGlkYXRvclxyXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgZ2xURiB2YWxpZGF0aW9uIHJlc3VsdHMgb25jZSBjb21wbGV0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZhbGlkYXRlQXN5bmMoXHJcbiAgICAgICAgZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXJWaWV3LFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGdldEV4dGVybmFsUmVzb3VyY2U6ICh1cmk6IHN0cmluZykgPT4gUHJvbWlzZTxBcnJheUJ1ZmZlcj5cclxuICAgICk6IFByb21pc2U8R0xURjIuSUdMVEZWYWxpZGF0aW9uUmVzdWx0cz4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb3B5ID0gQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpID8gKGRhdGEgYXMgVWludDhBcnJheSkuc2xpY2UoKS5idWZmZXIgOiAoZGF0YSBhcyBzdHJpbmcpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIFdvcmtlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXJDb250ZW50ID0gYCR7dmFsaWRhdGVBc3luY30oJHt3b3JrZXJGdW5jfSkoKWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3b3JrZXJCbG9iVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbd29ya2VyQ29udGVudF0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIgfSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJCbG9iVXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbkVycm9yID0gKGVycm9yOiBFcnJvckV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbk1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGEuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldEV4dGVybmFsUmVzb3VyY2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RXh0ZXJuYWxSZXNvdXJjZShkYXRhLnVyaSkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IFwiZ2V0RXh0ZXJuYWxSZXNvdXJjZS5yZXNvbHZlXCIsIGluZGV4OiBkYXRhLmluZGV4LCB2YWx1ZTogdmFsdWUgfSwgW3ZhbHVlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkOiBcImdldEV4dGVybmFsUmVzb3VyY2UucmVqZWN0XCIsIGluZGV4OiBkYXRhLmluZGV4LCByZWFzb246IHJlYXNvbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZhbGlkYXRlLnJlc29sdmVcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWxpZGF0ZS5yZWplY3RcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGRhdGEucmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbk1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkOiBcImluaXRcIiwgdXJsOiB0aGlzLkNvbmZpZ3VyYXRpb24udXJsIH0pO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IFwidmFsaWRhdGVcIiwgZGF0YTogZGF0YUNvcHksIHJvb3RVcmw6IHJvb3RVcmwsIGZpbGVOYW1lOiBmaWxlTmFtZSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9Mb2FkU2NyaXB0UHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTG9hZFNjcmlwdFByb21pc2UgPSBUb29scy5Mb2FkU2NyaXB0QXN5bmModGhpcy5Db25maWd1cmF0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Mb2FkU2NyaXB0UHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZUFzeW5jKGRhdGFDb3B5LCByb290VXJsLCBmaWxlTmFtZSwgZ2V0RXh0ZXJuYWxSZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBGaWxlTG9hZGVyIGZyb20gXCJsb2FkZXJzL2dsVEYvZ2xURkZpbGVMb2FkZXJcIjtcclxuaW1wb3J0ICogYXMgVmFsaWRhdGlvbiBmcm9tIFwibG9hZGVycy9nbFRGL2dsVEZWYWxpZGF0aW9uXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gPSAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gfHwge307XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBGaWxlTG9hZGVyKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5GaWxlTG9hZGVyKVtrZXldO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gVmFsaWRhdGlvbikge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltrZXldID0gKDxhbnk+VmFsaWRhdGlvbilba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcImxvYWRlcnMvZ2xURi9nbFRGRmlsZUxvYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwibG9hZGVycy9nbFRGL2dsVEZWYWxpZGF0aW9uXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIEV4dGVuc2lvbnMgZnJvbSBcImxvYWRlcnMvZ2xURi8yLjAvRXh0ZW5zaW9ucy9pbmRleFwiO1xyXG5pbXBvcnQgKiBhcyBJbnRlcmZhY2VzIGZyb20gXCJsb2FkZXJzL2dsVEYvMi4wL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCAqIGFzIEdMVEYyIGZyb20gXCJsb2FkZXJzL2dsVEYvMi4wL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gPSAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT04gfHwge307XHJcbiAgICBjb25zdCBCQUJZTE9OID0gKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OO1xyXG4gICAgQkFCWUxPTi5HTFRGMiA9IEJBQllMT04uR0xURjIgfHwge307XHJcbiAgICBCQUJZTE9OLkdMVEYyLkxvYWRlciA9IEJBQllMT04uR0xURjIuTG9hZGVyIHx8IHt9O1xyXG4gICAgQkFCWUxPTi5HTFRGMi5Mb2FkZXIuRXh0ZW5zaW9ucyA9IEJBQllMT04uR0xURjIuTG9hZGVyLkV4dGVuc2lvbnMgfHwge307XHJcblxyXG4gICAgY29uc3Qga2V5cyA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIEJBQllMT04uR0xURjIuTG9hZGVyLkV4dGVuc2lvbnNba2V5XSA9ICg8YW55PkV4dGVuc2lvbnMpW2tleV07XHJcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBJbnRlcmZhY2VzKSB7XHJcbiAgICAgICAgQkFCWUxPTi5HTFRGMi5Mb2FkZXJba2V5XSA9ICg8YW55PkludGVyZmFjZXMpW2tleV07XHJcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gR0xURjIpIHtcclxuICAgICAgICAvLyBQcmV2ZW50IFJlYXNzaWdubWVudC5cclxuICAgICAgICBpZiAoa2V5cy5pbmRleE9mKGtleSkgPiAtMSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJBQllMT04uR0xURjJba2V5XSA9ICg8YW55PkdMVEYyKVtrZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBHTFRGMiB9O1xyXG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L2V4cG9ydFxyXG5leHBvcnQgKiBmcm9tIFwiLi9sZWdhY3ktZ2xURlwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9sZWdhY3ktZ2xURjJcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX29ic2VydmFibGVfXzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlO1xuICAgIGlmIChhc3luYykge1xuICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xuICAgICAgdmFyIHJlYyA9IGVudi5zdGFjay5wb3AoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWMuZGlzcG9zZSAmJiByZWMuZGlzcG9zZS5jYWxsKHJlYy52YWx1ZSk7XG4gICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgbG9hZGVycyBmcm9tIFwiQGx0cy9sb2FkZXJzL2xlZ2FjeS9sZWdhY3ktZ2xURjJGaWxlTG9hZGVyXCI7XHJcbmV4cG9ydCB7IGxvYWRlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgbG9hZGVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9