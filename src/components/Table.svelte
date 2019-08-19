<script>
    export let dynamicWidth = false;
    export let noHeading = false;
</script>

<style>
    table {
        width: 100%;
        margin: 1em 0;
        background-color: #fff;
        table-layout: fixed;
        border-collapse: collapse;
    }

    table.dynamicWidth {
        table-layout: auto;
    }

    :global(table > tr) {
        padding: 0 1em;
        border-bottom: 1px solid #e6e6e6;
    }

    :global(table > tr:first-child) {
        border-top: 1px solid #e6e6e6;
        background-color: #eeeeee;
    }

    :global(table th) {
        text-align: left;
    }

    :global(table th),
    :global(table td) {
        padding: 0.75em;
    }
</style>

<table class:dynamicWidth>
    <slot />
</table>
