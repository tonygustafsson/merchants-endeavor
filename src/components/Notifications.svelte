<script>
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
        transform: translateY(100px);
        transition: transform 200ms;
    }
    .show {
        transform: translateY(0);
    }
    .icon {
        color: green;
    }
</style>

<div class="notification" class:show={showNotification}>
    <p>
        <span class="icon">✓</span>
        {notification}
    </p>
</div>
