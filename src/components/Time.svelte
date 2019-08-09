<script>
    import { ticker } from '../stores/ticker.js';
    import { tickerSpeed } from '../stores/tickerSpeed.js';
    import { time } from '../stores/time.js';
</script>

<style>
    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin-right: 0.5em;
    }

    a {
        text-decoration: none;
    }

    a.active {
        color: red;
    }
</style>

<h2>{$time}</h2>

<ul>
    <li>
        <a title="Pause" href="pause" class:active={$tickerSpeed === 0} on:click|preventDefault={tickerSpeed.pause}>
            ▮▮
        </a>
    </li>
    <li>
        <a
            title="Normal"
            href="normal"
            class:active={$tickerSpeed === 1000}
            on:click|preventDefault={tickerSpeed.normal}>
            ▶
        </a>
    </li>
    <li>
        <a title="Fast" href="fast" class:active={$tickerSpeed === 300} on:click|preventDefault={tickerSpeed.fast}>
            ▶▶
        </a>
    </li>
    <li>
        <a title="Rapid" href="rapid" class:active={$tickerSpeed === 100} on:click|preventDefault={tickerSpeed.rapid}>
            ▶▶▶
        </a>
    </li>
</ul>
