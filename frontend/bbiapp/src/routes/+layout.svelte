

<div class="app">
	<Header></Header>

	<div class="sidebar">
		<Sidebar></Sidebar>
	</div>

	<main>
		<slot></slot>
	</main>

	<footer>
		contact
	</footer>
</div>


<script>
import Header from "./Header.svelte";
import Sidebar from "./Sidebar.svelte";

import "../app.css";</script><style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.sidebar {
		transform: translateY(20%);
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: self-start;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>