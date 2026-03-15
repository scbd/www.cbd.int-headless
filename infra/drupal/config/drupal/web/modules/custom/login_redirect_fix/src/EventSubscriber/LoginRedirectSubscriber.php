<?php

namespace Drupal\login_redirect_fix\EventSubscriber;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Redirects authenticated users from login page to workbench.
 */
class LoginRedirectSubscriber implements EventSubscriberInterface {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * Constructs a new LoginRedirectSubscriber.
   *
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   The current user.
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The current route match.
   */
  public function __construct(AccountProxyInterface $current_user, RouteMatchInterface $route_match) {
    $this->currentUser = $current_user;
    $this->routeMatch = $route_match;
  }

  /**
   * Redirects authenticated users away from the login page.
   *
   * @param \Symfony\Component\HttpKernel\Event\RequestEvent $event
   *   The request event.
   */
  public function onRequest(RequestEvent $event): void {
    // Only act on master requests.
    if (!$event->isMainRequest()) {
      return;
    }

    // Check if user is authenticated.
    if ($this->currentUser->isAnonymous()) {
      return;
    }

    // Get the current path.
    $request = $event->getRequest();
    $path = $request->getPathInfo();

    // Check if we're on a login-related path.
    $login_paths = [
      '/user/login',
      '/user',
    ];

    // Also check for language-prefixed paths (e.g., /en/user/login).
    $is_login_path = FALSE;
    foreach ($login_paths as $login_path) {
      if ($path === $login_path || preg_match('#^/[a-z]{2}' . preg_quote($login_path, '#') . '$#', $path)) {
        $is_login_path = TRUE;
        break;
      }
    }

    // Special case: /user without trailing slash should also redirect,
    // but /user/[id] should not.
    if (preg_match('#^(/[a-z]{2})?/user$#', $path)) {
      $is_login_path = TRUE;
    }

    if (!$is_login_path) {
      return;
    }

    // Redirect to workbench.
    $url = Url::fromUserInput('/admin/workbench')->toString();
    $response = new RedirectResponse($url);
    $event->setResponse($response);
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    // High priority to run before other subscribers.
    $events[KernelEvents::REQUEST][] = ['onRequest', 100];
    return $events;
  }

}
