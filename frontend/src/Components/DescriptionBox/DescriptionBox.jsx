import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio consequuntur debitis quo ipsum tempora perferendis dicta nostrum nisi sed dolorem. Ab quam mollitia nam accusamus velit iusto eaque dolorem cupiditate sint illo necessitatibus ad cumque nostrum neque nemo, dicta deleniti in eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolore itaque et, suscipit perferendis culpa, molestiae ut exercitationem, sed sunt dolores quo deserunt explicabo error? Corporis consequatur fuga porro ipsum! Quasi, modi rem saepe inventore consectetur magni laboriosam perferendis ipsum id dolore unde iste sapiente!</p>
        </div>
    </div>
  )
}

export default DescriptionBox