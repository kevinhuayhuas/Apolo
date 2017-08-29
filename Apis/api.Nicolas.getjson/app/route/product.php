<?php
use App\Lib\Auth,
    App\Lib\Response,
    App\Middleware\AuthMiddleware;

$app->group('/product', function () {
    $this->get('/list/{l}/{p}', function ($req, $res, $args) {
        return $res->withHeader('Content-type', 'application/json')
            ->write(
                json_encode($this->model->product->getall($args['l'], $args['p']))
            );
    });

    $this->get('/get/{id}', function ($req, $res, $args) {
        return $res->withHeader('Content-type', 'application/json')
            ->write(
                json_encode($this->model->product->get($args['id']))
            );
    });

    $this->post('/create', function ($req, $res, $args) {
        $r = EmpleadoValidation::validate($req->getParsedBody());

        if (!$r->response) {
            return $res->withHeader('Content-type', 'application/json')
                ->withStatus(422)
                ->write(json_encode($r->errors));
        }

        return $res->withHeader('Content-type', 'application/json')
            ->write(
                json_encode($this->model->product->create($req->getParsedBody()))
            );
    });

    $this->put('/update/{id}', function ($req, $res, $args) {
        $r = EmpleadoValidation::validate($req->getParsedBody(), true);

        if (!$r->response) {
            return $res->withHeader('Content-type', 'application/json')
                ->withStatus(422)
                ->write(json_encode($r->errors));
        }

        return $res->withHeader('Content-type', 'application/json')
            ->write(
                json_encode($this->model->product->update($req->getParsedBody(), $args['id']))
            );
    });

    $this->delete('/delete/{id}', function ($req, $res, $args) {
        return $res->withHeader('Content-type', 'application/json')
            ->write(
                json_encode($this->model->product->delete($args['id']))
            );
    });
});