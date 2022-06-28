function serviceRegister(){
	const { serviceWorker } = navigator;
	if(!serviceWorker){
		console.warn('your browser is nor support serviceWorker');
		return;
	}
	window.addEventListener('load', async ()=>{
		let sw = null;
		const registration = await serviceWorker.register("../sw/service-worker.js");
		sw = registration.installing || registration.waiting || registration.active;
		sw && sw.addEventListener('statechange',(e)=>{
			const { state }= e.target;
			console.log(state)
		})
	})
}
serviceRegister()