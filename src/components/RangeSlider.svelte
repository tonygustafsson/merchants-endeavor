<script>
    export let name = 'slider';
    export let value = 0;
    export let min = 0;
    export let max = 0;
    export let label;
</script>

{#if label && label.length > 0}
    <label for={name}>
        {@html label}
    </label>
{/if}
<input on:input type="range" {name} {value} {min} {max} />

<style>
    input[type='range'] {
        -webkit-appearance: none;
        width: 100%;
        margin: 5.7px;
        border: 1px solid #ccc;
        background-color: #fff;
        box-sizing: border-box;
    }
    input[type='range']:focus {
        outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
        width: 100%;
        height: 6.6px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
        background: #666666;
        border-radius: 0px;
        border: 0px solid #000000;
    }
    input[type='range']::-webkit-slider-thumb {
        box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(13, 13, 13, 0.5);
        border: 1px solid #0d0d0d;
        height: 18px;
        width: 22px;
        border-radius: 0px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -5.7px;
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
        background: #000;
    }
    input[type='range']::-moz-range-track {
        width: 100%;
        height: 6.6px;
        cursor: pointer;
        box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
        background: #666666;
        border-radius: 0px;
        border: 0px solid #000000;
    }
    input[type='range']::-moz-range-thumb {
        box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(13, 13, 13, 0.5);
        border: 1px solid #0d0d0d;
        height: 18px;
        width: 22px;
        border-radius: 0px;
        background: #ffffff;
        cursor: pointer;
    }
    input[type='range']::-ms-track {
        width: 100%;
        height: 6.6px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type='range']::-ms-fill-lower {
        background: #595959;
        border: 0px solid #000000;
        border-radius: 0px;
        box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    input[type='range']::-ms-fill-upper {
        background: #666666;
        border: 0px solid #000000;
        border-radius: 0px;
        box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    }
    input[type='range']::-ms-thumb {
        box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(13, 13, 13, 0.5);
        border: 1px solid #0d0d0d;
        height: 18px;
        width: 22px;
        border-radius: 0px;
        background: #ffffff;
        cursor: pointer;
        height: 6.6px;
    }
    input[type='range']:focus::-ms-fill-lower {
        background: #000;
    }
    input[type='range']:focus::-ms-fill-upper {
        background: #000;
    }

    label {
        margin-bottom: 0.2em;
    }
</style>
