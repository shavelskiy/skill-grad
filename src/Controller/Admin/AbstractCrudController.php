<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Persistence\ObjectRepository;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class AbstractCrudController extends AdminAbstractController implements CrudControllerInterface
{
    /**
     * @param null $model
     *
     * @return FormInterface
     */
    abstract protected function getForm($model = null): FormInterface;

    /**
     * {@inheritdoc}
     */
    protected function findModel($id)
    {
        if (($user = $this->getRepository()->find($id)) === null) {
            throw new NotFoundHttpException('model not found');
        }

        return $user;
    }

    /**
     * @return UserRepository|ObjectRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(User::class);
    }
}
