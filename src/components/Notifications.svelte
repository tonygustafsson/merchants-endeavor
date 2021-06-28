<script>
    import { fly } from 'svelte/transition';
    import { notifications } from '../stores/notifications';

    let entries;

    notifications.subscribe(value => {
        entries = value;
    });
</script>

{#each entries as entry}
    <div class="notification" transition:fly={{ y: 100, duration: 200 }}>
        <p>
            <span class="icon">✓</span>
            {entry}
        </p>
    </div>
{/each}

<style>
    .notification {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(207, 255, 163);
        padding: 0.5em;
        text-align: center;
    }
    p {
        font-size: 120%;
    }
    .icon {
        color: green;
        font-size: 140%;
        vertical-align: middle;
    }
</style>
