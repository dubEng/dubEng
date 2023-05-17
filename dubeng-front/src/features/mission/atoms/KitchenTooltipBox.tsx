import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Html} from '@react-three/drei';

export default function KitchenTooltipBox() {
    const boxRef = useRef(null);
    const { scene, gl, size, camera } = useThree();
    
    return (
      <mesh ref={boxRef} visible={false}>
        <boxBufferGeometry />
        <meshBasicMaterial />
        <Html position={[camera.position.x,camera.position.y,camera.position.z]} >
        <div id="helper" style={{ 
            width: '160px',
            height: '120px',
            backgroundColor: '#fff',
            border: '1px solid #000',
            borderRadius: '5px',
            boxShadow: '2px 2px 5px #888',
            position: 'relative',
            overflow: 'hidden',
            opacity : `0.7`,
        }}>
            <div className="window-header" style={{ 
            height: '30px',
            backgroundColor: '#ddd',
            borderBottom: '1px solid #000',
            position: 'relative'
            }}>
            <div className="window-title" style={{ 
                lineHeight: '30px',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
            <a id="mission">MissionTitle</a>
            </div>
            <div className="window-buttons" style={{ 
                position: 'absolute',
                top: 0,
                right: 0,
                height: '15px'
            }}>
                <div className="window-button close-button" style={{ 
                width: '5px',
                height: '5px',
                margin: '2px',
                borderRadius: '50%',
                display: 'inline-block',
                cursor: 'pointer',
                backgroundColor: '#ff4d4d'
                }}></div>
                <div className="window-button minimize-button" style={{ 
                width: '5px',
                height: '5px',
                margin: '2px',
                borderRadius: '50%',
                display: 'inline-block',
                cursor: 'pointer',
                backgroundColor: '#ffc107'
                }}></div>
                <div className="window-button maximize-button" style={{ 
                width: '5px',
                height: '5px',
                margin: '2px',
                borderRadius: '50%',
                display: 'inline-block',
                cursor: 'pointer',
                backgroundColor: '#4caf50'
                }}></div>
            </div>
            </div>
            <div className="window-body" style={{ 
            padding: '3px',
            height: 'calc(100% - 30px)',
            overflowY: 'auto',
            fontSize: '6px',
            lineHeight: 1.5
            }}>
            <p id="desc">Mission contents</p>
            </div>
        </div>
        </Html>
      </mesh>
    )
  }