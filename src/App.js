import './App.css';
import { useEffect } from 'react';
import { Point3D, Vector3D } from './Vector';

function App() {

  function tick(env, proj) {
    const position = proj.position.add(proj.velocity);
    const velocity = proj.velocity.add(env.gravity).add(env.wind);

    return { position, velocity };
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "green";

    // let proj = {
    //   position: new Point3D(0, 1, 0),
    //   // velocity: new Vector3D(1, 1, 0).normalize()
    //   velocity: new Vector3D(1, 3, 0)
    // }

    // const env = {
    //   gravity: new Vector3D(0, -0.1, 0),
    //   wind: new Vector3D(-0.01, 0, 0)
    // }

    // const startPos = {
    //   x: 20,
    //   y: 200,
    //   w: 150,
    //   h: 100
    // }

    // ctx.fillRect(startPos.x, startPos.y, startPos.w, startPos.h);

    // setInterval(() => {
    //   // ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.fillStyle = "green";
    //   ctx.fillRect(startPos.x + proj.position.x, startPos.y - proj.position.y, startPos.w, startPos.h);

    //   proj = tick(env, proj);

    //   console.log(proj)
    // }, 100);

  }, []);

  return (
    <div className="App">
      hello
      <canvas id="canvas" width="500" height="500" style={{border: '1px solid rgba(0, 0, 0, 0.05)'}}></canvas>
    </div>
  );
}

export default App;
