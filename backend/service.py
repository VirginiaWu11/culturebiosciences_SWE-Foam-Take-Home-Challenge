from models import db, Image
from datetime import datetime

import requests

class ImageService:
    @classmethod
    def get_images(cls,page_num = 1,isFoaming = "all",per_page = 5):
        page_num = int(page_num)
        print("per_page***",per_page)
        per_page = int(per_page)
        if isFoaming == 'all':
            images = Image.query.paginate(per_page=per_page,page=page_num)
        elif isFoaming == 'None':
            images = Image.query.filter(Image.is_foaming.is_(None)).paginate(per_page=per_page,page=page_num)
        else:
            images = Image.query.filter_by(is_foaming=isFoaming).paginate(per_page=per_page,page=page_num)
        total_pages = images.pages
        images_list = [Image.serialize(image) for image in images.items]
        return [images_list,total_pages]

    @classmethod
    def classify_image(cls,id,is_foaming):
        image = Image.query.get(id)
        image.last_modified = datetime.utcnow()
        image.is_foaming = is_foaming
        db.session.commit()
        return Image.serialize(image)