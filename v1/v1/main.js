import { sakuraFragmentShader } from 'sakuraFragmentShader.js';
import { fxCommonVertexShader } from 'fxCommonVertexShader.js';
import { bgFragmentShader } from 'bgFragmentShader.js';
import { fxBrightBufFragmentShader } from 'fxBrightBufFragmentShader.js';
import { fxDirBlurR4FragmentShader } from 'fxDirBlurR4FragmentShader.js';
import { fxCommonFragmentShader } from 'fxCommonFragmentShader.js';
import { ppFinalVertexShader } from 'ppFinalVertexShader.js';
import { ppFinalFragmentShader } from 'ppFinalFragmentShader.js';
import { sakura_shader } from 'sakura_shader.js';

// Kiểm tra shader đã được import
console.log('Shaders đã được tải:');
console.log({
    sakuraFragmentShader,
    fxCommonVertexShader,
    bgFragmentShader,
    fxBrightBufFragmentShader,
    fxDirBlurR4FragmentShader,
    fxCommonFragmentShader,
    ppFinalVertexShader,
    ppFinalFragmentShader,
    sakura_shader
});

// Khởi tạo WebGL
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');

if (!gl) {
    console.error('WebGL không được hỗ trợ!');
}

// Tạo shader
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Lỗi biên dịch shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, ppFinalVertexShader);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, ppFinalFragmentShader);

// Tạo chương trình shader
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Lỗi liên kết chương trình shader:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const shaderProgram = createProgram(gl, vertexShader, fragmentShader);

if (shaderProgram) {
    console.log('Shader program đã được khởi tạo thành công!');
}