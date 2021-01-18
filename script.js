function _createModal(options){

    const DEFAULT_WIDTH = '50%'
    const DEFAULT_HEIGHT = '50%'

    const modal = document.createElement('div')
    modal.classList.add('_modal')

    function getContent(){
        return options.content
    }
     modal.insertAdjacentHTML('afterBegin', `
    <div data-close="true" class="_modalOverlay">
        <div class="_modalWindow" height="${options.height || DEFAULT_HEIGHT}" width="${options.width || DEFAULT_WIDTH}">
            <div class="_modalHeader">
               <span class="_close">&times;</span>
            </div>
            <div data-content class="_modalBody">
                ${getContent()}
            </div>
        </div>
    </div>
    `)
    return modal
}


function AwsModal(options){
    const $modal =_createModal(options)
    let _closing = false
    let _animationTime = 200


    const modal = {
        open(){
            $modal.classList.add('open')
        },
        close(){
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            _closing = true
            setTimeout(() => {
                $modal.classList.remove('hide')
                _closing = false
            }, _animationTime)
        }
    }

    document.querySelector(`${options.openButton}`).addEventListener('click', function (){
        modal.open()
    })


    $modal.querySelector('._close').addEventListener('click', function (){
        modal.close()
    })


    document.querySelector('body').append($modal)
    return modal
}


let modal1 = new AwsModal({
    openButton: '.btn',
    content: `
    <div>
    <span>Привет</span>
    <h1>Я модалка</h1>
</div>
    `
})
