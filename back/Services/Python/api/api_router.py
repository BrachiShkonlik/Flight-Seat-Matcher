from fastapi import FastAPI, Request, APIRouter, Depends, File, UploadFile, HTTPException, Form, Response
import uvicorn

# from logger import logger_decorator

app = FastAPI()

BASEURL = "/"
networks = APIRouter(
    responses={404: {"description": "not found"}})


# @app.get("/")
# async def root():
#     return {"message": "Hello World"}
#
#
# @app.post('/wonders')
# async def getting_information(request: Request):
#     data = await request.json()
#     if data:
#         return True
#     return False


@logger_decorator
@networks.get(BASEURL, response_model=Places_map | None)
async def get_places_map(id: str, current_user: User = Depends(get_current_active_user)):
    if not current_user:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Unauthorized")

    return await get_network_by_id(int(id))


uvicorn.run(app, host="127.0.0.1", port=3001)
