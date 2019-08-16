<script>
    import { staff } from '../stores/staff.js';
    import { goods } from '../stores/goods.js';
</script>

<div class="page-staff">
    <h2>Staff</h2>

    <p>
        You need staff to be able to populate ship crew and give them tasks. It's important to keep your staff healthy
        and happy.
    </p>

    <table>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>Staff</td>
            <td>{$staff.members}</td>
        </tr>
        <tr>
            <td>Health</td>
            <td>{$staff.health}%</td>
        </tr>
        <tr>
            <td>Mood</td>
            <td>{$staff.mood}%</td>
        </tr>
    </table>

    <div>
        <button on:click={() => staff.addStaff(1)}>Add staff</button>
        <button on:click={() => staff.removeStaff(1)}>Fire staff</button>
    </div>
</div>
