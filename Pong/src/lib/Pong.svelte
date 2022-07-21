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
  });
  const paddleRight = new Paddle({
    x: width - padding - paddleWidth,
    y: height / 2 - paddleHeight / 2,
    w: paddleWidth,
    h: paddleHeight,
  });

  let canvas, context;

  onMount(() => {
    context = canvas.getContext("2d");
    context.translate(margin, margin);
    draw();
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
</script>

<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />
