// シーン、カメラ、レンダラーを設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 簡単な立方体（キャラクター）の作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// カメラの位置
camera.position.z = 5;

// キーボード入力用の変数
const velocity = new THREE.Vector3(); // キャラクターの移動量
const direction = new THREE.Vector3(); // 移動方向

// カメラ操作のためのOrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// キーボードイベントを設定
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// ゲームループ
function animate() {
    requestAnimationFrame(animate);

    // キー入力による移動
    direction.set(0, 0, 0);

    if (keys['KeyW']) direction.z = -1;
    if (keys['KeyS']) direction.z = 1;
    if (keys['KeyA']) direction.x = -1;
    if (keys['KeyD']) direction.x = 1;

    velocity.x = direction.x * 0.1; // 移動スピード
    velocity.z = direction.z * 0.1;

    // 立方体を移動させる
    cube.position.add(velocity);

    // カメラをプレイヤーキャラクターの位置に追従させる
    camera.position.x = cube.position.x;
    camera.position.y = cube.position.y + 1; // カメラを少し上に配置
    camera.position.z = cube.position.z + 5;

    // レンダリング
    controls.update(); // OrbitControlsでカメラ操作
    renderer.render(scene, camera);
}

// 画面サイズが変更されたときにカメラとレンダラーのサイズを更新
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// アニメーション開始
animate();
