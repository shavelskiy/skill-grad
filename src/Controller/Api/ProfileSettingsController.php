<?php

namespace App\Controller\Api;

use App\Dto\UpdateUserData;
use App\Entity\Category;
use App\Entity\User;
use App\Repository\CategoryRepository;
use App\Service\UpdateUserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/profile/settings")
 */
class ProfileSettingsController extends AbstractController
{
    protected CategoryRepository $categoryRepository;
    protected UpdateUserInterface $updateUserService;
    protected ValidatorInterface $validator;

    public function __construct(
        CategoryRepository $categoryRepository,
        UpdateUserInterface $updateUserService,
        ValidatorInterface $validator
    ) {
        $this->categoryRepository = $categoryRepository;
        $this->updateUserService = $updateUserService;
        $this->validator = $validator;
    }

    /**
     * @Route("/", methods={"GET"}, name="get.profile.settings")
     */
    public function getProfileSettings(): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        if (in_array(User::ROLE_PROVIDER, $user->getRoles(), true)) {
            $data = $this->getProviderProfileInfo($user);
        } else {
            $data = $this->getUserProfileInfo($user);
        }

        return new JsonResponse($data);
    }

    protected function getUserProfileInfo(User $user): array
    {
        $categories = [];

        /** @var Category $category */
        foreach ($this->categoryRepository->findRootCategories() as $category) {
            $categories[] = [
                'id' => $category->getId(),
                'title' => $category->getName(),
            ];
        }

        if (($userInfo = $user->getUserInfo()) === null) {
            return [
                'full_name' => '',
                'email' => $user->getEmail(),
                'description' => '',
                'phone' => '',
                'category' => null,
                'categories' => $categories,
            ];
        }

        return [
            'full_name' => $userInfo->getFullName(),
            'email' => $user->getEmail(),
            'description' => $userInfo->getDescription(),
            'phone' => $userInfo->getPhone(),
            'category' => ($userInfo->getCategory() !== null) ? ['id' => $userInfo->getCategory()->getId()] : null,
            'categories' => $categories,
        ];
    }

    protected function getProviderProfileInfo(User $user): array
    {
        return [
        ];
    }

    /**
     * @Route("/", methods={"POST"}, name="save.profile.settings")
     */
    public function saveProfileSettings(Request $request): Response
    {
        $updateUserData = (new UpdateUserData())
            ->setFullName($request->get('fullName'))
            ->setEmail($request->get('email'))
            ->setPhone($request->get('phone'))
            ->setOldPassword($request->get('oldPassword'))
            ->setNewPassword($request->get('newPassword'))
            ->setConfirmNewPassword($request->get('confirmNewPassword'));

        $errors = $this->validator->validate($updateUserData);

        /** @var User $user */
        $user = $this->getUser();

        $this->updateUserService->updateUser($user, $updateUserData);

        return new JsonResponse([
            'fullName' => $user->getFullName(),
            'email' => $user->getEmail(),
            'phone' => $user->getPhone(),
        ]);
    }
}
