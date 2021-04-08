<script>
  import { spring } from 'svelte/motion';
  import Front from './Front.svelte';
  import Back from './Back.svelte';

  // contact information
  let contact = {
    name: 'Cosmo Kramer',
    title: 'Movie Phone',
    phone: '1 (555) 555 3455',
  };

  // update the contact following the update event
  // dispatched from the Front component
  function handleUpdate(e) {
    const { name, title, phone } = e.detail;
    contact = {
      name,
      title,
      phone,
    };
  }

  // rotate the div container following a button press
  const options = {
    stiffness: 0.05,
    damping: 0.6,
  };
  const softness = {
    soft: 0.7,
  };
  const rotation = spring(
    {
      y: 0,
      z: 0,
    },
    options
  );

  let showBack = false;
  function handleClick() {
    showBack = !showBack;
    if (showBack) {
      rotation.set(
        {
          y: 180,
          z: 450,
        },
        softness
      );
    } else {
      rotation.set(
        {
          y: 0,
          z: 0,
        },
        softness
      );
    }
  }
</script>

<div style="transform: rotateY({$rotation.y}deg) rotateZ({$rotation.z}deg)">
  <Front on:update={handleUpdate} {...contact} />
  <Back {...contact} />
</div>

<button on:click={handleClick}> Rotate </button>
