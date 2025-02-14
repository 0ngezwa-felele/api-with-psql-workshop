
document.addEventListener('alpine:init', () => {
	Alpine.data('missy', () => {

		return {
			garments: [],
			genderFilter: '',
			seasonFilter: '',
			maxPrice: 0,
			garmentList: {
				description: '',
				img: '',
				price: 0,
				season: '',
				gender: ''
			},

			init() {
				this.getGarments();
			},

			getGarments() {
				fetch('/api/garments')
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},


			filterGarments() {
				fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},

			filterPrice() {
				fetch(`/api/garments/${this.maxPrice}`)
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},

			addGarment() {
				console.log(this.garmentList)
				try {
					axios
						.post('/api/garment', this.garmentList)
						.then(()=>this.getGarments()+"Garment successfully added!")
						.catch(error => console.log(error))
				} catch (error) {

				}
			},
			deleteGarment(id){
				axios
				.delete(`/api/garments/${id.id}`)
				.then(()=>this.getGarments())
			}
		};
	});




})
