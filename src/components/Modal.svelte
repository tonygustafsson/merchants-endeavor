<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '../components/Button.svelte';

    const dispatch = createEventDispatcher();
</script>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
    <div class="modal-inset">
        <slot />

        <a href="close" class="close-button" on:click|preventDefault={() => dispatch('close')}>&times;</a>
    </div>
</div>

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
        max-width: 40em;
        max-height: calc(100vh - 4em);
        overflow: auto;
        transform: translate(-50%, -50%);
        padding: 1em;
        background: white;
    }

    .modal-inset {
        margin: 0.2em;
        padding: 1em;
        padding-top: 0;
        border: 1px #e4e4e4 solid;
    }

    .close-button {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 200%;
        text-decoration: none;
    }
</style>
