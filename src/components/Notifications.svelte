<script>
    import { fly } from 'svelte/transition';

    $: showNotification = false;

    let notification;

    export const success = message => {
        notification = message;
        showNotification = true;

        setTimeout(() => {
            showNotification = false;
        }, 2000);
    };
</script>

<style>
    .notification {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgb(207, 255, 163);
        padding: 1em;
        text-align: center;
    }
    .icon {
        color: green;
    }
</style>

{#if showNotification}
    <div class="notification" transition:fly={{ y: 100, duration: 200 }}>
        <p>
            <span class="icon">✓</span>
            {notification}
        </p>
    </div>
{/if}
