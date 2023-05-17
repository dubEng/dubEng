import React, {useRef,useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass.js';

export default function KitchenFilterEffect() {


    const { scene, gl, size, camera } = useThree();
    const composerRef: any = useRef<EffectComposer>(null);
    useEffect(() => {
      
      const renderScene:RenderPass = new RenderPass(scene, camera);
      const bloomPass = new BloomPass(
        1, // strength
        25, // kernel size
        4, // sigma ?
      );
  
      const copyShader:ShaderPass = new ShaderPass(CopyShader);
      copyShader.renderToScreen = true;

      const ssaoPass = new SSAOPass(scene, camera, size.width, size.height);
      ssaoPass.kernelRadius = 8;
      ssaoPass.minDistance = 0.001;
        ssaoPass.maxDistance = 0.2;
        if (composerRef != null) {
            composerRef?.addPass(ssaoPass);
            composerRef.addPass();
        }
      const ssrPass: SSRPass = new SSRPass({
       renderer: gl,
        scene: scene,
        camera: camera,
        width: size.width,
        height: size.height,
        groundReflector: null,
        selects: [],
        
  });
      ssrPass.renderToScreen = true;
      composerRef.addPass(renderScene);
      composerRef.addPass(ssrPass);
      composerRef.addPass(bloomPass);
      composerRef.addPass(copyShader);
  
      const pixelRatio = gl.getPixelRatio();
      const newWidth = Math.floor(size.width / pixelRatio);
      const newHeight = Math.floor(size.height / pixelRatio);
  
      composerRef.setSize(newWidth, newHeight);
    }, [scene, camera, gl, size]);
  
    return <effectComposer ref={composerRef} args={[gl]} />;
  }