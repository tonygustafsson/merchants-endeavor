<script>
    import { merchant } from '../stores/merchant';
    import { game } from '../stores/game';

    const changeName = name => {
        merchant.changeName(name);
    };

    const changeGender = gender => {
        merchant.changeGender(gender);
    };

    const changeNationality = nationality => {
        merchant.changeNationality(nationality);
    };

    const startPlaying = () => {
        game.changeRoute('general');
    };
</script>

<div class="page-start">
    <h2>Welcome</h2>

    <p>To start playing, you can edit your profile or just press Play.</p>

    <form on:submit|preventDefault={startPlaying}>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" value={$merchant.name} on:change={e => changeName(e.target.value)} />

        <label for="gender">Gender</label>
        <select name="gender" id="gender" on:change={e => changeGender(e.target.value)}>
            <option value="man" selected={$merchant.gender === 'man'}>Man</option>
            <option value="woman" selected={$merchant.gender === 'woman'}>Woman</option>
        </select>

        <label for="nationality">
            {#if $merchant.nationality === 'english'}
                🇬🇧
            {:else if $merchant.nationality === 'french'}
                🇫🇷
            {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
            Nationality
        </label>
        <select name="nationality" id="nationality" on:change={e => changeNationality(e.target.value)}>
            <option value="english" selected={$merchant.nationality === 'english'}>English</option>
            <option value="french" selected={$merchant.nationality === 'french'}>French</option>
            <option value="spanish" selected={$merchant.nationality === 'spanish'}>Spanish</option>
            <option value="dutch" selected={$merchant.nationality === 'dutch'}>Dutch</option>
        </select>

        <div>
            <button type="submit">Play</button>
        </div>
    </form>
</div>
