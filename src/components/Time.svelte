<script>
    import { ticker } from '../stores/ticker.js';
    import { tickerSpeed } from '../stores/tickerSpeed.js';
    import { time } from '../stores/time.js';
</script>

<p class="time">{$time.now}</p>

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
            on:click|preventDefault={tickerSpeed.normal}
        >
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

<style>
    .time {
        display: inline-block;
        font-size: 200%;
        margin: 0.25em 0 0.5em 0;
        font-family: 'Redressed', cursive;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: inline-block;
        margin-left: 2em;
        vertical-align: super;
    }

    li {
        display: inline-block;
        margin-right: 0.5em;
    }

    a {
        text-decoration: none;
        color: grey;
    }

    a.active {
        color: black;
    }
</style>
