<script>
    export let disabled = false;
    export let type = 'button';
    export let variant = '';
</script>

<button {type} {disabled} class:small={variant === 'small'} on:click>
    <slot />
</button>

<style>
    button {
        font-size: inherit;
        color: #000;
        background-color: #fff;
        outline: none;
        cursor: pointer;
        padding: 0.5em 1em;
        margin: 0.5em 0.5em 0.5em 0;
        border: 1px #cdcdcd solid;
        box-shadow: 0px 0px 4px #898989;
    }

    button.small {
        font-size: 80%;
    }

    button:hover {
        background-color: #f5f5f5;
    }

    button:focus {
        border-color: #666;
    }

    button:disabled {
        background-color: #f1f1f1;
        color: #7e7e7e;
        cursor: default;
    }

    :global(button > img) {
        display: block;
        margin: 0 auto;
        width: 150px;
        height: 150px;
        max-width: 100%;
    }

    :global(button:disabled > img) {
        opacity: 0.5;
    }
</style>
