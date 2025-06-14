import { IDocument, Plane } from "chili-core";
import * as THREE from "three";
import { Renderer } from "three";
import { ThreeView } from "../src/threeView";
import { ThreeVisualContext } from "../src/threeVisualContext";
import { ThreeHighlighter } from "../src/threeHighlighter";

class TestWebGLRenderer implements THREE.Renderer {
    constructor(readonly domElement = document.createElement("canvas")) {}

    render(scene: THREE.Object3D, camera: THREE.Camera): void {}
    setSize(width: number, height: number, updateStyle?: boolean): void {}

    getPixelRatio() {
        return 1;
    }

    getViewport() {
        return new THREE.Vector4();
    }
    setViewport(v: THREE.Vector4) {}

    setPixelRatio(value: number) {}

    getSize(target: THREE.Vector2): THREE.Vector2 {
        return new THREE.Vector2();
    }

    setAnimationLoop(fn: (x: number) => void) {}
    getRenderTarget() {
        return null;
    }
    setRenderTarget() {}
    clear() {}
    clearDepth() {}
    getClearColor() {}
    getClearAlpha() {}
    getContext() {
        return {
            getExtension(str: string) {},
        };
    }
}

export const container = document.createElement("canvas");
container.getBoundingClientRect = () => {
    return { left: 0, top: 0, width: 100, height: 100 } as any;
};
Object.defineProperties(container, {
    clientWidth: {
        get() {
            return 100;
        },
    },
    clientHeight: {
        get() {
            return 100;
        },
    },
});

export class TestView extends ThreeView {
    constructor(document: IDocument, content: ThreeVisualContext) {
        super(document, "test", Plane.XY, new ThreeHighlighter(content), content);
        this.setDom(container);
        this.cameraController.lookAt(
            new THREE.Vector3(0, 0, 100),
            new THREE.Vector3(),
            new THREE.Vector3(0, 1, 0),
        );
    }

    protected override initRenderer() {
        let render = new TestWebGLRenderer() as any;
        render.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(render.domElement);
        return render;
    }
}
