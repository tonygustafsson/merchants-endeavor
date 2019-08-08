<script>
    import { ships } from './stores/ships.js';
    import { crew } from './stores/crew.js';
</script>

<style>
    table {
        width: 25%;
        background: #d8dbde;
        margin: 1em 0;
        text-transform: uppercase;
        font-size: 90%;
    }

    tr {
        padding: 0.25em 1em;
    }

    tr:nth-child(2n + 1) {
        background: #c3c3bb;
    }

    td {
        padding: 0.5em;
    }

    td:last-child {
        text-align: right;
        font-weight: bold;
    }
</style>

<h3>Inventory</h3>

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
