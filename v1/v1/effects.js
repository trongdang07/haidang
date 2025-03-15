const fxCommonVertex = `
    uniform vec3 uResolution;
    attribute vec2 aPosition;
    varying vec2 texCoord;
    varying vec2 screenCoord;
    
    void main(void) {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        texCoord = aPosition.xy * 0.5 + vec2(0.5, 0.5);
        screenCoord = aPosition.xy * vec2(uResolution.z, 1.0);
    }
`;

const bgFragment = `
    precision highp float;
    uniform vec2 uTimes;
    varying vec2 texCoord;
    varying vec2 screenCoord;
    
    void main(void) {
        vec3 col;
        float c;
        vec2 tmpv = texCoord * vec2(0.8, 1.0) - vec2(0.95, 1.0);
        c = exp(-pow(length(tmpv) * 1.8, 2.0));
        col = mix(vec3(0.02, 0.0, 0.03), vec3(0.96, 0.98, 1.0) * 1.5, c);
        gl_FragColor = vec4(col * 0.5, 1.0);
    }
`;

const fxBrightBufFragment = `
    precision highp float;
    uniform sampler2D uSrc;
    uniform vec2 uDelta;
    varying vec2 texCoord;
    varying vec2 screenCoord;
    
    void main(void) {
        vec4 col = texture2D(uSrc, texCoord);
        gl_FragColor = vec4(col.rgb * 2.0 - vec3(0.5), 1.0);
    }
`;

export { fxCommonVertex, bgFragment, fxBrightBufFragment };
