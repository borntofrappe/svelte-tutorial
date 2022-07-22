<script>
  import { onMount } from "svelte";
  import { Puck, Paddle, map } from "./utils.js";

  const canvasWidth = 400;
  const canvasHeight = 250;
  const padding = 5;
  const margin = 5;
  const border = 5;

  const width = canvasWidth - margin * 2;
  const height = canvasHeight - margin * 2;

  const puckRadius = 7;

  const paddleWidth = 7;
  const paddleHeight = 60;

  const puck = new Puck({ x: width / 2, y: height / 2, r: puckRadius });

  const paddleLeft = new Paddle({
    x: padding,
    y: height / 2 - paddleHeight / 2,
    w: paddleWidth,
    h: paddleHeight,
    keys: {
      KeyW: -1,
      KeyS: 1,
    },
  });
  const paddleRight = new Paddle({
    x: width - padding - paddleWidth,
    y: height / 2 - paddleHeight / 2,
    w: paddleWidth,
    h: paddleHeight,
    keys: {
      ArrowUp: -1,
      ArrowDown: 1,
    },
  });

  let canvas, context;
  let playing, animationId;

  onMount(() => {
    context = canvas.getContext("2d");
    context.translate(margin, margin);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  });

  const draw = () => {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = "#ffffff";
    context.lineWidth = border * 2;
    context.strokeRect(0, 0, width, height);
    context.fillStyle = "#0e826d";
    context.fillRect(0, 0, width, height);

    context.lineWidth = border;
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.closePath();
    context.stroke();

    context.fillStyle = "#fdbd04";
    puck.show(context);

    context.fillStyle = "#fd5904";
    paddleLeft.show(context);
    paddleRight.show(context);
  };

  const handleStart = () => {
    if (playing) return;

    playing = true;
    puck.start();
    update();
  };

  const handleKeydown = (e) => {
    const { code } = e;

    if (paddleLeft.keys[code]) {
      paddleLeft.dy = paddleLeft.keys[code];
    } else if (paddleRight.keys[code]) {
      paddleRight.dy = paddleRight.keys[code];
    } else return;

    e.preventDefault();
  };

  const handleKeyup = (e) => {
    const { code } = e;

    if (paddleLeft.keys[code]) {
      paddleLeft.dy = 0;
    } else if (paddleRight.keys[code]) {
      paddleRight.dy = 0;
    } else return;

    e.preventDefault();
  };

  const update = () => {
    animationId = requestAnimationFrame(update);

    draw();

    puck.update();
    paddleLeft.update();
    paddleRight.update();

    // puck bounces against wall
    if (puck.y - puck.r < 0) {
      puck.y = puck.r;
      puck.dy *= -1;
    } else if (puck.y + puck.r > height) {
      puck.y = height - puck.r;
      puck.dy *= -1;
    }

    // puck bounces against paddles
    if (puck.collides(paddleLeft)) {
      puck.speed *= 1.025;

      const y = (puck.y - paddleLeft.y) / paddleLeft.h;
      if (y < 0) {
        puck.dy = -1;
        puck.y = paddleLeft.y - puck.r;
      } else if (y > 1) {
        puck.dy = 1;
        puck.y = paddleLeft.y + paddleLeft.h + puck.r;
      } else {
        puck.x = paddleLeft.x + paddleLeft.w + puck.r;

        const maxAngle = 90;
        const angles = 4;
        const angle = Math.round(map(y, 0, 1, 0, angles));
        const theta = ((angle * (maxAngle / angles) - 45) / 180) * Math.PI;

        const dx = Math.cos(theta) * puck.speed;
        const dy = Math.sin(theta) * puck.speed;

        puck.dx = dx;
        puck.dy = dy;
      }
    } else if (puck.collides(paddleRight)) {
      puck.speed *= 1.025;

      const y = (puck.y - paddleRight.y) / paddleRight.h;
      if (y < 0) {
        puck.dy = -1;
        puck.y = paddleRight.y - puck.r;
      } else if (y > 1) {
        puck.dy = 1;
        puck.y = paddleRight.y + paddleRight.h + puck.r;
      } else {
        puck.x = paddleRight.x - puck.r;

        const maxAngle = 90;
        const angles = 4;
        const angle = Math.round(map(y, 0, 1, 0, angles));
        const theta = ((angle * (maxAngle / angles) - 45) / 180) * Math.PI;

        const dx = Math.cos(theta) * puck.speed;
        const dy = Math.sin(theta) * puck.speed;

        puck.dx = dx * -1;
        puck.dy = dy;
      }
    }

    // puck exceeds horizontal constraints
    if (puck.x < -puck.r || puck.x > width + puck.r) {
      reset();
    }

    // paddles exceed vertical constraints
    if (paddleLeft.y < 0) {
      paddleLeft.y = 0;
      paddleLeft.dy = 0;
    } else if (paddleLeft.y > height - paddleLeft.h) {
      paddleLeft.y = height - paddleLeft.h;
      paddleLeft.dy = 0;
    }

    if (paddleRight.y < 0) {
      paddleRight.y = 0;
      paddleRight.dy = 0;
    } else if (paddleRight.y > height - paddleRight.h) {
      paddleRight.y = height - paddleRight.h;
      paddleRight.dy = 0;
    }
  };

  const reset = () => {
    cancelAnimationFrame(animationId);
    puck.reset();
    draw();
    playing = false;
  };
</script>

<svelte:body on:keydown={handleKeydown} on:keyup={handleKeyup} />

<div>
  {#if !playing}
    <button on:click={handleStart}>Play</button>
  {/if}

  <canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />
</div>

<style>
  div {
    display: inline-block;
    position: relative;
  }

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    font-weight: 700;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
    border-radius: 0.25rem;
    border: none;
    color: #fdbd04;
    background: #025251;
    border: 0.2rem solid #dbffff;
  }
</style>
