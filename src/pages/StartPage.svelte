<script>
    import { merchant } from '../stores/merchant';
    import { game } from '../stores/game';
    import { resolution } from '../stores/resolution';
    import { log } from '../stores/log';
    import Button from '../components/Button.svelte';
    import TextInput from '../components/TextInput.svelte';
    import SelectBox from '../components/SelectBox.svelte';
    import { nationalities } from '../constants/game';
    import { ucFirst } from '../utils/string';

    const changeName = name => {
        merchant.changeName(name);
    };

    const changeGender = gender => {
        merchant.changeGender(gender);
    };

    const changeNationality = nationalityName => {
        const nationality = nationalities[nationalityName];
        const town = nationality.towns[0];

        merchant.changeNationality(nationalityName);
        merchant.changeTown(town);
    };

    const changeTown = town => {
        merchant.changeTown(town);
    };

    const startPlaying = () => {
        game.startPlaying();
        const route = $resolution.mobile ? 'inventory' : 'properties';
        game.changeRoute(route);
        log.add(`You just woke as a ${$merchant.nationality} merchant named ${$merchant.name}.`);
    };

    $: genderIcon = $merchant.gender === 'woman' ? '👩' : '👨';
    $: towns = () => nationalities[$merchant.nationality].towns;
    $: currentFlag = () => $merchant.nationality && nationalities[$merchant.nationality].flag;
</script>

<div class="page-start">
    <h2>Welcome</h2>

    <p>To start playing, you can edit your profile or just press Play.</p>

    <form on:submit|preventDefault={startPlaying}>
        <TextInput value={$merchant.name} label="📛 Name" name="name" on:change={e => changeName(e.target.value)} />

        <SelectBox name="gender" label="{genderIcon} Gender" on:change={e => changeGender(e.target.value)}>
            <option value="woman" selected={$merchant.gender === 'woman'}>Woman</option>
            <option value="man" selected={$merchant.gender === 'man'}>Man</option>
        </SelectBox>

        {#if $merchant.nationality}
            <SelectBox
                name="nationality"
                label="{currentFlag()} Nationality"
                on:change={e => changeNationality(e.target.value)}
            >
                {#each Object.keys(nationalities) as nationality}
                    <option
                        value={nationalities[nationality].name}
                        selected={$merchant.nationality === nationalities[nationality].name}
                    >
                        {ucFirst(nationalities[nationality].name)}
                    </option>
                {/each}
            </SelectBox>

            <SelectBox name="town" label="🏠 Town" on:change={e => changeTown(e.target.value)}>
                {#each towns() as town}
                    <option selected={town === $merchant.town} value={town}>{town}</option>
                {/each}
            </SelectBox>
        {/if}

        <div>
            <Button type="submit">Play</Button>
        </div>
    </form>
</div>

<style>
    form {
        width: 50%;
    }
</style>
