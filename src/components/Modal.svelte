<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '../components/Button.svelte';

    const dispatch = createEventDispatcher();
</script>

<style>
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4em);
        max-width: 32em;
        max-height: calc(100vh - 4em);
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1em;
        background: white;
    }
</style>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
    <slot name="header" />
    <hr />
    <slot />
    <hr />

    <Button on:click={() => dispatch('close')}>Close</Button>
</div>
