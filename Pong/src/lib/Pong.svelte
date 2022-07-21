<script>
  import { onMount } from "svelte";
  import { Puck, Paddle } from "./utils.js";

  const canvasWidth = 400;
  const canvasHeight = 250;
  const padding = 5;
  const margin = 5;
  const border = 5;

  const width = canvasWidth - margin * 2;
  const height = canvasHeight - margin * 2;

  const puckRadius = 8;

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

    paddleLeft.update();
    paddleRight.update();

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
