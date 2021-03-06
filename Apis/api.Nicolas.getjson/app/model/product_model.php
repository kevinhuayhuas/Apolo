<?php
namespace App\Model;

use App\Lib\Response;

class ProductModel
{
    private $db;
    private $table = 'data';
    private $response;

    public function __CONSTRUCT($db)
    {
        $this->db = $db;
        $this->response = new Response();
    }

    public function getall($l, $p)
    {
        $data = $this->db->from($this->table)
            ->limit($l)
            ->offset($p)
            ->orderBy('id DESC')
            ->fetchAll();

        $total = $this->db->from($this->table)
            ->select('COUNT(*) Total')
            ->fetch()
            ->Total;

        return [
            'data'  => $data,
            'length' => $total
        ];
    }

    public function get($id)
    {
        return $this->db->from($this->table, $id)
            ->fetch();
    }

    public function create($data)
    {
        $data['Password'] = md5($data['Password']);

        $this->db->insertInto($this->table, $data)
            ->execute();

        return $this->response->SetResponse(true);
    }

    public function update($data, $id)
    {
        if(isset($data['Password'])){
            $data['Password'] = md5($data['Password']);
        }

        $this->db->update($this->table, $data, $id)
            ->execute();

        return $this->response->SetResponse(true);
    }

    public function delete($id)
    {
        $this->db->deleteFrom($this->table, $id)
            ->execute();

        return $this->response->SetResponse(true);
    }
}