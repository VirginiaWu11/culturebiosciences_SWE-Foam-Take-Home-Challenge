"""Generate CSV of all images from JSON link (foam-seed) provided by Culture Biosciences."""

import csv
import requests
from datetime import datetime

IMAGES_JSON_LINK = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4fc14642-a3d6-424b-b621-5ecf5d955d7f/foam-seed.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220305T192855Z&X-Amz-Expires=86400&X-Amz-Signature=b46942bb72ad9eac6cc3df1a572081326adbaf97487ed40987ed673268e3c501&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22foam-seed.json%22&x-id=GetObject"

IMAGES_CSV_HEADERS = ["url", "last_modified", "date_created"]

IMAGES_FOR_SEED_JSON = requests.get(IMAGES_JSON_LINK).json()

with open("generator/images.csv", "w") as images_csv:
    images_writer = csv.DictWriter(images_csv, fieldnames=IMAGES_CSV_HEADERS)
    images_writer.writeheader()
    # Use datetime within image url as date_created
    for image in IMAGES_FOR_SEED_JSON:
        images_writer.writerow(
            dict(url=image["url"], last_modified=image["lastModified"], 
            date_created=datetime.strptime(" ".join(image["url"][76:96].split("-at-")),'%y-%m-%d %H.%M.%S'))
        )
