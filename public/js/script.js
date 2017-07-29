var url = $('#url')
var create = $('#create')
var copy = $('#copy')
$('#shortForm').on('submit', (e) => {
	e.preventDefault()
	$.get(`/create?url=${url.val()}`, (data) => {
		url.val(data.link)
		create.hide()
		url.select()
		copy.show()
	})
})
copy.on('click', () => {
	url.select()
	document.execCommand('copy')
	copy.html('Copied!')
	setTimeout(() => {
		copy.hide()
		url.val('')
		create.show()
	}, 1000)
})