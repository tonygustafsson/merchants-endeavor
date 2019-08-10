<script>
    import { crew } from '../stores/crew.js';
    import { goods } from '../stores/goods.js';

    let noOfCrewMembers = 0;
    let crewHealth = 0;
    let crewMood = 0;

    crew.subscribe(value => {
        noOfCrewMembers = value.members;
        crewHealth = value.health;
        crewMood = value.mood;
    });
</script>

<h3>Crew</h3>

<table>
    <tr>
        <th>Item</th>
        <th>Quantity</th>
    </tr>
    <tr>
        <td>Crew members</td>
        <td>{noOfCrewMembers}</td>
    </tr>
    <tr>
        <td>Health</td>
        <td>{crewHealth}%</td>
    </tr>
    <tr>
        <td>Mood</td>
        <td>{crewMood}%</td>
    </tr>
</table>

<div>
    <button on:click={() => crew.addCrewMembers(1)}>Find crew member</button>
    <button on:click={() => crew.removeCrewMembers(1)}>Fire crew member</button>
</div>
