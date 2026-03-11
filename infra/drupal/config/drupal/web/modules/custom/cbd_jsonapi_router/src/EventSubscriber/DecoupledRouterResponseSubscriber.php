<?php

namespace Drupal\cbd_jsonapi_router\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Response subscriber to modify decoupled router responses.
 */
class DecoupledRouterResponseSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    return [
      KernelEvents::RESPONSE => ['onResponse', -10],
    ];
  }

  /**
   * Modifies the response for decoupled router endpoints.
   */
  public function onResponse(ResponseEvent $event) {
    $request = $event->getRequest();
    $response = $event->getResponse();
    
    // Check if this is a decoupled router request
    if (strpos($request->getPathInfo(), '/router/translate-path') !== 0) {
      return;
    }
    
    // Check if response is JSON
    if (!$response instanceof JsonResponse) {
      return;
    }
    
    // Get and modify the data
    $data = json_decode($response->getContent(), TRUE);
    
    if (isset($data['entity']) && isset($data['jsonapi'])) {
      // Add fields to jsonapi section
      if (isset($data['entity']['type'])) {
        $data['jsonapi']['type'] = $data['entity']['type'];
      }
      if (isset($data['entity']['bundle'])) {
        $data['jsonapi']['bundle'] = $data['entity']['bundle'];
      }
      if (isset($data['entity']['uuid'])) {
        $data['jsonapi']['uuid'] = $data['entity']['uuid'];
      }
      
      // Set modified response
      $response->setData($data);
    }
  }
}