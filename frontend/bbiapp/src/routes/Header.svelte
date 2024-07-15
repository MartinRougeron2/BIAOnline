<script>
	import { page } from '$app/stores';
	import { Input, Label, Helper } from 'flowbite-svelte';
	import logo from '$lib/images/BBIA.png';
	import { Button } from 'flowbite-svelte';
	import { UserSolid, LanguageOutline } from 'flowbite-svelte-icons';
</script>

<header>
	<div class="corner ml-5 mt-2">
		<a href="/">
			<img src={logo} alt="logo" height="50" width="50" />
			<p class="text-3xl font-bold">
				BBIA 
			</p>
		</a>
	</div>

	<div class="nav">
		<Input type="text" id="search everywhere" placeholder="Search In App" class="w-full mt-2" />
	</div>

	<div class="corner mr-2">
		<div class="mt-2">
			<Button color="blue" size="sm" class="mr-2">
				<UserSolid class="w-6 h-6" /> Account
			</Button>
			<Button color="blue" size="sm">
				<LanguageOutline class="w-6 h-6" /> English
			</Button>
		</div>

	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		object-fit: contain;
	}

	.nav {
		display: flex;
		width: 30%;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

</style>
