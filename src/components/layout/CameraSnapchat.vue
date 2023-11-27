<template>
    <div class="container">
        <canvas ref="canvasRef" id="canvas-container" width="1920" height="1080"></canvas>
        <div class="footer">
            <select ref="cameraSelectRef" class="styled-select"></select>
            <select ref="lensSelectRef" class="styled-select"></select>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit';

export default {
    setup() {
        const canvasRef = ref(null);
        const cameraSelectRef = ref(null);
        const lensSelectRef = ref(null);
        let mediaStream;

        const apiToken =
            'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzAwMjE3ODIyLCJzdWIiOiIzNmY2NzI4Yi0zZWIwLTQwNGQtOTU0My1lYjRjMTczZGY4MGF-U1RBR0lOR35lOWM2MDAyOC1mOGFiLTRlNTMtYmQyOC1jNDUyNWQxNDZlOTUifQ.VbSMxSqVc5nvGxRCIaQhkcLrC4dAmhUs9zD_5V9aR8M';
        const lensGroupId = 'f7b03f13-b2ee-46fd-bfad-fbb1c56080c7';

        onMounted(async () => {
            const cameraKit = await bootstrapCameraKit({ apiToken: apiToken });
            const session = await cameraKit.createSession();

            // Use the ref to get the canvas element
            const canvas = canvasRef.value;
            if (canvas) {
                canvas.replaceWith(session.output.live);
            }

            const { lenses } = await cameraKit.lenses.repository.loadLensGroups([
                lensGroupId,
            ]);
            session.applyLens(lenses[19]);
            await setCameraKitSource(session);
            await attachCamerasToSelect(session);
            console.log('attachCamerasToSelect is called');
            await attachLensesToSelect(lenses, session);
            console.log('attachLensesToSelect is called');
        });

        const setCameraKitSource = async (session, deviceId) => {
            if (mediaStream) {
                session.pause();
                mediaStream.getVideoTracks()[0].stop();
            }

            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId },
            });

            const source = createMediaStreamSource(mediaStream);

            await session.setSource(source);

            source.setTransform(Transform2D.MirrorX);

            session.play();
        };

        const attachCamerasToSelect = async (session) => {
            cameraSelectRef.value.innerHTML = '';
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(({ kind }) => kind === 'videoinput');

            cameras.forEach((camera) => {
                const option = document.createElement('option');
                option.value = camera.deviceId;
                option.text = camera.label;
                cameraSelectRef.value.appendChild(option);
            });

            cameraSelectRef.value.addEventListener('change', (event) => {
                const deviceId = event.target.selectedOptions[0].value;
                setCameraKitSource(session, deviceId);
            });
        };

        const attachLensesToSelect = async (lenses, session) => {
            lensSelectRef.value.innerHTML = '';
            lenses.forEach((lens) => {
                const option = document.createElement('option');
                option.value = lens.id;
                option.text = lens.name;
                lensSelectRef.value.appendChild(option);
            });

            lensSelectRef.value.addEventListener('change', (event) => {
                const lensId = event.target.selectedOptions[0].value;
                const lens = lenses.find((lens) => lens.id === lensId);
                if (lens) session.applyLens(lens);
            });
        };

        return { canvasRef, cameraSelectRef, lensSelectRef };
    },
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    margin-top: 20px;
}

.styled-select {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background: #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    appearance: none;
}
</style>
  