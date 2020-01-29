<?php
use \Firebase\JWT\JWT;

require '../vendor/autoload.php';
require '../config/bootstrap.php';

$app = new \Slim\App;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');


const JWT_SECRET = "qsdgfvhjigfbdsdvgfdhj";

$jwt = new Slim\Middleware\JwtAuthentication([
  "secure" => false,
  "path" => "/api",
  "ignore" => ['/user/login', '/user/register'],
  "secret" => JWT_SECRET,
  "attribute" => "decoded_token_data",
  "algorithm" => ["HS256"],
  "error" => function($response, $arguments){
    $data = array(
      'ERROR' => 'Could not authenticate user.'
    );
    return $response->withHeader("Content-Type", "application/json; charset=utf-8")
        ->getBody()
        ->write(json_encode($data));
  }
]);

$app->add($jwt);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->post('/user/login', 'login');
$app->post('/user/register', 'register');

$app->get('/api/produit', 'getAllProduit');

function login($request, $response, $args){
    global $entityManager;
    $userRepository = $entityManager->getRepository('User');

    $body = $request->getParsedBody();
    if(isset($body['email']) && isset($body['mdp'])){
      $user = $userRepository->findOneBy(array('email' => $body['email']));
      if($user !== null && sha1($body['mdp']) === $user->getMdp()){
        $issueAt = time();
        $expirationTime = $issueAt + 3600 * 24 * 1;
        $payload = array(
          'userid' => $user->getId(),
          'iat' => $issueAt,
          'exp' => $expirationTime
        );
        $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
        $data = array('token' => $token_jwt);
        return $response->write(json_encode($data, JSON_UNESCAPED_SLASHES));
      }
    }
    return $response ->withStatus(401);
}

function register($request, $response, $args){
    $body = $request->getParsedBody();
    $validated = true;
    global $entityManager;
    $userRepository = $entityManager->getRepository('User');
    $user = $userRepository->findOneBy(array('email' => $body['email']));

    if($user !== null){
      $validated = false;
      $response->write(json_encode("This email is already used"));
    }

    if($validated){
      $newUser = new User();
      $newUser
         ->setNom($body['nom'])
         ->setPrenom($body['prenom'])
         ->setTelephone($body['telephone'])
         ->setAdresse($body['adresse'])
         ->setVille($body['ville'])
         ->setCodePostal($body['codepostal'])
         ->setPays($body['pays'])
         ->setEmail($body['email'])
         ->setMdp(sha1($body['mdp']));
      $entityManager->persist($newUser);
      $entityManager->flush();
      $response = $response->withStatus(201);
      return $response->write(json_encode($newUser, JSON_UNESCAPED_SLASHES));
    }
    return $response->withStatus(412);
}

function getAllProduit($request, $response, $args) {
  global $entityManager;
  $produitRepository = $entityManager->getRepository('Produit');

  return $response->write(json_encode($produitRepository->findAll(), JSON_UNESCAPED_SLASHES));
}

$app->run();
?>
