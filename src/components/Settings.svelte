<script>
    import { clearDatabase } from '../utils/db';

    const forgetEverything = () => {
        clearDatabase();
        window.location.reload();
    };
</script>

<style>
    .settings-panel {
        position: absolute;
        right: 10px;
        bottom: 10px;
        text-align: right;
    }

    button {
        background-color: pink;
    }
</style>

<div class="settings-panel">
    <button on:click={forgetEverything}>Forget everything</button>
</div>
