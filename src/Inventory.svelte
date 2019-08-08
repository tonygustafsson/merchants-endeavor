<script>
    import { ships } from './stores/ships.js';
    import { crew } from './stores/crew.js';
</script>

<style>
    table {
        width: 25%;
        background: #f2f2ff;
        margin: 1em 0;
    }

    tr {
        padding: 0.25em 1em;
    }

    tr:nth-child(2n + 1) {
        background: #dbdbff;
    }

    td:last-child {
        text-align: right;
    }
</style>

<h2>Inventory</h2>

<table>
    <tr>
        <td>Crew members</td>
        <td>{$crew}</td>
    </tr>
    <tr>
        <td>Ships</td>
        <td>{$ships}</td>
    </tr>
</table>
