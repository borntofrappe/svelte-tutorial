<script>
    export let string;

    $: object = string.split('').map((character) => ({
        id: Math.random(),
        value: character
    }));
    export let btn = false;
    export let delay = 0;

    console.log(string);
</script>

<style>
    span {
        display: inline-block;
        animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    span.btn {
        background: hsl(0, 0%, 100%);
        border: 2px solid hsl(0, 0%, 90%);
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        color: hsl(0, 0%, 20%);
        box-shadow: 0 1px 5px hsl(0, 0%, 0%, 0.2);
        position: relative;
    }

    span.btn+span.btn {
        border-left: none;
    }

    span.btn:after {
        content: attr(data-key);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 0.75rem;
        margin: 0.1rem;
    }

    span.btn:hover {
        background: hsl(0, 0%, 95%);
        box-shadow: initial;
    }

    @keyframes popIn {
        0% {

            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: initial;
            transform: initial;
        }
    }
</style>

{#each object as character, i (character.id)}
    {#if character.value !== ' '}
    <span
        class:btn
        aria-hidden="true"
        data-key={character.value.charCodeAt(0)}
        style="animation-delay: {i * 0.04 + 0.15 + delay}s;'}">
            {character.value}
    </span>
    {:else}
        <br/>
    {/if}
{/each}